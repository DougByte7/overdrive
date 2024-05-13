import equipment from '@/assets/dnd/5e/equipment.json'
import randomIntFromInterval from '@/utils/randomIntFromInterval'

import type { DnD5eClassName, Skill } from '../classes'
import type {
    DnD5eClass,
    EquipmentIndex,
    WithAmount,
} from '../classes/interfaces'
import type { DnD5eRaceName } from '../races'
import getModifier from './getModifier'

interface AttributeScore {
    mod: number
    total: number
}

export interface CharacterSheetProps<T extends 'data' | 'name' = 'data'> {
    id: string
    hp: number
    currentHp: number
    initiative: number
    tempHp: number
    name: string
    picture: string
    backstory: string
    race: DnD5eRaceName
    classes: T extends 'data'
        ? Array<{ data: DnD5eClass; level: number }>
        : Array<{ name: DnD5eClassName | string; level: number }>
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
    traits: Record<string, string | string[]>
    features: Record<string, string | string[]>
    proficiencies: Skill[]
    items: WithAmount<EquipmentIndex>[]
    spells: string[]
    preparedSpells: string[]
}

enum HPMethod {
    AVERAGE,
    DICE,
    MANUAL,
}

export class CharacterSheet {
    #id: string
    #hpMethod = HPMethod.AVERAGE
    #strength: AttributeScore
    #dexterity: AttributeScore
    #constitution: AttributeScore
    #intelligence: AttributeScore
    #wisdom: AttributeScore
    #charisma: AttributeScore

    // Stats
    hp: number
    currentHp: number
    initiative: number
    tempHp: number
    // Info
    name: string
    picture: string
    backstory: string
    race: DnD5eRaceName
    classes: Array<{ data: DnD5eClass; level: number }>
    traits: Record<string, string | string[]>
    features: Record<string, string | string[]>
    proficiencies: Skill[]
    items: WithAmount<EquipmentIndex>[]
    spells: string[]
    preparedSpells: string[]

    constructor(props: CharacterSheetProps) {
        this.#id = props.id
        this.#strength = buildAttributeScore(props.strength)
        this.#dexterity = buildAttributeScore(props.dexterity)
        this.#constitution = buildAttributeScore(props.constitution)
        this.#intelligence = buildAttributeScore(props.intelligence)
        this.#wisdom = buildAttributeScore(props.wisdom)
        this.#charisma = buildAttributeScore(props.charisma)

        this.hp = props.hp
        this.currentHp = props.currentHp
        this.initiative = props.initiative
        this.tempHp = props.tempHp
        this.name = props.name
        this.picture = props.picture
        this.backstory = props.backstory
        this.traits = props.traits
        this.features = props.features
        this.proficiencies = props.proficiencies
        this.items = props.items
        this.spells = props.spells
        this.preparedSpells = props.preparedSpells
        this.race = props.race
        this.classes = props.classes
    }

    save() {
        localStorage.setItem(
            'character:current',
            JSON.stringify(this.toProps())
        )
    }

    toProps(): CharacterSheetProps<'name'> {
        return {
            id: this.#id,
            hp: this.hp,
            currentHp: this.currentHp,
            initiative: this.initiative,
            tempHp: this.tempHp,
            name: this.name,
            picture: this.picture,
            backstory: this.backstory,
            race: this.race,
            classes: this.classes.map((c) => ({
                name: c.data.key,
                level: c.level,
            })),
            strength: this.strength.total,
            dexterity: this.dexterity.total,
            constitution: this.constitution.total,
            intelligence: this.intelligence.total,
            wisdom: this.wisdom.total,
            charisma: this.charisma.total,
            traits: this.traits,
            features: this.features,
            proficiencies: this.proficiencies,
            items: this.items,
            spells: this.spells,
            preparedSpells: this.preparedSpells,
        }
    }

    addItem(itemIndex: string, amount = 1) {
        const currentItemIndex = this.items.findIndex(
            (item) => item.index === itemIndex
        )

        if (currentItemIndex !== -1) {
            this.items[currentItemIndex].amount += amount
        } else {
            this.items.push({
                index: itemIndex,
                amount,
            })
        }
    }

    get id() {
        return this.#id
    }

    get totalLevel() {
        return this.classes.reduce((acc, c) => (acc += c.level), 0)
    }

    set addOneClassLevel(className: DnD5eClassName) {
        const classIndex = this.classes.findIndex(
            (c) => c.data.name === className
        )

        if (classIndex === -1) {
            try {
                throw new Error('Erro: Classe inexistente na base de dados')
            } catch (error) {}
            return
        }

        this.classes[classIndex].level++
        switch (this.#hpMethod) {
            case HPMethod.AVERAGE:
                this.hp +=
                    this.constitution.mod +
                    this.classes[classIndex].data.hp.average

                break
            case HPMethod.DICE:
                const dice = +this.classes[classIndex].data.hp.dice.substring(1)
                this.hp +=
                    this.constitution.mod + randomIntFromInterval(1, dice)
                break
        }
    }

    get armorClass() {
        const armor = equipment.find(
            (e) =>
                e.equipment_category.index === 'armor' &&
                e.armor_category !== 'Shield' &&
                this.items
                    .filter((i) => i.equipped)
                    .map((i) => i.index)
                    .includes(e.index)
        )
        const shield = equipment.find(
            (e) =>
                e.equipment_category.index === 'armor' &&
                e.armor_category === 'Shield' &&
                this.items
                    .filter((i) => i.equipped)
                    .map((i) => i.index)
                    .includes(e.index)
        )

        return (
            (armor?.armor_class?.base ?? 8) +
            Math.min(
                +(armor?.armor_class?.dex_bonus ?? 1) * this.dexterity.mod,
                armor?.armor_class?.max_bonus ?? Infinity
            ) +
            (shield?.armor_class?.base ?? 0)
        )
    }

    // Base Stats /////////////////////////////////
    get strength(): AttributeScore {
        return this.#strength
    }
    set strength(value: number | AttributeScore) {
        this.#strength = buildAttributeScore(value as number)
    }
    get dexterity(): AttributeScore {
        return this.#dexterity
    }
    set dexterity(value: number | AttributeScore) {
        this.#dexterity = buildAttributeScore(value as number)
    }
    get constitution(): AttributeScore {
        return this.#constitution
    }
    set constitution(value: number | AttributeScore) {
        this.#constitution = buildAttributeScore(value as number)
    }
    get intelligence(): AttributeScore {
        return this.#intelligence
    }
    set intelligence(value: number | AttributeScore) {
        this.#intelligence = buildAttributeScore(value as number)
    }
    get wisdom(): AttributeScore {
        return this.#wisdom
    }
    set wisdom(value: number | AttributeScore) {
        this.#wisdom = buildAttributeScore(value as number)
    }
    get charisma(): AttributeScore {
        return this.#charisma
    }
    set charisma(value: number | AttributeScore) {
        this.#charisma = buildAttributeScore(value as number)
    }
    /////////////////////////////////////////////////
}

function buildAttributeScore(value: number): AttributeScore {
    return { mod: getModifier(value), total: value }
}

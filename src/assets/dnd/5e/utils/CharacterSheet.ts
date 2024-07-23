import type { Input } from 'valibot'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

import equipment from '@/assets/dnd/5e/equipment.json'

import type { Skill } from '../classes'
import type { EquipmentOption } from '../classes/interfaces'
import type { DnD5eTrait } from '../races'
import getModifier from './getModifier'
import type { CustomClassSchema } from './schemas/classes'

// enum HPMethod {
//     AVERAGE,
//     DICE,
//     MANUAL,
// }

interface State {
    hasChanges: boolean
    id: string
    hp: number
    currentHp: number
    initiative: number
    tempHp: number
    name: string
    picture: string
    backstory: string
    race: {
        id?: string
        name: string
        description: string
        traits: DnD5eTrait[]
    }
    classes: Array<{
        id?: string
        data: Input<typeof CustomClassSchema>
        level: number
    }>
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
    traits: Record<string, string | string[]>
    features: Record<string, string | string[]>
    skills: Skill[]
    items: EquipmentOption[]
    spells: string[]
    preparedSpells: string[]
}
interface Actions {
    actions: {
        getMutationPayload: () => TypeFixMe
        setHasChanges: (hasChanges: boolean) => void
        setCharacterSheet: (sheet: State) => void
        setCharacterTempHP: (value: number) => void
        setCharacterCurrentHP: (value: number) => void
        setCharacterInitiative: (value: number) => void
        setCharacterPreparedSpells: (preparedSpells: string[]) => void
        setCharacterSpells: (spells: string[]) => void
        toggleEquippedItem: (itemIndex: string) => void
        toggleSkillProficiency: (skill: Skill) => void
    }
}

const useCharacterSheetStore = create<State & Actions>()((set, get) => ({
    hasChanges: false,
    id: '',
    hp: 0,
    currentHp: 0,
    tempHp: 0,
    initiative: 0,
    name: '',
    picture: '',
    backstory: '',
    race: {
        id: '',
        name: '',
        description: '',
        traits: [],
    },
    classes: [],
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    traits: {},
    features: {},
    skills: [],
    items: [],
    spells: [],
    preparedSpells: [],
    actions: {
        getMutationPayload: () => {
            const sheet = get()
            if (!(sheet.id && sheet.hasChanges)) return

            const { classes, race, skills, actions, hasChanges, ...rest } =
                sheet

            const payload = {
                ...rest,
                classes: classes.map((c) => ({
                    level: c.level,
                    name: c.id ?? c.data.name,
                })),
                race: race.id || race.name,
                proficiencies: skills,
            }

            return payload
        },
        setHasChanges: (hasChanges: boolean) => set({ hasChanges }),
        setCharacterSheet: (sheet: State) => set(sheet),
        setCharacterTempHP: (tempHp: number) =>
            set({ tempHp, hasChanges: true }),
        setCharacterCurrentHP: (currentHp: number) =>
            set({ currentHp, hasChanges: true }),
        setCharacterInitiative: (initiative: number) =>
            set({ initiative, hasChanges: true }),
        setCharacterPreparedSpells: (preparedSpells: string[]) =>
            set({ preparedSpells, hasChanges: true }),
        setCharacterSpells: (spells: string[]) =>
            set({ spells, hasChanges: true }),
        toggleEquippedItem: (itemIndex: string) =>
            set((state) => {
                const index = state.items.findIndex(
                    (item) => item.item === itemIndex
                )
                if (index === -1) return state

                state.items[index].equipped = !state.items[index].equipped

                return { items: state.items, hasChanges: true }
            }),
        toggleSkillProficiency: (skill: Skill) =>
            set((state) => {
                const skillSet = new Set(state.skills)
                if (skillSet.has(skill)) skillSet.delete(skill)
                else skillSet.add(skill)

                return { skills: Array.from(skillSet), hasChanges: true }
            }),
    },
}))

export const useCharacterSheetActions = () =>
    useCharacterSheetStore((state) => state.actions)

// DO NOT USE UNLESS YOU ABSOLUTE NEED THE WHOLE SHEET
export const useUnsafeCharacterSheet = () =>
    useCharacterSheetStore((state) => {
        const { actions, ...sheet } = state
        return sheet
    })

export const useCharacterSheetHasChanges = () =>
    useCharacterSheetStore((state) => state.hasChanges)

export const useCharacterHP = () => useCharacterSheetStore((state) => state.hp)

export const useCharacterCurrentHP = () =>
    useCharacterSheetStore((state) => state.currentHp)

export const useCharacterTempHP = () =>
    useCharacterSheetStore((state) => state.tempHp)

export const useCharacterPicture = () =>
    useCharacterSheetStore((state) => state.picture)

export const useCharacterName = () =>
    useCharacterSheetStore((state) => state.name)

export const useCharacterRace = () =>
    useCharacterSheetStore((state) => state.race)

export const useCharacterClasses = () =>
    useCharacterSheetStore((state) => state.classes)

export const useCharacterLevel = () =>
    useCharacterSheetStore((state) =>
        state.classes.reduce((acc, c) => acc + c.level, 0)
    )

export const useCharacterInitiative = () =>
    useCharacterSheetStore((state) => state.initiative)

export const useCharacterStrength = () =>
    useCharacterSheetStore((state) => state.strength)
export const useCharacterDexterity = () =>
    useCharacterSheetStore((state) => state.dexterity)
export const useCharacterConstitution = () =>
    useCharacterSheetStore((state) => state.constitution)
export const useCharacterIntelligence = () =>
    useCharacterSheetStore((state) => state.intelligence)
export const useCharacterWisdom = () =>
    useCharacterSheetStore((state) => state.wisdom)
export const useCharacterCharisma = () =>
    useCharacterSheetStore((state) => state.charisma)
export const useCharacterAttributes = () =>
    useCharacterSheetStore(
        useShallow((state) => ({
            strength: state.strength,
            dexterity: state.dexterity,
            constitution: state.constitution,
            intelligence: state.intelligence,
            wisdom: state.wisdom,
            charisma: state.charisma,
        }))
    )

export const useCharacterArmorClass = () =>
    useCharacterSheetStore((state) => {
        const armors = state.items
            .filter((item) => item.equipped)
            .map((item) => equipment.find((eq) => eq.index === item.item)!)
            .filter((item) => item.armor_class)

        if (!armors.length) return 10 + getModifier(state.dexterity)

        return armors.reduce((ac, armor) => {
            if (!armor.armor_class) return ac

            ac += armor.armor_class.base

            if (!armor.armor_class.dex_bonus) return ac

            return (
                ac +
                Math.min(
                    getModifier(state.dexterity),
                    armor.armor_class.max_bonus ?? Infinity
                )
            )
        }, 0)
    })
export const useCharacterBackstory = () =>
    useCharacterSheetStore((state) => state.backstory)

export const useCharacterSkills = () =>
    useCharacterSheetStore((state) => state.skills)

export const useCharacterItems = () =>
    useCharacterSheetStore((state) =>
        state.items.map((item) => {
            const data = equipment.find((eq) => eq.index === item.item)!

            return {
                ...data,
                amount: item.amount,
                equipped: item.equipped,
            }
        })
    )

export const useCharacterSpells = () =>
    useCharacterSheetStore((state) => state.spells)

export const useCharacterPreparedSpells = () =>
    useCharacterSheetStore((state) => state.preparedSpells)

export const useCharacterTraits = () =>
    useCharacterSheetStore((state) => state.traits)

export const useCharacterFeatures = () =>
    useCharacterSheetStore((state) => state.features)

export const useCharacterHasSpellSlots = () =>
    useCharacterSheetStore(
        useShallow((state) =>
            state.classes.some(
                (c) => !!c.data.spellsSlots?.flatMap((e) => e).at(1)
            )
        )
    )

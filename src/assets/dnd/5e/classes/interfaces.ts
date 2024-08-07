export interface DnD5eFeature {
    name: string
    level: number | number[]
    description: string | string[]
    amount?: number[]
    options?: LabelValue<string>[]
    misc?: Record<string, string[]>
}

export interface DnD5eSubClass {
    name: string
    description: string
    features: DnD5eFeature[]
    spells?: string[]
    expandedSpellList?: string[]
}

export type DiceFaces = 4 | 6 | 8 | 10 | 12 | 20
export type DiceFacesNotation = `d${DiceFaces}`
export type DiceNotation = `${number | ''}${DiceFacesNotation}`
export type Armor = 'light' | 'medium' | 'heavy' | 'shield'
export type Weapon =
    | 'simple'
    | 'martial'
    | 'lightCrossbow'
    | 'handCrossbow'
    | 'rapier'
    | 'shortSword'
    | 'longSword'
    | 'dagger'
    | 'dart'
    | 'quarterstaff'
export type Attribute =
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma'
export type Skill =
    | 'arcana'
    | 'acrobatics'
    | 'athletics'
    | 'deception'
    | 'stealth'
    | 'history'
    | 'intimidation'
    | 'insight'
    | 'investigation'
    | 'animal_handling'
    | 'medicine'
    | 'nature'
    | 'perception'
    | 'persuasion'
    | 'religion'
    | 'survival'

export type Tool = 'musicalInstrument' | 'artisansTools'

export interface DnD5eClass {
    key: string
    name: string
    description: string
    features: DnD5eFeature[]
    subclasses: DnD5eSubClass[]
    hp: {
        dice: DiceNotation
        average: number
    }
    cantripKnown?: number[]
    spellsKnown?: number[] | number
    spellsSlots?: number[][]
    proficiencies: {
        armor?: Armor[]
        weapon: Weapon[]
        tools?: Tool[]
        savingThrows: Attribute[]
        skills: {
            amount: number
            options: LabelValue<Skill>[]
        }
    }
    equipmentOptions: EquipmentOption[][][]
}

export type EquipmentOption = {
    item: string
    amount: number
    equipped?: boolean
}

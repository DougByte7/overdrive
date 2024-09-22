type Property =
    | 'CA'
    | 'STR_MOD'
    | 'CON_MOD'
    | 'DEX_MOD'
    | 'WIS_MOD'
    | 'INT_MOD'
    | 'CHA_MOD'
    | 'WEAPON_RANGED_ATK'
    | 'WEAPON_RANGED_DMG'
    | 'WEAPON_MELEE_ATK'
    | 'WEAPON_MELEE_DMG'
type Assignment = '=' | '+=' | '-='

/////////////////////////////
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift'
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
    TObj,
    Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
    readonly length: L
    [I: number]: T
    [Symbol.iterator]: () => IterableIterator<T>
}
/////////////////////////////

export interface DnD5eFeature {
    name: string
    level: number | number[]
    description: string
    amount?: FixedLengthArray<number, 20>
    options?: Array<LabelValue<string> & { description: string }>
    rules?: Array<{
        action: `${Property}${Assignment}${string}`
        isActive: boolean
    }>
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
    cantripKnown?: FixedLengthArray<number, 20>
    spellsKnown?: FixedLengthArray<number, 20> | number
    spellsSlots?: FixedLengthArray<number[], 20>
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

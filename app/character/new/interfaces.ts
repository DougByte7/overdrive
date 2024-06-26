import type { DnD5eClassName, Skill } from '@/assets/dnd/5e/classes'
import type { EquipmentOption } from '@/assets/dnd/5e/classes/interfaces'
import type { DnD5eRaceName } from '@/assets/dnd/5e/races'

export interface CharacterForm {
    hp: number
    currentHp: number
    name: string
    picture: File | null | string
    backstory: string
    race: DnD5eRaceName | string | null
    classes: Array<{ name: DnD5eClassName | string; level: number }>
    strength: AttributeScore
    dexterity: AttributeScore
    constitution: AttributeScore
    intelligence: AttributeScore
    wisdom: AttributeScore
    charisma: AttributeScore
    traits: Record<string, string | string[]>
    features: Record<string, string | string[]>
    proficiencies: Skill[]
    items: EquipmentOption[]
    spells: string[]
    preparedSpells: string[]
}

export interface AttributeScore {
    base: number
    bonus: number
}

export type AttrMethod = 'diceroll' | 'pointbuy' | 'array' | 'custom'

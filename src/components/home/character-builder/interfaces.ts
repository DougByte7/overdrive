import type { DnD5eClassName, Skill } from "@/assets/dnd/5e/classes"
import { WithAmount, EquipmentIndex } from "@/assets/dnd/5e/classes/interfaces"
import { DnD5eRaceName } from "@/assets/dnd/5e/races"

export interface CharacterForm {
  id?: string
  name: string
  picture: File | null | string
  backstory: string
  race: DnD5eRaceName | null
  classes: DnD5eClassName[]
  strength: AttributeScore
  dexterity: AttributeScore
  constitution: AttributeScore
  intelligence: AttributeScore
  wisdom: AttributeScore
  charisma: AttributeScore
  traits: Record<string, string>
  features: Record<string, string>
  proficiencies: Skill[]
  items: WithAmount<EquipmentIndex>[]
  spells: Set<string>
}

export interface AttributeScore {
  base: number
  bonus: number
  total: number
}

export type AttrMethod = "diceroll" | "pointbuy" | "array" | "custom"

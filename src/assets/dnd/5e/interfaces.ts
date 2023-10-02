import monsters from "@/assets/dnd/5e/monsters.json"
import spells from "@/assets/dnd/5e/spells.json"
import equipment from "@/assets/dnd/5e/equipment.json"

export type DnD5eMonster = (typeof monsters)[number]
export type DnD5eSpell = (typeof spells)[number] & { marked?: boolean }
export type DnD5eEquipment = (typeof equipment)[number]

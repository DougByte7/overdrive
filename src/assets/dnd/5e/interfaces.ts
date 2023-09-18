import monsters from "@/assets/dnd/5e/monsters.json"
import spells from "@/assets/dnd/5e/spells.json"

export type DnD5eMonster = (typeof monsters)[number]
export type DnD5eSpell = (typeof spells)[number] & { marked?: boolean }

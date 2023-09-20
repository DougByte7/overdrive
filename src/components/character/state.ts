import { atom } from "jotai"
import type { CharacterForm } from "../home/character-builder/interfaces"
import type { DnD5eSpell } from "@/assets/dnd/5e/interfaces"

export const characterAtom = atom<CharacterForm | null>(null)

export const activeTabAtom = atom<"basic" | "inventory" | "skills" | "magic">(
  "basic"
)

export const selectedSpellAton = atom<DnD5eSpell | null>(null)

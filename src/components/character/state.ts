import { atom } from "jotai"
import { Spell } from "./components/grimoire"
import { CharacterForm } from "../home/character-builder/interfaces"

export const characterAtom = atom<CharacterForm | null>(null)

export const activeTabAtom = atom<"basic" | "inventory" | "skills" | "magic">(
  "basic"
)

export const selectedSpellAton = atom<Spell | null>(null)


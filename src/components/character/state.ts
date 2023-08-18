import { atom } from "jotai"
import { Spell } from "./components/grimoire"

export const activeTabAtom = atom<"basic" | "inventory" | "skills" | "magic">(
  "basic"
)

export const selectedSpellAton = atom<Spell | null>(null)

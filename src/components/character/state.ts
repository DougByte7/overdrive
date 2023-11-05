import { atom } from "jotai";
import type { DnD5eSpell } from "@/assets/dnd/5e/interfaces";
import type { CharacterSheet } from "@/assets/dnd/5e/utils/CharacterSheet";

export const characterAtom = atom<CharacterSheet | null>(null);

export const activeTabAtom = atom<
  "basic" | "inventory" | "skills" | "magic" | "none"
>("none");

export const selectedSpellAton = atom<DnD5eSpell | null>(null);

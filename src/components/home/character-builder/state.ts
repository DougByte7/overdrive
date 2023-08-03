import { atom } from "jotai"
import type { AttrMethod, CharacterForm } from "./interfaces"

export const characterFormAton = atom<CharacterForm>({
  name: "",
  picture: null,
  backstory: "",
  race: null,
  classes: [],
  strength: { base: 0, bonus: 0, total: 0 },
  dexterity: { base: 0, bonus: 0, total: 0 },
  constitution: { base: 0, bonus: 0, total: 0 },
  intelligence: { base: 0, bonus: 0, total: 0 },
  wisdom: { base: 0, bonus: 0, total: 0 },
  charisma: { base: 0, bonus: 0, total: 0 },
  traits: {},
  features: {},
  proficiencies: [],
  items: [],
})

export const avatarPreviewUrlAton = atom("")

export const attrMethodAtom = atom<AttrMethod | "">("")

export const pointBuyAtom = atom(27)

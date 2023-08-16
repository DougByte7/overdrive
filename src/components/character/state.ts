import { atom } from "jotai"

export const activeTabAtom = atom<"basic" | "inventory" | "skills" | "magic">(
  "basic"
)

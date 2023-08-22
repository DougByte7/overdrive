import type { DnD5eMonster } from "@/assets/dnd/5e/interfaces"
import { atom } from "jotai"

export const selectedMonsterAtom = atom<DnD5eMonster | null>(null)

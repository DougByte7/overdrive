import { atom } from 'jotai'

import type { DnD5eSpell } from '@/assets/dnd/5e/interfaces'

export const activeTabAtom = atom<
    'basic' | 'inventory' | 'skills' | 'magic' | 'none'
>('basic')

export const selectedSpellAton = atom<DnD5eSpell | null>(null)

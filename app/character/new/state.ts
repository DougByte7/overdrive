import { atom } from 'jotai'

import type { AttrMethod, CharacterForm } from './interfaces'

export const characterFormAtonInit: CharacterForm = {
    hp: 0,
    currentHp: 0,
    name: '',
    picture: null,
    backstory: '',
    race: null,
    classes: [],
    strength: { base: 0, bonus: 0 },
    dexterity: { base: 0, bonus: 0 },
    constitution: { base: 0, bonus: 0 },
    intelligence: { base: 0, bonus: 0 },
    wisdom: { base: 0, bonus: 0 },
    charisma: { base: 0, bonus: 0 },
    traits: {},
    features: {},
    proficiencies: [],
    items: [],
    spells: [],
    preparedSpells: [],
}

export const characterFormAton = atom(characterFormAtonInit)

export const avatarPreviewUrlAton = atom('')

export const attrMethodAtom = atom<AttrMethod | ''>('')

export const pointBuyAtom = atom(27)

export const itemSelectionLockAton = atom(false)

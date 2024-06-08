import { Tabs, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useCallback, useMemo } from 'react'

import type { DnD5eSpell } from '@/assets/dnd/5e/interfaces'
import spells from '@/assets/dnd/5e/spells.json'
import {
    useCharacterClasses,
    useCharacterPreparedSpells,
    useCharacterSheetActions,
    useCharacterSpells,
} from '@/assets/dnd/5e/utils/CharacterSheet'

import { SpellDetails } from './spell-details'
import SpellList from './spell-list'

function sortSpellByName(a: DnD5eSpell, b: DnD5eSpell) {
    return a.name > b.name ? 1 : -1
}

function sortByLevel(arr: DnD5eSpell[][], spell: DnD5eSpell) {
    const index = spell.level === 'cantrip' ? 0 : +spell.level
    if (arr[index]) {
        arr[index].push(spell)
    } else {
        arr[index] = [spell]
    }

    return arr
}

export default function Grimoire() {
    return (
        <>
            <Tabs
                className="h-[calc(100vh-80px)] min-w-[300px] shrink grow basis-0 overflow-auto"
                defaultValue="prepared"
            >
                <Tabs.List>
                    <Tabs.Tab value="prepared">Preparadas</Tabs.Tab>
                    <Tabs.Tab value="know">Conhecidas</Tabs.Tab>
                    <Tabs.Tab value="all">Todas</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="prepared" p="md">
                    <PreparedSpells />
                </Tabs.Panel>

                <Tabs.Panel value="know" p="md">
                    <KnownSpells />
                </Tabs.Panel>

                <Tabs.Panel value="all" p="md">
                    <AllSpells />
                </Tabs.Panel>
            </Tabs>
            <SpellDetails verticalOffset={0} />
        </>
    )
}

function PreparedSpells() {
    const characterSpells = useCharacterSpells()
    const characterPreparedSpells = useCharacterPreparedSpells()

    const preparedSpells = useMemo(() => {
        if (!characterSpells.length) return []

        return [
            ...spells
                .filter(
                    (spell) =>
                        spell.level === 'cantrip' &&
                        characterSpells.includes(spell.name)
                )
                .sort(sortSpellByName),
            ...characterPreparedSpells
                .reduce((acc, spellName) => {
                    const spell = spells.find(
                        (spell) => spell.name === spellName
                    )

                    if (!spell) return acc

                    return sortByLevel(acc, spell)
                }, [] as DnD5eSpell[][])
                .flatMap((spells) => spells.sort(sortSpellByName)),
        ]
    }, [characterPreparedSpells, characterSpells])

    const handleCastSpell = useCallback((spellName: string) => {
        notifications.show({ message: spellName })
    }, [])

    return preparedSpells.length ? (
        <SpellList
            spells={preparedSpells}
            onAddOrRemoveSpell={handleCastSpell}
        />
    ) : (
        <Text ta="center">Nenhuma magia disponível</Text>
    )
}

function KnownSpells() {
    const { setCharacterPreparedSpells } = useCharacterSheetActions()
    const characterSpells = useCharacterSpells()
    const characterPreparedSpells = useCharacterPreparedSpells()
    const characterClasses = useCharacterClasses()

    const knownSpells = useMemo(() => {
        if (!characterSpells) return []

        return characterClasses.flatMap((c) => {
            return c.data.spellsKnown?.[0] === Infinity
                ? spells
                      .reduce((acc, spell: DnD5eSpell) => {
                          if (
                              !spell.classes.includes(c.data.name) ||
                              spell.level === 'cantrip'
                          )
                              return acc

                          const newSpell = { ...spell }
                          newSpell.marked = characterPreparedSpells.includes(
                              newSpell.name
                          )
                          return sortByLevel(acc, newSpell)
                      }, [] as DnD5eSpell[][])
                      .flatMap((spells) => spells.sort(sortSpellByName))
                : characterSpells
                      .reduce((acc, spellName) => {
                          const spell = spells.find(
                              (spell) => spell.name === spellName
                          ) as DnD5eSpell

                          if (!spell || spell.level === 'cantrip') return acc

                          const newSpell = { ...spell }
                          newSpell.marked = characterPreparedSpells.includes(
                              newSpell.name
                          )
                          return sortByLevel(acc, newSpell)
                      }, [] as DnD5eSpell[][])
                      .flatMap((spells) => spells.sort(sortSpellByName)) ?? []
        })
    }, [characterClasses, characterPreparedSpells, characterSpells])

    const handlePrepareSpell = (spellName: string) => {
        const preparedSpellsSet = new Set(characterSpells)
        if (preparedSpellsSet.has(spellName)) {
            preparedSpellsSet.delete(spellName)
        } else {
            preparedSpellsSet.add(spellName)
        }

        setCharacterPreparedSpells([...preparedSpellsSet])
    }

    return knownSpells.length ? (
        <SpellList
            spells={knownSpells}
            isEdit
            onAddOrRemoveSpell={handlePrepareSpell}
        />
    ) : (
        <Text ta="center">Nenhuma magia disponível</Text>
    )
}

function AllSpells() {
    const { setCharacterPreparedSpells, setCharacterSpells } =
        useCharacterSheetActions()

    const characterSpells = useCharacterSpells()
    const characterPreparedSpells = useCharacterPreparedSpells()

    const allSpellsSorted = useMemo(
        () =>
            spells
                .reduce((acc, spell: DnD5eSpell) => {
                    spell.marked = characterSpells.includes(spell.name)

                    return sortByLevel(acc, spell)
                }, [] as DnD5eSpell[][])
                .flatMap((spells) => spells.sort(sortSpellByName)),
        [characterSpells]
    )

    const handleAddSpell = (spellName: string) => {
        const preparedSpellsSet = new Set(characterPreparedSpells)
        const spellsSet = new Set(characterSpells)

        if (spellsSet.has(spellName)) {
            preparedSpellsSet.delete(spellName)
            spellsSet.delete(spellName)
        } else {
            spellsSet.add(spellName)
        }
        setCharacterPreparedSpells([...preparedSpellsSet])
        setCharacterSpells([...spellsSet])
    }

    return (
        <SpellList
            spells={allSpellsSorted}
            isEdit
            onAddOrRemoveSpell={handleAddSpell}
        />
    )
}

import { useMemo } from "react"
import { CharacterForm } from "@/components/home/character-builder/interfaces"
import { Tabs, Text } from "@mantine/core"
import spells from "@/assets/dnd/5e/spells.json"
import { SpellDetails } from "./spell-details"
import SpellList from "./spell-list"
import { DnD5eSpell } from "@/assets/dnd/5e/interfaces"
import classes from "@/assets/dnd/5e/classes"

interface GrimoireProps {
  character: CharacterForm
}
export default function Grimoire({ character }: GrimoireProps) {
  const sortByLevel = (arr: DnD5eSpell[][], spell: DnD5eSpell) => {
    const index = spell.level === "cantrip" ? 0 : +spell.level
    if (arr[index]) {
      arr[index].push(spell)
    } else {
      arr[index] = [spell]
    }

    return arr
  }
  const sortByName = (a: DnD5eSpell, b: DnD5eSpell) => {
    return a.name > b.name ? 1 : -1
  }

  const knownSpells = useMemo(() => {
    if (!character?.spells) return []

    return character.classes.flatMap((c) => {
      return classes[c.name].spellsKnown === Infinity
        ? spells
            .reduce((acc, spell) => {
              if (!spell.classes.includes(c.name)) return acc

              return sortByLevel(acc, spell)
            }, [] as DnD5eSpell[][])
            .flatMap((spells) => spells.sort(sortByName))
        : character.spells
            .reduce((acc, spellName) => {
              const spell = spells.find((spell) => spell.name === spellName)

              if (!spell) return acc

              return sortByLevel(acc, spell)
            }, [] as DnD5eSpell[][])
            .flatMap((spells) => spells.sort(sortByName)) ?? []
    })
  }, [character])

  const allSpellsSorted = useMemo(
    () =>
      spells
        .reduce((acc, spell) => {
          return sortByLevel(acc, spell)
        }, [] as DnD5eSpell[][])
        .flatMap((spells) => spells.sort(sortByName)),
    []
  )

  const preparedSpells = useMemo(() => {
    if (!character?.spells) return []

    return [
      ...spells
        .filter(
          (spell) =>
            spell.level === "cantrip" && character.spells.includes(spell.name)
        )
        .sort(sortByName),
      ...character.preparedSpells
        .reduce((acc, spellName) => {
          const spell = spells.find((spell) => spell.name === spellName)

          if (!spell) return acc

          return sortByLevel(acc, spell)
        }, [] as DnD5eSpell[][])
        .flatMap((spells) => spells.sort(sortByName)),
    ]
  }, [character])

  return (
    <>
      <Tabs w="100vw" defaultValue="prepared">
        <Tabs.List>
          <Tabs.Tab value="prepared">Preparadas</Tabs.Tab>
          <Tabs.Tab value="know">Conhecidas</Tabs.Tab>
          <Tabs.Tab value="all">Todas</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="prepared" p="md">
          {preparedSpells.length ? (
            <SpellList spells={preparedSpells} />
          ) : (
            <Text align="center">Nenhuma magia disponível</Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="know" p="md">
          {knownSpells.length ? (
            <SpellList spells={knownSpells} isEdit />
          ) : (
            <Text align="center">Nenhuma magia disponível</Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="all" p="md">
          <SpellList spells={allSpellsSorted} isEdit />
        </Tabs.Panel>
      </Tabs>
      <SpellDetails />
    </>
  )
}

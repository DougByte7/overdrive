import { useMemo } from "react"
import { CharacterForm } from "@/components/home/character-builder/interfaces"
import { Tabs, Stack, Group, Text } from "@mantine/core"
import spells from "@/assets/dnd/5e/spells.json"
import type { DnD5eClassName } from "@/assets/dnd/5e/classes"
import { SpellDetails } from "./spell-details"
import SpellList from "./spell-list"
import { DnD5eSpell } from "@/assets/dnd/5e/interfaces"

export type Spell = (typeof spells)[number]

interface GrimoireProps {
  character: CharacterForm
}
export default function Grimoire({ character }: GrimoireProps) {
  const sortByLevel = (a: Spell, b: Spell) => {
    const aLevel = a.level === "cantrip" ? 0 : +a.level
    const bLevel = b.level === "cantrip" ? 0 : +b.level
    return aLevel - bLevel
  }

  const spellList = character
    ? character.spells?.length
      ? Array.from(character.spells).map((spellName) =>
          spells.find((spell) => spell.name === spellName)
        )
      : spells
          .filter((spell) =>
            spell.classes.some((classIndex) =>
              character.classes.find(
                (c) => c.name === (classIndex as DnD5eClassName)
              )
            )
          )
          .sort(sortByLevel)
    : []

  const allSpellsSorted = useMemo(() => spells.sort(sortByLevel), [])

  return (
    <>
      <Tabs w="100vw" defaultValue="prepared">
        <Tabs.List>
          <Tabs.Tab value="prepared">Preparadas</Tabs.Tab>
          <Tabs.Tab value="know">Conhecidas</Tabs.Tab>
          <Tabs.Tab value="all">Todas</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="prepared" p="md">
          <Stack spacing="xs">
            {character?.spells?.length ? (
              Array.from(character.spells).map((spell) => {
                return (
                  <Group key={spell} position="apart">
                    <Text>{spell}</Text>
                  </Group>
                )
              })
            ) : (
              <Text align="center">Nenhuma magia disponível</Text>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="know" p="md">
          <Stack spacing="xs">
            {spellList.length ? (
              <SpellList spells={spellList as DnD5eSpell[]} />
            ) : (
              <Text align="center">Nenhuma magia disponível</Text>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="all" p="md">
          <SpellList spells={allSpellsSorted} />
        </Tabs.Panel>
      </Tabs>
      <SpellDetails />
    </>
  )
}

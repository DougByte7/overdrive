import { useCallback, useMemo } from "react";
import { Tabs, Text } from "@mantine/core";
import spells from "@/assets/dnd/5e/spells.json";
import { SpellDetails } from "./spell-details";
import SpellList from "./spell-list";
import classes from "@/assets/dnd/5e/classes";
import { notifications } from "@mantine/notifications";
import useCharacter from "@/hooks/useCharacter";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { characterAtom } from "../../state";
import type { DnD5eSpell } from "@/assets/dnd/5e/interfaces";
import { CharacterSheet } from "@/assets/dnd/5e/utils/CharacterSheet";

function sortSpellByName(a: DnD5eSpell, b: DnD5eSpell) {
  return a.name > b.name ? 1 : -1;
}

function sortByLevel(arr: DnD5eSpell[][], spell: DnD5eSpell) {
  const index = spell.level === "cantrip" ? 0 : +spell.level;
  if (arr[index]) {
    arr[index].push(spell);
  } else {
    arr[index] = [spell];
  }

  return arr;
}

export default function Grimoire() {
  return (
    <>
      <Tabs
        className="h-[calc(100vh-80px)] w-full overflow-auto"
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
  );
}

function PreparedSpells() {
  const [character] = useAtom(characterAtom);

  const preparedSpells = useMemo(() => {
    if (!character?.spells) return [];

    return [
      ...spells
        .filter(
          (spell) =>
            spell.level === "cantrip" && character.spells.includes(spell.name),
        )
        .sort(sortSpellByName),
      ...character.preparedSpells
        .reduce((acc, spellName) => {
          const spell = spells.find((spell) => spell.name === spellName);

          if (!spell) return acc;

          return sortByLevel(acc, spell);
        }, [] as DnD5eSpell[][])
        .flatMap((spells) => spells.sort(sortSpellByName)),
    ];
  }, [character]);

  const handleCastSpell = useCallback((spellName: string) => {
    notifications.show({ message: spellName });
  }, []);

  return preparedSpells.length ? (
    <SpellList spells={preparedSpells} onAddOrRemoveSpell={handleCastSpell} />
  ) : (
    <Text ta="center">Nenhuma magia disponível</Text>
  );
}

function KnownSpells() {
  const {
    query: { characterId },
  } = useRouter();
  const [sheet, setSheet] = useAtom(characterAtom);
  const { updateCharacter } = useCharacter();

  const knownSpells = useMemo(() => {
    if (!sheet?.spells) return [];

    return sheet.classes.flatMap((c) => {
      return classes[c.data.key].spellsKnown === Infinity
        ? spells
            .reduce((acc, spell: DnD5eSpell) => {
              if (
                !spell.classes.includes(c.data.key) ||
                spell.level === "cantrip"
              )
                return acc;

              const newSpell = { ...spell };
              newSpell.marked = sheet.preparedSpells.includes(newSpell.name);
              return sortByLevel(acc, newSpell);
            }, [] as DnD5eSpell[][])
            .flatMap((spells) => spells.sort(sortSpellByName))
        : sheet.spells
            .reduce((acc, spellName) => {
              const spell = spells.find(
                (spell) => spell.name === spellName,
              ) as DnD5eSpell;

              if (!spell || spell.level === "cantrip") return acc;

              const newSpell = { ...spell };
              newSpell.marked = sheet.preparedSpells.includes(newSpell.name);
              return sortByLevel(acc, newSpell);
            }, [] as DnD5eSpell[][])
            .flatMap((spells) => spells.sort(sortSpellByName)) ?? [];
    });
  }, [sheet]);

  const handleUpdateCharacter = (newCharacter: CharacterSheet) => {
    updateCharacter(characterId! as string, newCharacter.toProps());
    setSheet(
      new CharacterSheet({
        ...newCharacter.toProps(),
        classes: newCharacter!.classes,
      }),
    );
  };

  const handlePrepareSpell = useCallback(
    (spellName: string) => {
      const { preparedSpells } = sheet!;
      const preparedSpellsSet = new Set(preparedSpells);
      if (preparedSpellsSet.has(spellName)) {
        preparedSpellsSet.delete(spellName);
      } else {
        preparedSpellsSet.add(spellName);
      }
      sheet!.preparedSpells = [...preparedSpellsSet];
      handleUpdateCharacter(sheet!);
    },
    [sheet],
  );
  return knownSpells.length ? (
    <SpellList
      spells={knownSpells}
      isEdit
      onAddOrRemoveSpell={handlePrepareSpell}
    />
  ) : (
    <Text ta="center">Nenhuma magia disponível</Text>
  );
}

function AllSpells() {
  const {
    query: { characterId },
  } = useRouter();
  const [character, setCharacter] = useAtom(characterAtom);
  const { updateCharacter } = useCharacter();

  const allSpellsSorted = useMemo(
    () =>
      spells
        .reduce((acc, spell: DnD5eSpell) => {
          spell.marked = character!.spells.includes(spell.name);

          return sortByLevel(acc, spell);
        }, [] as DnD5eSpell[][])
        .flatMap((spells) => spells.sort(sortSpellByName)),
    [character],
  );

  const handleUpdateCharacter = (newCharacter: CharacterSheet) => {
    updateCharacter(characterId! as string, newCharacter.toProps());
    setCharacter(
      new CharacterSheet({
        ...newCharacter.toProps(),
        classes: newCharacter!.classes,
      }),
    );
  };

  const handleAddSpell = useCallback(
    (spellName: string) => {
      const { preparedSpells, spells } = character!;
      const preparedSpellsSet = new Set(preparedSpells);
      const spellsSet = new Set(spells);

      if (spellsSet.has(spellName)) {
        preparedSpellsSet.delete(spellName);
        spellsSet.delete(spellName);
      } else {
        spellsSet.add(spellName);
      }
      character!.preparedSpells = [...preparedSpellsSet];
      character!.spells = [...spellsSet];
      handleUpdateCharacter(character!);
    },
    [character],
  );

  return (
    <SpellList
      spells={allSpellsSorted}
      isEdit
      onAddOrRemoveSpell={handleAddSpell}
    />
  );
}

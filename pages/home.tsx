import HomeComponent from "@/components/home";
import races from "@/assets/dnd/5e/races";
import useCharacter from "@/hooks/useCharacter";
import { useEffect } from "react";
import { CharacterSheetSchema } from "@/assets/dnd/5e/utils/schema";
import { parse } from "valibot";
import { Group, Text } from "@mantine/core";
import { IconCrown, IconPuzzle } from "@tabler/icons-react";
import classes from "@/assets/dnd/5e/classes";

export default function Home() {
  const campaigns: unknown[] = [];

  const {
    characters: storedCharacters,
    addCharacter,
    clearCharacters,
  } = useCharacter();

  useEffect(() => {
    if (!storedCharacters?.length) return;

    try {
      storedCharacters.forEach((data) => {
        parse(CharacterSheetSchema, data);
      });
    } catch (e) {
      console.error(e);
      clearCharacters();
    }
  }, [storedCharacters]);

  /**
   * @todo Create a generic interface for every system
   */
  const characters =
    storedCharacters?.map((character) => {
      return {
        id: character.id,
        name: character.name,
        detail: races[character.race!].name,
        extra: (
          <Group gap="xl">
            <Group gap="xs">
              <IconCrown />
              <Text size={character.classes.length > 1 ? "xs" : "md"}>
                {character.classes?.map((c) => (
                  <>
                    {classes[c.name].name} <br />
                  </>
                ))}
              </Text>
            </Group>
            <Group gap="xs">
              <IconPuzzle />
              <Text>
                Nv {character.classes.reduce((acc, c) => acc + c.level, 0)}
              </Text>
            </Group>
          </Group>
        ),
        imgSrc: character.picture,
      };
    }) ?? [];

  return (
    <HomeComponent
      campaigns={campaigns}
      characters={characters}
      setCharacters={addCharacter}
    />
  );
}

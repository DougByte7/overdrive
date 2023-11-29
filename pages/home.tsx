import HomeComponent from "@/components/home";
import races from "@/assets/dnd/5e/races";
import useCharacter from "@/hooks/useCharacter";
import { useMemo } from "react";
import { Group, Text } from "@mantine/core";
import { IconCrown, IconPuzzle } from "@tabler/icons-react";
import classes from "@/assets/dnd/5e/classes";
import useRouteGuard from "@/hooks/routeGuard";

export default function Home() {
  const campaigns: unknown[] = [];

  const { characters } = useCharacter();
  useRouteGuard();

  const normalizedCharacters = useMemo(() => {
    return characters.map((character) => {
      return {
        id: character.id,
        name: character.name,
        detail: races[character.race!].name,
        extra: (
          <Group gap={0} justify="space-between">
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
    });
  }, [characters]);

  return (
    <HomeComponent campaigns={campaigns} characters={normalizedCharacters} />
  );
}

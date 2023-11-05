import classes from "@/assets/dnd/5e/classes";
import races from "@/assets/dnd/5e/races";
import { CharacterSheet } from "@/assets/dnd/5e/utils/CharacterSheet";
import CharacterFooter from "@/components/character/components/footer/character-footer";
import { characterAtom } from "@/components/character/state";
import useCharacter from "@/hooks/useCharacter";
import {
  type ComboboxItem,
  type ComboboxItemGroup,
  Badge,
  Stack,
  Text,
  Spoiler,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Traits() {
  const [sheet, setSheet] = useAtom(characterAtom);
  const router = useRouter();
  const { getCharacter } = useCharacter();

  const { characterId } = router.query;

  useEffect(() => {
    const char = getCharacter(characterId as string);

    if (!char || sheet?.id === char.id) return;

    setSheet(
      new CharacterSheet({
        ...char,
        classes: char.classes.map((c) => ({
          data: classes[c.name],
          level: c.level,
        })),
      }),
    );
  });

  return (
    sheet && (
      <>
        <Stack p="md" pb={120}>
          {races[sheet.race].traits.map((trait) => {
            return (
              <Stack
                key={trait.name}
                className="rounded border border-brand-500 border-opacity-20 p-2"
                gap={0}
              >
                <Text fw="bold">{trait.name}</Text>
                {sheet.traits[trait.name] && (
                  <Badge>
                    {(
                      trait.options as (ComboboxItem | ComboboxItemGroup)[]
                    )?.reduce((acc, o) => {
                      if ("group" in o) {
                        acc =
                          (o.items as ComboboxItem[]).find(
                            (i) => i.value === sheet.traits[trait.name],
                          )?.label ?? acc;
                      } else if (o.value === sheet.traits[trait.name]) {
                        acc = o.label;
                      }

                      return acc;
                    }, "")}
                  </Badge>
                )}
                <Spoiler
                  maxHeight={120}
                  showLabel="Ver mais"
                  hideLabel="Ver menos"
                >
                  <ReactMarkdown
                    className="text-sm"
                    remarkPlugins={[remarkGfm]}
                  >
                    {Array.isArray(trait.description)
                      ? trait.description.join("\n")
                      : trait.description}
                  </ReactMarkdown>
                </Spoiler>
              </Stack>
            );
          })}
        </Stack>
        <CharacterFooter />
      </>
    )
  );
}

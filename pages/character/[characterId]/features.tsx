import classes from "@/assets/dnd/5e/classes";
import { CharacterSheet } from "@/assets/dnd/5e/utils/CharacterSheet";
import CharacterFooter from "@/components/character/components/footer/character-footer";
import { characterAtom } from "@/components/character/state";
import useCharacter from "@/hooks/useCharacter";
import { Stack, Text, Spoiler, Space } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Features() {
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
          {sheet.classes.map(({ data, level }) => {
            return (
              <Stack key={data.key}>
                <Text>{data.name}</Text>
                {data.features
                  .filter((f) =>
                    Array.isArray(f.level)
                      ? f.level.includes(level)
                      : f.level <= level,
                  )
                  .map((feature) => {
                    return (
                      <Stack
                        key={feature.name}
                        className="rounded border border-brand-500 border-opacity-20 p-2"
                        gap={0}
                      >
                        <Text fw="bold">{feature.name}</Text>
                        {sheet.features[feature.name] && (
                          <>
                            {feature.options
                              ?.filter((o) =>
                                sheet.features[feature.name].includes(o.value),
                              )
                              .map((o) => (
                                <Fragment key={o.value}>
                                  {feature.misc?.[o.value].map((txt, i) => (
                                    <Text
                                      className="text-sm"
                                      key={i}
                                      fw={i === 0 ? "bold" : "normal"}
                                    >
                                      {txt}
                                    </Text>
                                  ))}
                                </Fragment>
                              ))}
                            <Space h="md" />
                          </>
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
                            {Array.isArray(feature.description)
                              ? feature.description.join("\n")
                              : feature.description}
                          </ReactMarkdown>
                        </Spoiler>
                      </Stack>
                    );
                  })}
              </Stack>
            );
          })}
        </Stack>
        <CharacterFooter />
      </>
    )
  );
}

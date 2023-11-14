import {
  Transition,
  ActionIcon,
  Stack,
  Spoiler,
  Text,
  Group,
  Badge,
  Divider,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import {
  IconBox,
  IconChevronLeft,
  IconCone2,
  IconHemisphere,
  IconLineDashed,
  IconSphere,
} from "@tabler/icons-react";
import { CSSProperties, useEffect } from "react";
import { useAtom } from "jotai";
import { selectedSpellAton } from "../../state";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface SpellDetailsProps {
  backdrop?: boolean;
  verticalOffset?: number;
  h?: string | number;
}
export function SpellDetails({
  backdrop = true,
  verticalOffset = 72,
  h = "auto",
}: SpellDetailsProps) {
  const [selectedSpell, setSelectedSpell] = useAtom(selectedSpellAton);

  const focusTrapRef = useFocusTrap(!!selectedSpell);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = selectedSpell ? "hidden" : originalStyle;
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [selectedSpell]);

  return (
    <>
      <Transition mounted={backdrop && !!selectedSpell} transition="fade">
        {(styles) => (
          <div
            style={{ ...styles, ...backdropStyles }}
            onClick={() => setSelectedSpell(null)}
          />
        )}
      </Transition>
      <Transition mounted={!!selectedSpell} transition="slide-up">
        {(styles) => (
          <div
            ref={focusTrapRef}
            style={{ ...styles, ...spellInfoStyles(verticalOffset, h) }}
          >
            <ActionIcon
              size="xl"
              variant="light"
              title="Fechar item"
              onClick={() => setSelectedSpell(null)}
            >
              <IconChevronLeft
                size="1rem"
                color="var(--do_color_primary_base)"
              />
            </ActionIcon>
            <Stack align="center" gap="sm">
              <Text fw="bold" size="lg">
                {selectedSpell?.name}
              </Text>
              <Group gap="xs">
                {selectedSpell?.duration.startsWith("Concentration") && (
                  <Badge
                    color="gray"
                    title="Concentraçào"
                    size="xs"
                    variant="outline"
                  >
                    C
                  </Badge>
                )}
                {selectedSpell?.ritual && (
                  <Badge
                    title="Ritual"
                    color="gray"
                    size="xs"
                    variant="outline"
                  >
                    R
                  </Badge>
                )}
                {selectedSpell?.components.verbal && (
                  <Badge
                    title="Verbal"
                    color="gray"
                    size="xs"
                    variant="outline"
                  >
                    V
                  </Badge>
                )}
                {selectedSpell?.components.somatic && (
                  <Badge
                    title="Somático"
                    color="gray"
                    size="xs"
                    variant="outline"
                  >
                    S
                  </Badge>
                )}
                {selectedSpell?.components.material && (
                  <Badge
                    css={css`
                      color: #868e96;
                      border-color: currentColor;
                    `}
                    title="Material"
                    size="xs"
                    variant="outline"
                  >
                    M*
                  </Badge>
                )}
              </Group>

              {selectedSpell?.components.materials_needed && (
                <Text size="sm" color="var(--do_text_color_300)">
                  *{selectedSpell?.components.materials_needed}
                </Text>
              )}

              <dl
                css={css`
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 8px;
                  margin: 0;
                  font-size: var(--do_text_size_sm);

                  dt {
                    margin-right: 4px;
                    font-weight: bold;
                  }

                  dd {
                    margin: 0;
                  }
                `}
              >
                <Group gap={0}>
                  <dt>Duração: </dt>
                  <dd>{selectedSpell?.duration}</dd>
                </Group>

                <Group gap={0}>
                  <dt>Nível: </dt>
                  <dd>{selectedSpell?.level}</dd>
                </Group>

                <Group gap={0}>
                  <dt>Alcance: </dt>
                  <dd>
                    {selectedSpell?.range
                      .replace(/-?f(ee|oo)t(-radius)?/, "ft ")
                      .replace(/\(|(cone|hemisphere|line|cube|sphere)|\)/g, "")
                      .replace("-mile", " mi")}
                    {selectedSpell?.range.includes("cone") && (
                      <IconCone2
                        css={css`
                          margin-left: 4px;
                          margin-bottom: -2px;
                        `}
                        size={12}
                      />
                    )}
                    {selectedSpell?.range.includes("hemisphere") && (
                      <IconHemisphere
                        css={css`
                          margin-left: 4px;
                          margin-bottom: -2px;
                          rotate: 180deg;
                        `}
                        size={12}
                      />
                    )}
                    {selectedSpell?.range.includes("line") && (
                      <IconLineDashed
                        css={css`
                          margin-left: 4px;
                          margin-bottom: -2px;
                        `}
                        size={12}
                      />
                    )}
                    {selectedSpell?.range.includes("cube") && (
                      <IconBox
                        css={css`
                          margin-left: 4px;
                          margin-bottom: -2px;
                        `}
                        size={12}
                      />
                    )}
                    {selectedSpell?.range.includes(" sphere") && (
                      <IconSphere
                        css={css`
                          margin-left: 4px;
                          margin-bottom: -2px;
                        `}
                        size={12}
                      />
                    )}
                  </dd>
                </Group>

                <Group gap={0}>
                  <dt>Escola: </dt>
                  <dd>{selectedSpell?.school}</dd>
                </Group>

                <Group gap={0}>
                  <dt>Classes: </dt>
                  <dd>{selectedSpell?.classes.join(", ")}</dd>
                </Group>

                <Group gap={0}>
                  <dt>Tempo de conjuração: </dt>
                  <dd>{selectedSpell?.casting_time}</dd>
                </Group>
              </dl>

              <Divider w="100%" />

              <Stack className="max-w-[650px]" align="center" gap="sm">
                <Spoiler
                  maxHeight={75}
                  showLabel="Ver mais"
                  hideLabel="Ver menos"
                >
                  <Text>{selectedSpell?.description}</Text>
                </Spoiler>
                <Spoiler
                  maxHeight={75}
                  showLabel="Ver mais"
                  hideLabel="Ver menos"
                >
                  <Text>{selectedSpell?.higher_levels}</Text>
                </Spoiler>
              </Stack>
            </Stack>
          </div>
        )}
      </Transition>
    </>
  );
}

const backdropStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.6)",
  zIndex: 1001,
};
const spellInfoStyles = (
  verticalOffset: number,
  h: string | number,
): CSSProperties => ({
  position: "fixed",
  right: 0,
  bottom: verticalOffset,
  left: 0,
  zIndex: 1002,
  borderTopRightRadius: "var(--do_border_radius_lg)",
  borderTopLeftRadius: "var(--do_border_radius_lg)",
  padding: 16,
  paddingBottom: 32,
  minHeight: 550,
  height: h,
  maxHeight: "calc(100vh - 150px)",
  overflow: "auto",
  background: "var(--mantine-color-body)",
});

import {
  Fragment,
  MouseEventHandler,
  ReactNode,
  useState,
  useMemo,
} from "react"
import { css } from "@emotion/react"
import { CharacterForm } from "@/components/home/character-builder/interfaces"
import {
  Tabs,
  Stack,
  Group,
  Divider,
  Badge,
  Tooltip,
  Text,
  UnstyledButton,
} from "@mantine/core"
import spells from "@/assets/dnd/5e/spells.json"
import type { DnD5eClassName } from "@/assets/dnd/5e/classes"
import { useClickOutside } from "@mantine/hooks"
import {
  IconCone2,
  IconHemisphere,
  IconLineDashed,
  IconBox,
  IconSphere,
} from "@tabler/icons-react"
import { useAtom } from "jotai"
import { selectedSpellAton } from "../../state"
import { SpellDetails } from "./spell-details"

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
    ? character.spells?.size
      ? Array.from(character.spells).map((spellName) =>
          spells.find((spell) => spell.name === spellName)
        )
      : spells
          .filter((spell) =>
            spell.classes.some((classIndex) =>
              character.classes.includes(classIndex as DnD5eClassName)
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
            {character?.spells?.size ? (
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
              spellList.map((spell, i, arr) => {
                const prev = arr.at(i - 1)
                const shouldShowLabel = i === 0 || prev?.level !== spell?.level

                const levelLabel =
                  spell?.level === "cantrip"
                    ? "Truques"
                    : `Nível ${spell?.level}`
                return (
                  spell && (
                    <Fragment key={spell?.name}>
                      {shouldShowLabel && (
                        <Divider
                          css={dividerStyles}
                          label={
                            <Text fw="bold" size="lg">
                              {levelLabel}
                            </Text>
                          }
                          labelPosition="center"
                          size="sm"
                        />
                      )}
                      <SpellCard spell={spell} />
                    </Fragment>
                  )
                )
              })
            ) : (
              <Text align="center">Nenhuma magia disponível</Text>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="all" p="md">
          <Stack spacing="xs">
            {allSpellsSorted.map((spell, i, arr) => {
              const prev = arr.at(i - 1)
              const shouldShowLabel = i === 0 || prev?.level !== spell?.level
              const levelLabel =
                spell?.level === "cantrip" ? "Truques" : `Nível ${spell?.level}`

              return (
                spell && (
                  <Fragment key={spell.name}>
                    {shouldShowLabel && (
                      <Divider
                        css={dividerStyles}
                        label={
                          <Text fw="bold" size="lg">
                            {levelLabel}
                          </Text>
                        }
                        labelPosition="center"
                        size="sm"
                      />
                    )}
                    <SpellCard spell={spell} />
                  </Fragment>
                )
              )
            })}
          </Stack>
        </Tabs.Panel>
      </Tabs>
      <SpellDetails />
    </>
  )
}

const dividerStyles = css`
  position: sticky;
  top: 0;
  background: var(--do_color_background);
  line-height: 2.5;
  z-index: 3;
`

interface SpellCardProps {
  spell: (typeof spells)[number]
}
function SpellCard({ spell }: SpellCardProps) {
  const [, setSelectedSpell] = useAtom(selectedSpellAton)
  const schoolColorMap = {
    necromancy: "dark",
    transmutation: "green",
    abjuration: "blue",
    illusion: "violet",
    conjuration: "orange",
    enchantment: "yellow",
    evocation: "red",
    divination: "gray",
  }

  return (
    <UnstyledButton onClick={() => setSelectedSpell(spell)}>
      <Group
        css={css`
          border-radius: var(--do_border_radius_md);
          border: 1px solid var(--do_border_color);
          padding: 8px;
          height: 80px;
        `}
        spacing={0}
        position="apart"
      >
        <Text
          css={css`
            flex: 0 1 100%;
          `}
          fw="bold"
          ta="center"
        >
          {spell.name}
        </Text>

        <Stack spacing={4}>
          {spell.casting_time.startsWith("1 reaction") ? (
            <ToggleTip label={spell.casting_time}>
              <Badge
                css={css`
                  color: #868e96;
                  border-color: currentColor;
                `}
                size="xs"
                variant="dot"
              >
                1 Reaction
              </Badge>
            </ToggleTip>
          ) : (
            <Badge size="xs" color="gray" variant="outline">
              {spell.casting_time}
            </Badge>
          )}

          <Badge
            size="xs"
            color={schoolColorMap[spell.school as keyof typeof schoolColorMap]}
            variant="outline"
          >
            {spell.school}
          </Badge>
        </Stack>

        <Group spacing={4}>
          {spell.duration.startsWith("Concentration") && (
            <Badge
              color="gray"
              title="Concentraçào"
              size="xs"
              variant="outline"
            >
              C
            </Badge>
          )}
          {spell.ritual && (
            <Badge title="Ritual" color="gray" size="xs" variant="outline">
              R
            </Badge>
          )}
          {spell.components.verbal && (
            <Badge title="Verbal" color="gray" size="xs" variant="outline">
              V
            </Badge>
          )}
          {spell.components.somatic && (
            <Badge title="Somático" color="gray" size="xs" variant="outline">
              S
            </Badge>
          )}
          {spell.components.material && (
            <ToggleTip label={spell.components.materials_needed!}>
              <Badge
                css={css`
                  color: #868e96;
                  border-color: currentColor;
                `}
                title="Material"
                size="xs"
                variant="dot"
                mb={5}
              >
                M
              </Badge>
            </ToggleTip>
          )}
        </Group>

        <Stack align="end" spacing={4}>
          <Badge size="sm" variant="filled">
            {spell.range
              .replace(/-?f(ee|oo)t(-radius)?/, "ft ")
              .replace(/\(|(cone|hemisphere|line|cube|sphere)|\)/g, "")
              .replace("-mile", " mi")}
            {spell.range.includes("cone") && (
              <IconCone2
                css={css`
                  margin-left: 4px;
                  margin-bottom: -2px;
                `}
                size={12}
              />
            )}
            {spell.range.includes("hemisphere") && (
              <IconHemisphere
                css={css`
                  margin-left: 4px;
                  margin-bottom: -2px;
                  rotate: 180deg;
                `}
                size={12}
              />
            )}
            {spell.range.includes("line") && (
              <IconLineDashed
                css={css`
                  margin-left: 4px;
                  margin-bottom: -2px;
                `}
                size={12}
              />
            )}
            {spell.range.includes("cube") && (
              <IconBox
                css={css`
                  margin-left: 4px;
                  margin-bottom: -2px;
                `}
                size={12}
              />
            )}
            {spell.range.includes(" sphere") && (
              <IconSphere
                css={css`
                  margin-left: 4px;
                  margin-bottom: -2px;
                `}
                size={12}
              />
            )}
          </Badge>
        </Stack>
      </Group>
    </UnstyledButton>
  )
}

interface ToggleTipProps {
  label: string | string[]
  children: ReactNode
}
function ToggleTip({ label, children }: ToggleTipProps) {
  const [opened, setOpened] = useState(false)
  const ref = useClickOutside(() => setOpened(false))

  const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setOpened((o) => !o)
  }

  return (
    <Tooltip
      css={css`
        position: relative;
        z-index: 2;
      `}
      label={label}
      multiline
      opened={opened}
    >
      <UnstyledButton ref={ref} onClick={handleToggle}>
        {children}
      </UnstyledButton>
    </Tooltip>
  )
}

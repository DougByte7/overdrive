import { DnD5eSpell } from "@/assets/dnd/5e/interfaces"
import { css } from "@emotion/react"
import {
  Stack,
  Divider,
  Badge,
  Group,
  Tooltip,
  UnstyledButton,
  Text,
  Box,
  ActionIcon,
  Space,
} from "@mantine/core"
import { useClickOutside, useDisclosure } from "@mantine/hooks"
import {
  IconCone2,
  IconHemisphere,
  IconLineDashed,
  IconBox,
  IconSphere,
  IconPlus,
  IconCircleDashed,
  IconWand,
} from "@tabler/icons-react"
import { useAtom } from "jotai"
import { Fragment, MouseEventHandler, ReactNode, useState } from "react"
import { selectedSpellAton } from "../../state"
import type { AddOrRemoveSpellEvent } from "./interfaces"

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

interface SpellCardProps {
  spell: DnD5eSpell
  isEdit: boolean
  onAddOrRemoveSpell?: AddOrRemoveSpellEvent
}
function SpellCard({ spell, isEdit, onAddOrRemoveSpell }: SpellCardProps) {
  const [, setSelectedSpell] = useAtom(selectedSpellAton)
  const [isMarked, { toggle }] = useDisclosure(spell.marked)
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

  const handleAddRemove = (spellName: string) => () => {
    if (isEdit) toggle()
    onAddOrRemoveSpell?.(spellName)
  }

  return (
    <Box pos="relative">
      <ActionIcon
        style={{
          position: "absolute",
          top: 40,
          right: 12,
          transition: "rotate 150ms",
          rotate: isMarked ? "45deg" : "0deg",
        }}
        size="xl"
        radius="xl"
        variant={isEdit ? "outline" : "filled"}
        color={isEdit ? (isMarked ? "red" : "gray") : "brand"}
        title={isEdit ? (isMarked ? "Remover" : "Adicionar") : "Conjurar"}
        onClick={handleAddRemove(spell.name)}
      >
        {isEdit ? <IconPlus size="1.125rem" /> : <IconWand size="1.125rem" />}
      </ActionIcon>

      <UnstyledButton w="100%" onClick={() => setSelectedSpell(spell)}>
        <Group
          css={css`
            border-radius: var(--do_border_radius_md);
            border: 1px solid var(--do_border_color);
            padding: 8px;
            height: 100px;
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

          <Stack align="stretch" spacing={4}>
            {spell.casting_time.startsWith("1 reaction") ? (
              <ToggleTip label={spell.casting_time}>
                <Badge
                  css={css`
                    width: 100%;
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
              color={
                schoolColorMap[spell.school as keyof typeof schoolColorMap]
              }
              variant="outline"
            >
              {spell.school}
            </Badge>

            <Badge size="xs" variant="outline">
              {spell.range
                .replace(/-?f(ee|oo)t(-radius)?/, "ft ")
                .replace(/\(|(cone|hemisphere|line|cube|sphere|radius)|\)/g, "")
                .replace("-mile", " mi")}
              {spell.range.includes("cone") && (
                <IconCone2
                  css={css`
                    margin-left: 2px;
                    margin-bottom: -3px;
                  `}
                  size={12}
                />
              )}
              {spell.range.includes("hemisphere") && (
                <IconHemisphere
                  css={css`
                    margin-left: 2px;
                    margin-bottom: -3px;
                    rotate: 180deg;
                  `}
                  size={12}
                />
              )}
              {spell.range.includes("line") && (
                <IconLineDashed
                  css={css`
                    margin-left: 2px;
                    margin-bottom: -3px;
                  `}
                  size={12}
                />
              )}
              {spell.range.includes("cube") && (
                <IconBox
                  css={css`
                    margin-left: 2px;
                    margin-bottom: -3px;
                  `}
                  size={12}
                />
              )}
              {spell.range.includes(" sphere") && (
                <IconSphere
                  css={css`
                    margin-left: 2px;
                    margin-bottom: -3px;
                  `}
                  size={12}
                />
              )}
              {spell.range.includes(" radius") && (
                <IconCircleDashed
                  css={css`
                    margin-left: 2px;
                    margin-bottom: -3px;
                  `}
                  size={12}
                />
              )}
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

          <Space w={48} />
        </Group>
      </UnstyledButton>
    </Box>
  )
}

interface SpellListProps {
  spells: DnD5eSpell[]
  isEdit?: boolean
  onAddOrRemoveSpell?: AddOrRemoveSpellEvent
}
export default function SpellList({
  spells,
  isEdit,
  onAddOrRemoveSpell,
}: SpellListProps) {
  return (
    <Stack spacing="xs">
      {spells.map((spell, i, arr) => {
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
              <SpellCard
                spell={spell}
                isEdit={!!isEdit}
                onAddOrRemoveSpell={onAddOrRemoveSpell}
              />
            </Fragment>
          )
        )
      })}
    </Stack>
  )
}

const dividerStyles = css`
  position: sticky;
  top: 0;
  background: var(--do_color_background);
  line-height: 2.5;
  z-index: 3;
`

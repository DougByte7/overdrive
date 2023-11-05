/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
  Stack,
  Box,
  Title,
  Accordion,
  UnstyledButton,
  Text,
  Divider,
  Badge,
  Group,
  Tooltip,
} from "@mantine/core"
import { useAtom } from "jotai"
import { characterFormAton } from "../../state"
import { useMemo, type CSSProperties, type MouseEventHandler } from "react"
import classes from "@/assets/dnd/5e/classes"
import { useCounter } from "@mantine/hooks"
import spells from "@/assets/dnd/5e/spells.json"

interface ClassSelectionProps {
  styles: CSSProperties
}
export default function SpellSelection({ styles }: ClassSelectionProps) {
  const [form] = useAtom(characterFormAton)

  const { spellsKnown, cantripKnown } = classes[form.classes[0].name]
  const hasCantrips = cantripKnown?.length
  const hasSpells = !!spellsKnown && spellsKnown !== Infinity

  const cantrips = useMemo(() => {
    return hasCantrips
      ? spells.filter(
          (spell) =>
            spell.tags.includes("cantrip") &&
            spell.tags.includes(form.classes[0].name)
        )
      : []
  }, [form.classes])

  const firstLevel = useMemo(() => {
    return hasSpells
      ? spells.filter(
          (spell) =>
            spell.tags.includes("level1") &&
            spell.tags.includes(form.classes[0].name)
        )
      : []
  }, [form.classes])

  return (
    <Stack style={styles} gap="md">
      <Box>
        <Title size="h4">Escolha suas magias</Title>
        <Text size="sm">Escolha suas magias</Text>
      </Box>

      {!!cantrips.length && (
        <SpellList
          label="Truques"
          spells={cantrips}
          maxSpells={cantripKnown?.[0] ?? 0}
        />
      )}
      {!!firstLevel.length && (
        <SpellList
          label="1º Nível"
          spells={firstLevel}
          maxSpells={
            Array.isArray(spellsKnown) ? spellsKnown[0] : spellsKnown ?? 0
          }
        />
      )}
    </Stack>
  )
}

interface SpellListProps {
  label: string
  spells: typeof spells
  maxSpells: number
}
function SpellList({ label, spells, maxSpells }: SpellListProps) {
  const [form, setForm] = useAtom(characterFormAton)
  const [count, { increment, decrement }] = useCounter(0)

  const handleSelectSpell =
    (spellName: string): MouseEventHandler<HTMLButtonElement> =>
    (_) => {
      setForm((form) => {
        if (form.spells.includes(spellName)) {
          form.spells = form.spells.filter((s) => s !== spellName)
          decrement()
        } else if (count < maxSpells) {
          form.spells.push(spellName)
          increment()
        }
        return { ...form }
      })
    }

  return (
    <>
      <Divider
        mt="md"
        labelPosition="center"
        label={
          <Text fw="bold">
            {label} - {count} / {maxSpells}
          </Text>
        }
      />

      <Accordion
        variant="separated"
        radius="md"
        styles={{
          control: {
            padding: "12px",
          },
          item: {
            background: "none",
            border: "1px solid var(--do_text_color_500)",
          },
          chevron: {
            justifySelf: "end",
            marginLeft: "0",
            color: "var(--do_color_primary_base)",
          },
        }}
      >
        {spells.map((spell) => (
          <Accordion.Item key={spell.name} value={spell.name} pos="relative">
            <UnstyledButton
              css={css`
                position: absolute;
                top: 16px;
                left: 16px;
                bottom: 16px;
                right: 56px;
              `}
              aria-label={`Selecionar: ${spell.name}`}
              onClick={handleSelectSpell(spell.name)}
            />
            <Accordion.Control
              css={css`
                border-radius: inherit;
                border: 1px solid
                  ${form.spells.includes(spell.name)
                    ? "var(--do_color_primary_base)"
                    : "transparent"};
              `}
              aria-label="Exibir mais informações"
            >
              <Group gap="xs">
                {spell.name}

                <Group gap="xs">
                  <Badge size="sm" variant="outline">
                    {spell.school}
                  </Badge>
                  <Badge size="sm" variant="outline">
                    {spell.range}
                  </Badge>
                  <Badge size="sm" variant="outline">
                    {spell.casting_time}
                  </Badge>
                </Group>

                <Group gap="xs">
                  {spell.duration.startsWith("Concentration") && (
                    <Badge title="Concentraçào" size="sm">
                      C
                    </Badge>
                  )}
                  {spell.ritual && (
                    <Badge title="Ritual" size="sm">
                      R
                    </Badge>
                  )}
                  {spell.components.verbal && (
                    <Badge title="Verbal" size="sm">
                      V
                    </Badge>
                  )}
                  {spell.components.somatic && (
                    <Badge title="Somático" size="sm">
                      S
                    </Badge>
                  )}
                  {spell.components.material && (
                    <Tooltip
                      css={css`
                        position: relative;
                        z-index: 2;
                      `}
                      label={spell.components.materials_needed}
                      multiline
                    >
                      <Badge size="sm">M</Badge>
                    </Tooltip>
                  )}
                </Group>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>{spell.description}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  )
}

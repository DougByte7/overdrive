import classes, { DnD5eClassName } from "@/assets/dnd/5e/classes"
import { css } from "@emotion/react"
import {
  Stack,
  Box,
  Title,
  Accordion,
  UnstyledButton,
  Group,
  Avatar,
  Paper,
  Badge,
  Text,
} from "@mantine/core"
import { useAtom } from "jotai"
import { characterFormAton } from "../../state"
import type { CSSProperties, MouseEventHandler } from "react"

interface ClassSelectionProps {
  styles: CSSProperties
}
export default function ClassSelection({ styles }: ClassSelectionProps) {
  const [form, setForm] = useAtom(characterFormAton)

  const handleSelectClass =
    (className: DnD5eClassName): MouseEventHandler<HTMLButtonElement> =>
    (_) => {
      setForm((form) => ({ ...form, classes: [{ name: className, level: 1 }] }))
    }

  return (
    <Stack style={styles} gap="md">
      <Box>
        <Title size="h4">Escolha uma classe</Title>
        <Text size="sm">Escolha uma classe</Text>
      </Box>

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
        {Object.entries(classes).map(([classKey, classData]) => (
          <Accordion.Item
            key={classData.name}
            value={classData.name}
            pos="relative"
          >
            <UnstyledButton
              css={css`
                position: absolute;
                top: 16px;
                left: 16px;
                bottom: 16px;
                right: 56px;
              `}
              aria-label={`Selecionar: ${classData.name}, ${classData.description};`}
              onClick={handleSelectClass(classKey as DnD5eClassName)}
            />
            <Accordion.Control
              css={css`
                border-radius: inherit;
                border: 1px solid
                  ${form.classes[0]?.name === classKey
                    ? "var(--do_color_primary_base)"
                    : "transparent"};
              `}
              aria-label="Exibir mais informações"
            >
              <Group gap="xs">
                <Avatar size={40} alt="" src={`/icons/${classKey}.svg`} />
                <div
                  css={css`
                    width: 78%;
                  `}
                >
                  <Text fw={600}>{classData.name}</Text>
                  <Text size="11px">{classData.description}</Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {classData.features.map((trait) => (
                  <Paper
                    key={classData.name + trait.name}
                    withBorder
                    p="md"
                    radius="md"
                  >
                    <Group>
                      <Text fw={600}>
                        {trait.name}{" "}
                        <Badge color="gray" size="xs">
                          {trait.level}º nível
                        </Badge>
                      </Text>
                      <Text>{trait.description}</Text>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  )
}

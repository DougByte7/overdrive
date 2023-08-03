import classes from "@/assets/dnd/5e/classes"
import races from "@/assets/dnd/5e/races"
import getModifier from "@/assets/dnd/5e/utils/getModifier"
import { css } from "@emotion/react"
import {
  Stack,
  Box,
  Title,
  Text,
  Paper,
  Group,
  Avatar,
  Space,
  Grid,
  Badge,
  ActionIcon,
  Accordion,
} from "@mantine/core"
import { useAtom } from "jotai"
import { characterFormAton, avatarPreviewUrlAton } from "../../state"
import type { CSSProperties, Dispatch, SetStateAction } from "react"
import { IconPencil } from "@tabler/icons"
import abilityScores from "@/assets/dnd/5e/abilityScores"
import { Steps } from "../../character-builder"
import equipmentList from "@/assets/dnd/5e/equipment.json"
import { WithAmount, EquipmentIndex } from "@/assets/dnd/5e/classes/interfaces"

interface ReviewOptionsProps {
  styles: CSSProperties
  setStep: Dispatch<SetStateAction<number>>
}
export default function ReviewOptions({ styles, setStep }: ReviewOptionsProps) {
  const [form] = useAtom(characterFormAton)
  const [avatarPreviewUrl] = useAtom(avatarPreviewUrlAton)

  return (
    <Stack style={styles} spacing="md">
      <Box>
        <Title size="h4">Só mais uma coisinha!</Title>
        <Text size="sm">
          Decidiu mudar algo? Sua chance é agora! Uma última olhada antes da
          aventura.
        </Text>
      </Box>

      <Box>
        <Text size="sm">Perfil e Atributos</Text>
        <Paper withBorder p="md">
          <Group>
            <Avatar
              size={40}
              alt=""
              src={avatarPreviewUrl || `/images/fantasy/races/${form.race}.png`}
            />
            <Text
              css={css`
                flex-grow: 1;
              `}
              weight={600}
            >
              {form.name || "Nome"}
            </Text>
            <EditButton step={Steps.DESCRIPTION} setStep={setStep} />
          </Group>
        </Paper>

        <Space h="md" />

        <Paper withBorder p="md">
          <Group>
            <Text
              css={css`
                flex-grow: 1;
              `}
              weight={600}
            >
              Atributos
            </Text>
            <EditButton step={Steps.ATTRIBUTE_METHOD} setStep={setStep} />
          </Group>
          <Stack>
            {Object.values(abilityScores).map((ability) => {
              const attVal = form[ability.attributeName].total
              const mod = getModifier(attVal)
              return (
                <Grid key={ability.attributeName} align="center">
                  <Grid.Col span={4}>{ability.name.substring(0, 3)}</Grid.Col>
                  <Grid.Col span={8}>
                    <Group>
                      <span css={attributeButtonStyles}>{attVal}</span>
                      <Badge variant="outline">
                        {mod >= 0 && "+"}
                        {mod}
                      </Badge>
                    </Group>
                  </Grid.Col>
                </Grid>
              )
            })}
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Text size="sm">Raça</Text>
        <Paper withBorder p="md">
          <Group>
            <Text
              css={css`
                flex-grow: 1;
              `}
              weight={600}
            >
              {races[form.race!].name}
            </Text>
            <EditButton step={Steps.RACE} setStep={setStep} />
          </Group>

          <Space h="md" />

          <Accordion variant="contained">
            {races[form.race!].traits.map((trait) => (
              <Accordion.Item key={trait.name} value={trait.name}>
                <Accordion.Control>
                  <Text weight={600}>{trait.name}</Text>
                </Accordion.Control>
                <Accordion.Panel>{trait.description}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Paper>
      </Box>

      <Box>
        <Text size="sm">Classe</Text>
        <Paper withBorder p="md">
          <Group>
            <Text
              css={css`
                flex-grow: 1;
              `}
              weight={600}
            >
              {form.classes
                .map((classKey) => classes[classKey].name)
                .join(", ")}
            </Text>
            <EditButton step={Steps.CLASS} setStep={setStep} />
          </Group>

          <Space h="md" />

          <Accordion variant="contained">
            {form.classes.map((classKey) =>
              classes[classKey].features.map((feature) => (
                <Accordion.Item key={feature.name} value={feature.name}>
                  <Accordion.Control>
                    <Text weight={600}>
                      {feature.name}
                      <Badge color="gray" size="xs">
                        {Array.isArray(feature.level)
                          ? feature.level.join(", ")
                          : feature.level}
                        º nível
                      </Badge>
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>{feature.description}</Accordion.Panel>
                </Accordion.Item>
              ))
            )}
          </Accordion>
        </Paper>
      </Box>

      <Box>
        <Paper withBorder p="md">
          <Group>
            <Text
              css={css`
                flex-grow: 1;
              `}
              weight={600}
            >
              Aspectos de classe/raça
            </Text>
            <EditButton step={Steps.FEATURES} setStep={setStep} />
          </Group>

          <Space h="md" />

          <Stack>
            {Object.entries(form.traits).map(([k, v], i) => {
              return (
                <Text key={`${v}${i}`}>
                  {k}:
                  {
                    races[form.race!].traits
                      .find((t) => t.name === k)
                      ?.options?.find((o) => o.value === k)?.label
                  }
                </Text>
              )
            })}
            {Object.entries(form.features).map(([k, v], i) => {
              return (
                <Text key={`${v}${i}`}>
                  {k}:{" "}
                  {
                    classes[form.classes[0]].features
                      .find((f) => f.name === k)
                      ?.options?.find((o) => o.value === v)?.label
                  }
                </Text>
              )
            })}
            {/**
             * @todo translate this
             */}
            {form.proficiencies.map((p) => (
              <Text key={p}>{p}</Text>
            ))}
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Paper withBorder p="md">
          <Group>
            <Text
              css={css`
                flex-grow: 1;
              `}
              weight={600}
            >
              Itens
            </Text>
            <EditButton step={Steps.ITEMS} setStep={setStep} />
          </Group>

          <Space h="md" />

          <Stack>
            {form.items
              .reduce((acc, item) => {
                const prevItem = acc.find((i) => i.index === item.index)
                if (prevItem) {
                  prevItem.amount++
                  return acc
                }

                return [...acc, item]
              }, [] as WithAmount<EquipmentIndex>[])
              .map((item, i) => {
                return (
                  <Text key={`${item.index}${i}`}>
                    {item.amount}x{" "}
                    {equipmentList.find((e) => e.index === item.index)?.name ??
                      "ITEM_NOT_FOUND"}
                    {item.ammo && ` e ${item.ammo}x munições`}
                  </Text>
                )
              })}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

const attributeButtonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--do_border_radius_sm);
  width: 39px;
  height: 40px;
  background: var(--do_color_primary_light_50);
  font-size: var(--do_text_size_lg);
  font-weight: bold;
`
const EditButton = ({
  step,
  setStep,
}: {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}) => (
  <ActionIcon
    color="brand"
    size="xs"
    variant="outline"
    css={css`
      border-bottom-left-radius: 0;
    `}
    onClick={() => setStep(step)}
  >
    <IconPencil size=".75rem" />
  </ActionIcon>
)
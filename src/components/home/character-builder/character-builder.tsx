/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
  ActionIcon,
  TextInput,
  Title,
  Text,
  FileInput,
  Box,
  Button,
  Stack,
  Paper,
  Group,
  Avatar,
  Accordion,
  Space,
  Transition,
  UnstyledButton,
  Image,
  Badge,
  Grid,
} from "@mantine/core"
import { IconChevronLeft, IconPencil } from "@tabler/icons"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import races from "@/assets/dnd/5e/races"
import classes from "@/assets/dnd/5e/classes"
import abilityScores from "@/assets/dnd/5e/abilityScores"
import { Attribute } from "@/assets/dnd/5e/classes/interfaces"

interface CharacterForm {
  name: string
  picture: File | null
  race: string
  class: string
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}

interface CharacterBuilderProps {
  onCancel: VoidFunction
}

function rollAttribute() {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ]

  const lower = Math.min(...rolls)
  rolls.splice(rolls.indexOf(lower), 1)

  return rolls.reduce((acc, roll) => {
    return acc + roll
  }, 0)
}

function getModifier(abilityScore: number) {
  return Math.floor((abilityScore - 10) / 2)
}

export default function CharacterBuilder({ onCancel }: CharacterBuilderProps) {
  const [form, setForm] = useState<CharacterForm>({
    name: "",
    picture: null,
    race: "",
    class: "",
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  })
  const [pictureUrl, setPictureUrl] = useState("")
  const [step, setStep] = useState(1)
  const [rolls, setRolls] = useState(() => [
    { value: rollAttribute(), usedAt: "" },
    { value: rollAttribute(), usedAt: "" },
    { value: rollAttribute(), usedAt: "" },
    { value: rollAttribute(), usedAt: "" },
    { value: rollAttribute(), usedAt: "" },
    { value: rollAttribute(), usedAt: "" },
  ])
  const [selectedRoll, setSelectedRoll] = useState({
    activeIndex: -1,
    value: 0,
  })

  const handleSetName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, name: e.currentTarget.value })
  }

  const handleSetPicture = (picture: File) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) =>
      e.target && setPictureUrl(e.target.result as string)
    if (picture) reader.readAsDataURL(picture)
    else setPictureUrl("")

    setForm({ ...form, picture })
  }

  const handledPrev = () => {
    const prevStep = step - 1
    if (prevStep === 0) onCancel()

    setStep(prevStep)
  }
  const handleNext = () => {
    if (step === 7) {
      /**
       * @todo Go to character sheet on linked adventure or empty board
       */
      onCancel()
    }

    if (step === 6) {
      try {
        const characters = JSON.parse(
          localStorage.getItem("characters") ?? "[]"
        )
        localStorage.setItem(
          "characters",
          JSON.stringify([...characters, form])
        )
      } catch {
        console.error("Erro ao salvar personagem local")
      }
    }
    setStep((step) => step + 1)
  }

  const handleSelectRace =
    (race: keyof typeof races): MouseEventHandler<HTMLButtonElement> =>
    (_) => {
      setForm({ ...form, race: race })
    }

  const handleSelectClass =
    (className: keyof typeof classes): MouseEventHandler<HTMLButtonElement> =>
    (_) => {
      setForm({ ...form, class: className })
    }

  const handleSelectAttrValue = (activeIndex: number, value: number) => () => {
    setSelectedRoll({ activeIndex, value })
  }

  const handleSetAttrValue = (attr: Attribute) => (e: any) => {
    ;(e as MouseEvent).stopPropagation()
    if (!selectedRoll.value) return

    setRolls((rolls) => {
      const rollIndex = rolls.findIndex((roll) => roll.usedAt === attr)
      if (rollIndex >= 0) {
        rolls[rollIndex].usedAt = ""
      }

      rolls[selectedRoll.activeIndex].usedAt = attr
      return rolls
    })

    setForm((form) => {
      if (rolls[selectedRoll.activeIndex].usedAt) {
        form[rolls[selectedRoll.activeIndex].usedAt as Attribute] = 0
      }

      form[attr] = selectedRoll.value
      return form
    })

    setSelectedRoll({
      activeIndex: -1,
      value: 0,
    })
  }

  const EditButton = ({ step }: { step: number }) => (
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

  return (
    <Stack spacing="md" h={590}>
      <ActionIcon
        variant="light"
        aria-label={step - 1 === 0 ? "Cancelar" : "Voltar etapa"}
        onClick={handledPrev}
      >
        <IconChevronLeft size="1rem" color="var(--do_color_primary_base)" />
      </ActionIcon>

      <Transition mounted={step === 1} transition="fade">
        {(styles) => {
          return (
            <Stack style={styles} spacing="md" h="100%">
              <Box>
                <Title size="h4">Como o seu personagem é?</Title>
                <Text size="sm">Escolha um nome e uma foto.</Text>
              </Box>

              <Stack
                sx={{
                  maxWidth: "288px",
                }}
                spacing="xs"
              >
                <FileInput
                  name="character-picture"
                  label="Foto do personagem"
                  placeholder="Selecione uma foto..."
                  accept="image/png,image/jpeg,image/avif"
                  withAsterisk
                  sx={{
                    ".mantine-InputWrapper-label": {
                      fontSize: "var(--do_text_size_sm)",
                      fontWeight: 700,
                    },
                  }}
                  onChange={handleSetPicture}
                />
                <TextInput
                  name="name"
                  label="Nome do Personagem"
                  autoComplete="false"
                  withAsterisk
                  placeholder="Anóriel Heinhardt"
                  sx={{
                    ".mantine-InputWrapper-label": {
                      fontSize: "var(--do_text_size_sm)",
                      fontWeight: 700,
                    },
                  }}
                  value={form.name}
                  onChange={handleSetName}
                />
              </Stack>

              <Paper withBorder p="md">
                <Group>
                  <Avatar size={40} alt="" src={pictureUrl} />
                  <Text weight={600}>{form.name || "Nome"}</Text>
                </Group>
              </Paper>
            </Stack>
          )
        }}
      </Transition>

      <Transition mounted={step === 2} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
            <Box>
              <Title size="h4">Escolha uma raça</Title>
              <Text size="sm">Escolha uma raça</Text>
            </Box>

            <Accordion
              variant="separated"
              radius="md"
              styles={{
                item: {
                  background: "none",
                  border: "1px solid var(--do_text_color_500)",
                },
                chevron: {
                  justifySelf: "end",
                  marginLeft: "0.65rem",
                  color: "var(--do_color_primary_base)",
                },
              }}
            >
              {Object.entries(races).map(([raceKey, race]) => (
                <Accordion.Item
                  value={race.name}
                  key={race.name}
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
                    aria-label={`Selecionar: ${race.name}, ${race.description};`}
                    onClick={handleSelectRace(raceKey as keyof typeof races)}
                  />
                  <Accordion.Control
                    css={css`
                      border-radius: inherit;
                      border: 1px solid
                        ${form.race === raceKey
                          ? "var(--do_color_primary_base)"
                          : "transparent"};
                    `}
                    aria-label="Exibir mais informações"
                  >
                    <Group>
                      <Avatar
                        size={40}
                        alt=""
                        src={"https://via.placeholder.com/40/"}
                      />
                      <span>
                        <Text weight={600}>{race.name}</Text>
                        <Text size="sm">{race.description}</Text>
                      </span>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack spacing="md">
                      {race.traits.map((trait) => (
                        <Paper
                          key={race.name + trait.name}
                          withBorder
                          p="md"
                          radius="md"
                        >
                          <Group>
                            {/* <Avatar
                        size={18}
                        alt=""
                        src={"https://via.placeholder.com/40/"}
                      /> */}
                            <Text weight={600}>{trait.name}</Text>
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
        )}
      </Transition>

      <Transition mounted={step === 3} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
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
              {Object.entries(classes).map(([classKey, className]) => (
                <Accordion.Item
                  value={className.name}
                  key={className.name}
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
                    aria-label={`Selecionar: ${className.name}, ${className.description};`}
                    onClick={handleSelectClass(
                      classKey as keyof typeof classes
                    )}
                  />
                  <Accordion.Control
                    css={css`
                      border-radius: inherit;
                      border: 1px solid
                        ${form.class === classKey
                          ? "var(--do_color_primary_base)"
                          : "transparent"};
                    `}
                    aria-label="Exibir mais informações"
                  >
                    <Group spacing="xs">
                      <Avatar
                        size={40}
                        alt=""
                        src={"https://via.placeholder.com/40/"}
                      />
                      <div
                        css={css`
                          width: 78%;
                        `}
                      >
                        <Text weight={600}>{className.name}</Text>
                        <Text size="11px">{className.description}</Text>
                      </div>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack spacing="md">
                      {className.features.map((trait) => (
                        <Paper
                          key={className.name + trait.name}
                          withBorder
                          p="md"
                          radius="md"
                        >
                          <Group>
                            {/* <Avatar
                        size={18}
                        alt=""
                        src={"https://via.placeholder.com/40/"}
                      /> */}
                            <Text weight={600}>{trait.name}</Text>
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
        )}
      </Transition>

      <Transition mounted={step === 4} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
            <Box>
              <Title size="h4">Vamos rolar dados!</Title>
              <Text size="sm">
                Vamos fazer várias rolagens e anotar os valores.
              </Text>
            </Box>
            <Image
              maw="100%"
              fit="contain"
              width={311}
              height={283}
              src="https://via.placeholder.com/283x311/"
              alt="Conjunto de dados"
            />
            <Space h="2rem" />
          </Stack>
        )}
      </Transition>

      <Transition mounted={step === 5} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
            <Box>
              <Title size="h4">Escolha os seus atributos!</Title>
              <Text size="sm">
                Agora que rolamos todos os dados, vamos dividir em seus
                atributos.
              </Text>
              <Space h="xs" />
              <Group spacing="xs">
                {rolls.map((roll, i) => {
                  return (
                    <button
                      key={i}
                      css={[
                        attributeButtonStyles,
                        selectedRoll.activeIndex === i
                          ? attributeButtonActiveStyles
                          : null,
                        roll.usedAt ? attributeButtonUsedStyles : null,
                      ]}
                      onClick={handleSelectAttrValue(i, roll.value)}
                    >
                      {roll.value}
                    </button>
                  )
                })}
              </Group>
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
              {Object.values(abilityScores).map((ability) => (
                <Accordion.Item
                  value={ability.name}
                  key={ability.name}
                  pos="relative"
                >
                  <Accordion.Control aria-label="Exibir mais informações">
                    <Group spacing="xs">
                      <button
                        css={attributeButtonStyles}
                        onClick={handleSetAttrValue(ability.attributeName)}
                      >
                        {form[ability.attributeName] || ""}{" "}
                      </button>

                      <Text weight={600}>
                        {ability.name}{" "}
                        {!!form[ability.attributeName] && (
                          <Badge variant="outline">
                            {getModifier(form[ability.attributeName]) > 0
                              ? "+"
                              : ""}
                            {getModifier(form[ability.attributeName])}
                          </Badge>
                        )}
                      </Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>{ability.description}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        )}
      </Transition>

      <Transition mounted={step === 6} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
            <Box>
              <Title size="h4">Só mais uma coisinha!</Title>
              <Text size="sm">
                Decidiu mudar algo? Sua chance é agora! Uma última olhada antes
                da aventura.
              </Text>
            </Box>

            <Box>
              <Text size="sm">Perfil e Atributos</Text>
              <Paper withBorder p="md">
                <Group>
                  <Avatar size={40} alt="" src={pictureUrl} />
                  <Text
                    css={css`
                      flex-grow: 1;
                    `}
                    weight={600}
                  >
                    {form.name || "Nome"}
                  </Text>
                  <EditButton step={1} />
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
                  <EditButton step={5} />
                </Group>
                <Stack>
                  <Grid align="center">
                    <Grid.Col span={4}>For</Grid.Col>
                    <Grid.Col span={4}>
                      <span css={attributeButtonStyles}>{form.str}</span>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Badge variant="outline">
                        {getModifier(form.str) >= 0 ? "+" : ""}
                        {getModifier(form.str)}
                      </Badge>
                    </Grid.Col>
                  </Grid>
                  <Grid align="center">
                    <Grid.Col span={4}>Des</Grid.Col>
                    <Grid.Col span={4}>
                      <span css={attributeButtonStyles}>{form.dex}</span>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Badge variant="outline">
                        {getModifier(form.dex) >= 0 ? "+" : ""}
                        {getModifier(form.dex)}
                      </Badge>
                    </Grid.Col>
                  </Grid>
                  <Grid align="center">
                    <Grid.Col span={4}>Con</Grid.Col>
                    <Grid.Col span={4}>
                      <span css={attributeButtonStyles}>{form.con}</span>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Badge variant="outline">
                        {getModifier(form.con) >= 0 ? "+" : ""}
                        {getModifier(form.con)}
                      </Badge>
                    </Grid.Col>
                  </Grid>
                  <Grid align="center">
                    <Grid.Col span={4}>Int</Grid.Col>
                    <Grid.Col span={4}>
                      <span css={attributeButtonStyles}>{form.int}</span>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Badge variant="outline">
                        {getModifier(form.int) >= 0 ? "+" : ""}
                        {getModifier(form.int)}
                      </Badge>
                    </Grid.Col>
                  </Grid>
                  <Grid align="center">
                    <Grid.Col span={4}>Sab</Grid.Col>
                    <Grid.Col span={4}>
                      <span css={attributeButtonStyles}>{form.wis}</span>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Badge variant="outline">
                        {getModifier(form.wis) >= 0 ? "+" : ""}
                        {getModifier(form.wis)}
                      </Badge>
                    </Grid.Col>
                  </Grid>
                  <Grid align="center">
                    <Grid.Col span={4}> Car</Grid.Col>
                    <Grid.Col span={4}>
                      <span css={attributeButtonStyles}>{form.cha}</span>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Badge variant="outline">
                        {getModifier(form.cha) >= 0 ? "+" : ""}
                        {getModifier(form.cha)}
                      </Badge>
                    </Grid.Col>
                  </Grid>
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
                    {races[form.race as keyof typeof races].name}
                  </Text>
                  <EditButton step={2} />
                </Group>

                <Space h="md" />

                <Stack spacing="md">
                  {races[form.race as keyof typeof races].traits.map(
                    (trait) => (
                      <Paper key={trait.name} withBorder p="md" radius="md">
                        <Group>
                          {/* <Avatar
                        size={18}
                        alt=""
                        src={"https://via.placeholder.com/40/"}
                      /> */}
                          <Text weight={600}>{trait.name}</Text>
                          <Text>{trait.description}</Text>
                        </Group>
                      </Paper>
                    )
                  )}
                </Stack>
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
                    {classes[form.class as keyof typeof classes].name}
                  </Text>
                  <EditButton step={3} />
                </Group>

                <Space h="md" />

                <Stack spacing="md">
                  {classes[form.class as keyof typeof classes].features.map(
                    (feature) => (
                      <Paper key={feature.name} withBorder p="md" radius="md">
                        <Group>
                          {/* <Avatar
                        size={18}
                        alt=""
                        src={"https://via.placeholder.com/40/"}
                      /> */}
                          <Text weight={600}>{feature.name}</Text>
                          <Text>{feature.description}</Text>
                        </Group>
                      </Paper>
                    )
                  )}
                </Stack>
              </Paper>
            </Box>
          </Stack>
        )}
      </Transition>

      <Transition mounted={step === 7} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
            <Box>
              <Title size="h4">Seu personagem foi gerado!</Title>
              <Text size="sm">
                O que está esperando, grandes aventuras esperam por você.
              </Text>
            </Box>
            <Image
              maw="100%"
              fit="contain"
              width={311}
              height={283}
              src={pictureUrl}
              alt=""
            />
            <Space h="2rem" />
          </Stack>
        )}
      </Transition>

      <Box>
        <Button fullWidth size="lg" onClick={handleNext}>
          {step === 4
            ? "Rolar os dados"
            : step === 6
            ? "Criar personagem"
            : step === 7
            ? "Iniciar aventura"
            : "Próximo"}
        </Button>
        <Space h="md" />
        <Button variant="subtle" size="md" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
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

const attributeButtonActiveStyles = css`
  outline: 1px solid var(--do_color_primary_base);
  outline-offset: 2px;
`

const attributeButtonUsedStyles = css`
  opacity: 0.5;
  text-decoration: line-through;
`

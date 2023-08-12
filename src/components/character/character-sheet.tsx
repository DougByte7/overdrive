import type { Attribute, Skill } from "@/assets/dnd/5e/classes/interfaces"
import getModifier from "@/assets/dnd/5e/utils/getModifier"
import useCharacter from "@/hooks/useCharacter"
import { css } from "@emotion/react"
import {
  ActionIcon,
  Group,
  Title,
  Text,
  Stack,
  Badge,
  Box,
  Checkbox,
  Avatar,
  UnstyledButton,
  Transition,
  Spoiler,
  List,
} from "@mantine/core"
import {
  IconChevronLeft,
  IconShieldFilled,
  IconHeartFilled,
} from "@tabler/icons-react"
import CharacterPortrait from "./components/character-portrait"
import classes from "@/assets/dnd/5e/classes"
import races from "@/assets/dnd/5e/races"
import equipment from "@/assets/dnd/5e/equipment.json"
import { CSSProperties, useState } from "react"

interface CharacterSheetProps {
  characterId: string
}
export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const { characters } = useCharacter()
  const [activeTab, setActiveTab] = useState<"basic" | "inventory" | "skills">(
    "basic"
  )
  const [selectedItem, setSelectedItem] = useState<
    (typeof equipment)[number] | null
  >(null)

  const character = characters[+characterId]

  const attributeOptions: LabelValue<Attribute>[] = [
    {
      value: "strength",
      label: "Força",
    },
    {
      value: "dexterity",
      label: "Destreza",
    },
    {
      value: "constitution",
      label: "Constituição",
    },
    {
      value: "intelligence",
      label: "Inteligência",
    },
    {
      value: "wisdom",
      label: "Sabedoria",
    },
    {
      value: "charisma",
      label: "Carisma",
    },
  ]

  const skills: LabelValue<Skill>[] = [
    { label: "Arcana", value: "arcana" },
    { label: "Acrobacia (Acrobatics)", value: "acrobatics" },
    { label: "Atletismo (Athletics)", value: "athletics" },
    { label: "Enganação (Deception)", value: "deception" },
    { label: "Furtividade (Stealth)", value: "stealth" },
    { label: "Historia (History)", value: "history" },
    { label: "Intimidação (Intimidation)", value: "intimidation" },
    { label: "Intuição (Insight)", value: "insight" },
    { label: "Investigação (Investigation)", value: "investigation" },
    { label: "Lidar com animais (Animal Handling)", value: "animal_handling" },
    { label: "Medicina (Medicine)", value: "medicine" },
    { label: "Natureza (Nature)", value: "nature" },
    { label: "Percepção (Perception)", value: "perception" },
    { label: "Persuasão (Persuasion)", value: "persuasion" },
    { label: "Religião (Religion)", value: "religion" },
    { label: "Sobrevivência (Survival)", value: "survival" },
  ]

  const skillModifierMap: Record<Skill, Attribute> = {
    arcana: "intelligence",
    acrobatics: "dexterity",
    athletics: "strength",
    deception: "charisma",
    stealth: "dexterity",
    history: "intelligence",
    intimidation: "charisma",
    insight: "wisdom",
    investigation: "intelligence",
    animal_handling: "wisdom",
    medicine: "wisdom",
    nature: "intelligence",
    perception: "wisdom",
    persuasion: "charisma",
    religion: "intelligence",
    survival: "wisdom",
  }

  const armor =
    character &&
    equipment.find(
      (e) =>
        e.equipment_category.index === "armor" &&
        character.items.map((i) => i.index).includes(e.index)
    )

  const items =
    character?.items.reduce((acc, item) => {
      const normalizedIndexes = Array(item.amount).fill(item.index)
      return [...acc, ...normalizedIndexes]
    }, [] as string[]) ?? []

  const handleSetSelectedItem = (item: (typeof equipment)[number]) => () => {
    setSelectedItem(item)
  }

  return (
    character && (
      <>
        <header>
          <Group p="md">
            <ActionIcon
              size="xl"
              variant="light"
              title="Voltar para página inicial"
              component="a"
              href="/home"
            >
              <IconChevronLeft
                size="1rem"
                color="var(--do_color_primary_base)"
              />
            </ActionIcon>

            <Title css={pageTitleStyles} size="md">
              Personagem
            </Title>
          </Group>
        </header>
        <main css={mainStyles}>
          {activeTab === "basic" && (
            <>
              <CharacterPortrait
                imgSrc={character.picture as string}
                name={character.name}
                label={`${races[character.race!].name}, ${character.classes
                  .map((classIndex) => classes[classIndex].name)
                  .join(", ")}.`}
              />
              <Group position="center">
                <Stack align="center" spacing={0}>
                  <Box pos="relative" h={64}>
                    <IconShieldFilled
                      css={css`
                        color: #a5a5a5;
                      `}
                      size={64}
                    />
                    <Text
                      css={iconTextStyles}
                      size="lg"
                      fw="bold"
                      color="var(--do_text_color_600)"
                    >
                      {(armor?.armor_class?.base ?? 8) +
                        Math.min(
                          +(armor?.armor_class?.dex_bonus ?? 1) *
                            getModifier(character.dexterity.total),
                          armor?.armor_class?.max_bonus ?? Infinity
                        )}{" "}
                    </Text>
                  </Box>
                  <Text size="sm" fw="bold" color="var(--do_text_color_300)">
                    CA
                  </Text>
                </Stack>

                <Stack align="center" spacing={0}>
                  <Box pos="relative" h={64}>
                    <IconHeartFilled
                      css={css`
                        color: #fb3642;
                      `}
                      size={64}
                    />
                    <Text
                      css={iconTextStyles}
                      size="lg"
                      fw="bold"
                      color="var(--do_text_color_600)"
                    >
                      {+classes[character.classes[0]].hp.dice.replace("d", "") +
                        getModifier(character.constitution.total)}{" "}
                    </Text>
                  </Box>
                  <Text size="sm" fw="bold" color="var(--do_text_color_300)">
                    HP
                  </Text>
                </Stack>
              </Group>
              <Stack spacing="xs">
                {attributeOptions.map((attr) => {
                  const abilityModifier = getModifier(
                    character[attr.value].total
                  )

                  return (
                    <Group key={attr.value} position="apart">
                      <Text>{attr.label}</Text>
                      <Group spacing="sm">
                        <Badge mr="sm" variant="outline">
                          {abilityModifier > 0 && "+"}
                          {abilityModifier}
                        </Badge>
                        <Text css={attributeNumberStyles}>
                          {character[attr.value].total}
                        </Text>
                      </Group>
                    </Group>
                  )
                })}
              </Stack>
            </>
          )}

          {activeTab === "inventory" && (
            <>
              <Stack>
                {items.map((item, i) => {
                  const data = equipment.find((e) => e.index === item)
                  if (!data) return

                  return (
                    <UnstyledButton
                      key={item + i}
                      onClick={handleSetSelectedItem(data)}
                    >
                      <Group>
                        <Avatar />
                        <Stack spacing={0}>
                          <Text fw="bold">{data.name}</Text>
                          <Text title={data.desc.join("")} size="sm">
                            {data.desc.join("").substring(0, 45)}
                            {data.desc.join("").length > 45 && "..."}
                          </Text>
                        </Stack>
                      </Group>
                    </UnstyledButton>
                  )
                })}
              </Stack>

              <Transition mounted={!!selectedItem} transition="fade">
                {(styles) => (
                  <div
                    style={{ ...styles, ...backdropStyles }}
                    onClick={() => setSelectedItem(null)}
                  />
                )}
              </Transition>
              <Transition mounted={!!selectedItem} transition="slide-up">
                {(styles) => (
                  <div style={{ ...styles, ...itemInfoStyles }}>
                    <ActionIcon
                      size="xl"
                      variant="light"
                      title="Fechar item"
                      onClick={() => setSelectedItem(null)}
                    >
                      <IconChevronLeft
                        size="1rem"
                        color="var(--do_color_primary_base)"
                      />
                    </ActionIcon>

                    <Stack align="center" spacing="sm">
                      <Avatar size={80} />
                      <Text fw="bold" size="lg">
                        {selectedItem?.name}
                      </Text>
                      <Spoiler
                        maxHeight={75}
                        showLabel="Ver mais"
                        hideLabel="Ver menos"
                      >
                        <Text>{selectedItem?.desc}</Text>
                      </Spoiler>

                      <Group position="center">
                        {selectedItem?.damage && (
                          <Stack
                            justify="center"
                            align="center"
                            spacing={0}
                            bg="var(--do_color_primary_base)"
                            css={css`
                              border-radius: var(--do_border_radius_md);
                            `}
                            px="md"
                            miw={68}
                            h={68}
                          >
                            <Text color="white" fw="bold">
                              {selectedItem?.damage.damage_dice}
                            </Text>
                            <Text color="white">
                              {selectedItem?.damage.damage_type.name}
                            </Text>
                          </Stack>
                        )}

                        {selectedItem?.armor_class && (
                          <Stack
                            justify="center"
                            align="center"
                            spacing={0}
                            bg="var(--do_color_primary_base)"
                            css={css`
                              border-radius: var(--do_border_radius_md);
                            `}
                            px="md"
                            miw={68}
                            h={68}
                          >
                            <Text color="white" fw="bold">
                              {selectedItem?.armor_class.base}
                            </Text>
                            <Text color="white">CA</Text>
                          </Stack>
                        )}

                        {selectedItem?.armor_class?.max_bonus && (
                          <Stack
                            justify="center"
                            align="center"
                            spacing={0}
                            bg="var(--do_color_primary_base)"
                            css={css`
                              border-radius: var(--do_border_radius_md);
                            `}
                            px="md"
                            miw={68}
                            h={68}
                          >
                            <Text color="white">
                              {selectedItem?.armor_class.max_bonus}
                            </Text>
                            <Text color="white">Des. max.</Text>
                          </Stack>
                        )}
                      </Group>

                      {!!selectedItem?.contents.length && (
                        <List>
                          {selectedItem?.contents.map((c, i) => (
                            <List.Item key={i}>
                              {c.quantity}x {c.item.name}
                            </List.Item>
                          ))}
                        </List>
                      )}
                    </Stack>
                  </div>
                )}
              </Transition>
            </>
          )}

          {activeTab === "skills" && (
            <Stack spacing="xs">
              {skills.map((attr) => {
                const isTrained = character.proficiencies.includes(attr.value)

                return (
                  <Group key={attr.value} position="apart">
                    <Checkbox label={attr.label} checked={isTrained} />

                    <Text css={attributeNumberStyles}>
                      {+isTrained * 3 +
                        getModifier(
                          character[skillModifierMap[attr.value]].total
                        )}
                    </Text>
                  </Group>
                )
              })}
            </Stack>
          )}
        </main>
        <footer css={footerStyles}>
          <Group h={70} spacing={0}>
            <button css={footerBtnStyles} onClick={() => setActiveTab("basic")}>
              <div
                aria-hidden={true}
                css={customIconStyles(
                  `/icons/${
                    activeTab === "basic" ? "bold" : "linear"
                  }/user-octagon.svg`,
                  activeTab === "basic"
                )}
              />
              Básico
            </button>
            <button
              css={footerBtnStyles}
              onClick={() => setActiveTab("inventory")}
            >
              <div
                aria-hidden={true}
                css={customIconStyles(
                  `/icons/${
                    activeTab === "inventory" ? "bold" : "linear"
                  }/archive.svg`,
                  activeTab === "inventory"
                )}
              />
              Inventário
            </button>
            <button
              css={footerBtnStyles}
              onClick={() => setActiveTab("skills")}
            >
              <div
                aria-hidden={true}
                css={customIconStyles(
                  `/icons/${
                    activeTab === "skills" ? "bold" : "linear"
                  }/book.svg`,
                  activeTab === "skills"
                )}
              />
              Habilidades
            </button>
          </Group>
        </footer>
      </>
    )
  )
}

const pageTitleStyles = css`
  position: absolute;
  left: 50%;
  translate: -50%;
`

const mainStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-inline: 16px;
  padding-bottom: 86px;
`

const iconTextStyles = css`
  position: absolute;
  top: 25%;
  left: 50%;
  translate: -50%;
`

const attributeNumberStyles = css`
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
const footerBtnStyles = css`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--do_color_support_light_30);
  width: 33%;
  height: 100%;
  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid var(--do_color_support_light_30);
  }
`
const footerStyles = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--do_text_color_600);
`

const customIconStyles = (path: string, isActive: boolean) => css`
  width: 24px;
  height: 24px;
  background-color: ${isActive
    ? "var(--do_color_primary_base)"
    : "var(--do_color_support_dark_30)"};
  mask: url(${path}) no-repeat center;
`

const backdropStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.6)",
  zIndex: 1,
}
const itemInfoStyles: CSSProperties = {
  position: "fixed",
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  borderTopRightRadius: "var(--do_border_radius_lg)",
  borderTopLeftRadius: "var(--do_border_radius_lg)",
  padding: "16px",
  paddingBottom: "32px",
  minHeight: "535px",
  background: "var(--do_text_color_600)",
}

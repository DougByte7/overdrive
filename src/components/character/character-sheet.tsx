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
  Button,
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
import { CSSProperties, useEffect, useState } from "react"
import CharacterFooter from "./components/footer/nav"
import { useAtom } from "jotai"
import { activeTabAtom, characterAtom } from "./state"
import Grimoire from "./components/grimoire"
import Link from "next/link"

interface CharacterSheetProps {
  characterId: string
}
export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const { characters } = useCharacter()
  const [activeTab] = useAtom(activeTabAtom)
  const [character, setCharacter] = useAtom(characterAtom)

  const [selectedItem, setSelectedItem] = useState<
    (typeof equipment)[number] | null
  >(null)

  useEffect(() => {
    if (!characters?.[+characterId]) return

    setCharacter(characters[+characterId])
  }, [characters])

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
          <Group p="md" justify="space-between">
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

            {character.classes.reduce((acc, c) => acc + c.level, 0) < 20 && (
              <Link href={`./${characterId}/level-up`}>
                <Button size="xs" component="div">
                  Level Up
                </Button>
              </Link>
            )}
          </Group>
        </header>
        <main css={mainStyles}>
          {activeTab === "basic" && (
            <>
              <CharacterPortrait
                imgSrc={character.picture as string}
                name={character.name}
                label={`${races[character.race!].name}, ${character.classes
                  .map(
                    (classIndex) =>
                      `${classes[classIndex.name].name} lv${classIndex.level}`
                  )
                  .join(", ")}.`}
              />
              <Group justify="center">
                <Stack align="center" gap={0}>
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

                <Stack align="center" gap={0}>
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
                      {character.classes.reduce((acc, c) => {
                        const { average } = classes[c.name].hp
                        return (
                          acc +
                          (average - 1) * 2 +
                          getModifier(character.constitution.total) * c.level +
                          average * (c.level - 1)
                        )
                      }, 0)}
                    </Text>
                  </Box>
                  <Text size="sm" fw="bold" color="var(--do_text_color_300)">
                    HP
                  </Text>
                </Stack>
              </Group>
              <Stack gap="xs">
                {attributeOptions.map((attr) => {
                  const abilityModifier = getModifier(
                    character[attr.value].total
                  )

                  return (
                    <Group key={attr.value} justify="space-between">
                      <Text>{attr.label}</Text>
                      <Group gap="sm">
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

              <Stack gap="xs" maw={400}>
                <Text size="lg" fw="bold">
                  História do personagem
                </Text>
                <Text
                  css={css`
                    hyphens: auto;
                  `}
                >
                  {character.backstory}
                </Text>
              </Stack>
            </>
          )}

          {activeTab === "inventory" && (
            <>
              <Group>
                {items.map((item, i) => {
                  const data = equipment.find((e) => e.index === item)
                  if (!data) return

                  return (
                    <UnstyledButton
                      key={item + i}
                      w="100%"
                      onClick={handleSetSelectedItem(data)}
                    >
                      <Group>
                        <Avatar />
                        <Stack gap={0}>
                          <Text fw="bold">{data.name}</Text>
                          <Text title={data.desc.join("")} size="sm">
                            {data.desc.join("").substring(0, 35)}
                            {data.desc.join("").length > 35 && "..."}
                          </Text>
                        </Stack>
                      </Group>
                    </UnstyledButton>
                  )
                })}
              </Group>

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

                    <Stack align="center" gap="sm">
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

                      <Group justify="center">
                        {selectedItem?.damage && (
                          <Stack
                            justify="center"
                            align="center"
                            gap={0}
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
                            gap={0}
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
                            gap={0}
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
            <Stack gap="xs">
              {skills.map((attr) => {
                const isTrained = character.proficiencies.includes(attr.value)

                return (
                  <Group key={attr.value} justify="space-between">
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

          {activeTab === "magic" && <Grimoire />}
        </main>

        <CharacterFooter />
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
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-inline: 16px;
  padding-bottom: 102px;

  @media screen and (min-width: 720px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    justify-content: start;
  }
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

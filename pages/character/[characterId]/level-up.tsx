import {
  Box,
  Button,
  Select,
  Space,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core"
import classes, { type DnD5eClassName } from "@/assets/dnd/5e/classes"
import spells from "@/assets/dnd/5e/spells.json"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
  type CSSProperties,
  type PropsWithChildren,
  useState,
  useEffect,
  useMemo,
} from "react"
import { atom, useAtom } from "jotai"
import useCharacter from "@/hooks/useCharacter"
import pluralize from "@/utils/pluralize"
import { notifications } from "@mantine/notifications"
import { attributeOptions } from "@/assets/dnd/5e/abilityScores"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { SpellDetails } from "@/components/character/components/grimoire/spell-details"
import SpellList from "@/components/character/components/grimoire/spell-list"
import { characterAtom } from "@/components/character/state"
import type { DnD5eSpell } from "@/assets/dnd/5e/interfaces"
import type { Attribute } from "@/assets/dnd/5e/classes/interfaces"
import type { AddOrRemoveSpellEvent } from "@/components/character/components/grimoire/interfaces"
import { useRouter } from "next/router"

enum Steps {
  CLASS_SELECTION,
  NEW_FEATURES,
  CLOSE,
}

interface WithStylesProp {
  styles: CSSProperties
}

const selectedClassAtom = atom<DnD5eClassName | null>(null)

const StackContainer = ({
  styles,

  children,
}: WithStylesProp & PropsWithChildren) => (
  <Box style={styles}>
    <Stack
      css={css`
        overflow: auto;
        padding-bottom: 32px;
      `}
    >
      {children}
    </Stack>
  </Box>
)

const ClassSelection = ({
  styles,
  onNextStep,
}: WithStylesProp & { onNextStep: VoidFunction }) => {
  const [character] = useAtom(characterAtom)
  const [selectedClass, setSelectedClassAtom] = useAtom(selectedClassAtom)

  const checkClassRequirement = (className: DnD5eClassName): string => {
    if (!character) return "Personagem"

    const currentClasses = character.classes.map((c) => c.name)

    switch (className) {
      case "barbarian":
        return currentClasses.includes("barbarian") ||
          character.strength.base >= 13
          ? ""
          : "Força 13"
      case "bard":
        return currentClasses.includes("bard") || character.charisma.base >= 13
          ? ""
          : "Carisma 13"
      case "cleric":
        return currentClasses.includes("cleric") || character.wisdom.base >= 13
          ? ""
          : "Sabedoria 13"
      case "druid":
        return currentClasses.includes("druid") || character.wisdom.base >= 13
          ? ""
          : "Sabedoria 13"
      case "fighter":
        return currentClasses.includes("fighter") ||
          character.strength.base >= 13 ||
          character.dexterity.base >= 13
          ? ""
          : "Força ou Destreza 13"
      case "monk":
        return currentClasses.includes("monk") ||
          (character.dexterity.base >= 13 && character.wisdom.base >= 13)
          ? ""
          : "Destreza e Sabedoria 13"
      case "paladin":
        return currentClasses.includes("paladin") ||
          (character.strength.base >= 13 && character.charisma.base >= 13)
          ? ""
          : "Força e Carisma 13"
      case "ranger":
        return currentClasses.includes("ranger") ||
          (character.dexterity.base >= 13 && character.wisdom.base >= 13)
          ? ""
          : "Força e Sabedoria 13"
      case "rogue":
        return currentClasses.includes("rogue") ||
          character.dexterity.base >= 13
          ? ""
          : "Destreza 13"
      case "sorcerer":
        return currentClasses.includes("sorcerer") ||
          character.charisma.base >= 13
          ? ""
          : "Carisma 13"
      case "warlock":
        return currentClasses.includes("warlock") ||
          character.charisma.base >= 13
          ? ""
          : "Carisma 13"
      case "wizard":
        return currentClasses.includes("wizard") ||
          character.intelligence.base >= 13
          ? ""
          : "Inteligencia 13"
    }
  }

  const classesData: Array<LabelValue<DnD5eClassName> & { disabled: boolean }> =
    Object.entries(classes)
      .map(([k, v]) => {
        const requirement = checkClassRequirement(k as DnD5eClassName)
        return {
          label: `${v.name} ${
            !!requirement ? `- Requisito: ${requirement}` : ""
          }`,
          value: k as DnD5eClassName,
          disabled: !!requirement,
        }
      })
      .sort((a, b) => +a.disabled - +b.disabled)

  return (
    <>
      <StackContainer styles={styles}>
        <Select
          label="Escolha uma classe para subir de nível"
          value={selectedClass}
          data={classesData}
          nothingFoundMessage="Classe não encontrada"
          onChange={(value) => setSelectedClassAtom(value as DnD5eClassName)}
        />
      </StackContainer>

      <Button mt="auto" onClick={onNextStep}>
        Continuar
      </Button>
    </>
  )
}

interface NewSpellsSeletorProps {
  spellsKnown: number[]
  spellsSlots?: number[][]
  level: number
  className: DnD5eClassName
  characterSpells: string[]
  expandedSpellList: string[]
  isCantrip?: boolean
  handleAddOrRemoveSpell: AddOrRemoveSpellEvent
}
const NewSpellsSeletor = ({
  spellsKnown,
  spellsSlots,
  level,
  className,
  isCantrip,
  characterSpells,
  expandedSpellList,
  handleAddOrRemoveSpell,
}: NewSpellsSeletorProps) => {
  const amount =
    level > 1
      ? spellsKnown[level - 1] - spellsKnown[level - 2]
      : spellsKnown[level - 1]

  const list = useMemo(() => {
    if (!spellsKnown.length) return []

    const shouldLearnSpells =
      level > 1
        ? spellsKnown[level - 2] < spellsKnown[level - 1]
        : !!spellsKnown[level - 1]

    const spellFilter = (spell: DnD5eSpell) => {
      if (isCantrip) {
        return (
          spell.level === "cantrip" &&
          (spell.classes.includes(className) ||
            expandedSpellList.includes(spell.name))
        )
      }

      if (spellsSlots) {
        const spellSlotsList = spellsSlots[level - 1]
        const maxSpellLv = spellSlotsList ? spellSlotsList.length - 1 : 0

        return (
          +spell.level <= maxSpellLv &&
          (spell.classes.includes(className) ||
            expandedSpellList.includes(spell.name))
        )
      }

      return true
    }

    return shouldLearnSpells
      ? (spells as DnD5eSpell[])
          .filter(spellFilter)
          .map((s) => {
            s.marked = characterSpells.includes(s.name)
            return s
          })
          .sort((a, b) => +a.level - +b.level)
      : []
  }, [])

  if (!list.length) return null

  return (
    <Box>
      <Text fw="bold">
        {amount} {pluralize(isCantrip ? "Novo" : "Nova", amount)}{" "}
        {pluralize(isCantrip ? "truque" : "magia", amount)}
      </Text>
      <SpellList
        spells={list}
        onAddOrRemoveSpell={handleAddOrRemoveSpell}
        isEdit
      />
    </Box>
  )
}

interface NewFeaturesProps extends WithStylesProp {
  characterId: string | number
  currentStep: Steps
  onNextStep: VoidFunction
  onClose: VoidFunction
}
const NewFeatures = ({
  styles,
  characterId,
  currentStep,
  onNextStep,
  onClose,
}: NewFeaturesProps) => {
  const [storedCharacter, setStoredCharacter] = useAtom(characterAtom)
  const [character, setCharacter] = useState(storedCharacter)
  const [attrToImprove, setAttrToImprove] = useState<Attribute[]>([])
  const [selectedClass] = useAtom(selectedClassAtom)
  const { updateCharacter } = useCharacter()

  useEffect(() => {
    if (currentStep !== Steps.CLOSE) return

    const classToLevelUpIndex = character!.classes!.findIndex(
      (c) => c.name === selectedClass
    )
    if (classToLevelUpIndex === -1) {
      character!.classes?.push({ name: selectedClass!, level: 1 })
    } else {
      character!.classes![classToLevelUpIndex].level += 1
    }

    attrToImprove.forEach((attr) => {
      character![attr].base += 1
      character![attr].total = character![attr].base + character![attr].bonus
    })

    setStoredCharacter({ ...character! })
    updateCharacter(characterId, character as any)
    onClose()
  }, [currentStep])

  if (!(character && selectedClass)) return null

  const newLevel =
    (character!.classes.find((c) => c.name === selectedClass)?.level ?? 0) + 1

  const handleSetFeature =
    (featureName: string, index: number) => (featureValue: string) => {
      setCharacter((prev) => {
        const newVal = (prev?.features[featureName] as string[]) ?? []
        newVal[index] = featureValue
        prev!.features[featureName] = newVal

        return { ...prev! }
      })
    }

  const selectedClassData = classes[selectedClass]

  const handleAddOrRemoveSpell = (spellName: string) => {
    const hasSpell = character.spells.includes(spellName)
    setCharacter((prev) => {
      if (hasSpell) {
        prev!.spells = prev!.spells.filter((s) => s !== spellName)
      } else {
        prev!.spells.push(spellName)
      }

      prev!.spells = [...new Set(prev!.spells)]
      return { ...prev! }
    })
    notifications.show({
      title: hasSpell ? "Magia removida" : "Magia adicionada",
      message: spellName,
    })
  }

  const handleIncreaseAttr = (index: number) => (attr: Attribute) => {
    setAttrToImprove((prev) => {
      const newSet = [...prev]
      newSet[index] = attr
      return newSet
    })
  }

  return (
    <>
      <StackContainer styles={styles}>
        {[
          ...selectedClassData.features,
          ...selectedClassData.subclasses[0].features,
        ]
          .filter(
            (f) =>
              f.level === newLevel || (f.level as number[]).includes?.(newLevel)
          )
          .map((f) => (
            <Box key={f.name}>
              <Text>
                <strong>{f.name}.</strong>
              </Text>
              {Array.isArray(f.description) ? (
                <ReactMarkdown
                  css={css`
                    font-size: var(--do_text_size_sm);
                  `}
                  remarkPlugins={[remarkGfm]}
                >
                  {f.description.join("\n")}
                </ReactMarkdown>
              ) : (
                <Text size="sm">{f.description}</Text>
              )}
              <Space h="sm" />
              {f.name === "Melhoria de Atributo" && (
                <>
                  <Select
                    my="sm"
                    placeholder="Selecione um atributo"
                    data={attributeOptions}
                    onChange={handleIncreaseAttr(0)}
                  />
                  <Select
                    my="sm"
                    placeholder="Selecione um atributo"
                    data={attributeOptions}
                    onChange={handleIncreaseAttr(1)}
                  />
                </>
              )}
              {f.options &&
                Array(f.amount?.[newLevel] ?? 1)
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <Box key={`${f.name}_${i}`}>
                        <Select
                          my="sm"
                          searchable
                          placeholder="Selecione uma opção"
                          data={f.options!.filter(
                            (o) =>
                              (character.features[f.name] as string[])?.indexOf(
                                o.value
                              ) === i ||
                              !character.features[f.name]?.includes(o.value)
                          )}
                          value={character.features[f.name]?.[i]}
                          onChange={handleSetFeature(f.name, i)}
                        />
                        {f.misc && (
                          <Box>
                            {f.misc[
                              f.options?.find(
                                (o) =>
                                  character.features[f.name]?.[i] === o.value
                              )?.value ?? ""
                            ]?.map((v, i) => (
                              <Text
                                key={v}
                                size="sm"
                                fw={!i ? "bold" : "normal"}
                              >
                                {v}
                              </Text>
                            ))}
                          </Box>
                        )}
                      </Box>
                    )
                  })}
            </Box>
          ))}

        {selectedClassData.cantripKnown &&
          selectedClassData.cantripKnown[newLevel - 2] !==
            selectedClassData.cantripKnown[newLevel - 1] && (
            <Text>
              Agora você possui {selectedClassData.cantripKnown[newLevel]}{" "}
              truques
            </Text>
          )}
        <NewSpellsSeletor
          isCantrip
          spellsKnown={
            Array.isArray(selectedClassData.cantripKnown)
              ? selectedClassData.cantripKnown
              : []
          }
          level={newLevel}
          className={selectedClass}
          characterSpells={character.spells}
          expandedSpellList={
            selectedClassData.subclasses[0].expandedSpellList ?? []
          }
          handleAddOrRemoveSpell={handleAddOrRemoveSpell}
        />

        {newLevel < 20 &&
          selectedClassData.spellsSlots &&
          selectedClassData.spellsSlots[newLevel - 2].join() !==
            selectedClassData.spellsSlots[newLevel - 1].join() && (
            <Text>
              Agora você possui espaços de magia{" "}
              {selectedClassData.spellsSlots[newLevel - 1].reduce(
                (acc, s, i) => {
                  if (s === Infinity) return acc

                  const newSlot =
                    selectedClassData.spellsSlots![newLevel - 2][i] !== s

                  if (!newSlot) return acc

                  return !acc
                    ? `nível ${i} (${s}x)`
                    : `${acc}, nível ${i} (${s}x)`
                },
                ""
              )}
              .
            </Text>
          )}
        <NewSpellsSeletor
          spellsKnown={
            Array.isArray(selectedClassData.spellsKnown)
              ? selectedClassData.spellsKnown
              : []
          }
          spellsSlots={
            Array.isArray(selectedClassData.spellsSlots)
              ? selectedClassData.spellsSlots
              : []
          }
          level={newLevel}
          className={selectedClass}
          characterSpells={character.spells}
          expandedSpellList={
            selectedClassData.subclasses[0].expandedSpellList ?? []
          }
          handleAddOrRemoveSpell={handleAddOrRemoveSpell}
        />
      </StackContainer>

      <Button mt="auto" onClick={onNextStep}>
        Continuar
      </Button>
    </>
  )
}

export default function LevelUp() {
  const [currentStep, setCurrentStep] = useState(Steps.CLASS_SELECTION)
  const [character] = useAtom(characterAtom)
  const [selectedClass, setSelectedClass] = useAtom(selectedClassAtom)
  const router = useRouter()
  const characterId = +router.query.characterId!

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleClose = () => {
    setCurrentStep(Steps.CLASS_SELECTION)
    router.push(`/character/${characterId}`)
  }

  useEffect(() => {
    if (!character) return

    setSelectedClass(character.classes[0].name)
  }, [])

  const level = character?.classes.find((c) => c.name === selectedClass)?.level

  return (
    <>
      <SpellDetails verticalOffset={0} h="95%" />

      <Stack p="sm">
        <Title>
          {selectedClass && level ? `Nível ${level + 1}` : "Novo nível"}
        </Title>
        <Transition
          transition="fade"
          mounted={currentStep === Steps.CLASS_SELECTION}
        >
          {(styles) => (
            <ClassSelection styles={styles} onNextStep={handleNextStep} />
          )}
        </Transition>

        <Transition
          transition="fade"
          mounted={currentStep === Steps.NEW_FEATURES}
        >
          {(styles) => (
            <NewFeatures
              styles={styles}
              characterId={characterId}
              currentStep={currentStep}
              onNextStep={handleNextStep}
              onClose={handleClose}
            />
          )}
        </Transition>
      </Stack>
    </>
  )
}

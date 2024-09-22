'use client'

import {
    Box,
    Button,
    Loader,
    Select,
    Space,
    Stack,
    Text,
    Title,
    Transition,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import {
    type CSSProperties,
    type PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { attributeOptions } from '@/assets/dnd/5e/abilityScores'
import classes, { type DnD5eClassName } from '@/assets/dnd/5e/classes'
import type {
    Attribute,
    DnD5eClass,
    DnD5eFeature,
} from '@/assets/dnd/5e/classes/interfaces'
import type { DnD5eSpell } from '@/assets/dnd/5e/interfaces'
import spells from '@/assets/dnd/5e/spells.json'
import {
    useCharacterAttributes,
    useCharacterClasses,
    useUnsafeCharacterSheet,
} from '@/assets/dnd/5e/utils/CharacterSheet'
import { useCharacterSheetActions } from '@/assets/dnd/5e/utils/CharacterSheet'
import type { AddOrRemoveSpellEvent } from '@/components/character/components/grimoire/interfaces'
import { SpellDetails } from '@/components/character/components/grimoire/spell-details'
import SpellList from '@/components/character/components/grimoire/spell-list'
import useCharacter from '@/hooks/useCharacter'
import { api } from '@/utils/api'
import pluralize from '@/utils/pluralize'

enum Steps {
    CLASS_SELECTION,
    NEW_FEATURES,
    CLOSE,
    SAVE,
}

interface WithStylesProp {
    styles: CSSProperties
}

const selectedClassAtom = atom<string | null>(null)

interface LevelUpProps {
    characterId: string
}
export default function LevelUp({ characterId }: LevelUpProps) {
    const [currentStep, setCurrentStep] = useState(Steps.CLASS_SELECTION)
    const [selectedClass, setSelectedClass] = useAtom(selectedClassAtom)
    const classes = useCharacterClasses()
    const router = useRouter()
    const { updateCharacter } = useCharacter()
    const { getMutationPayload } = useCharacterSheetActions()

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1)
    }

    useEffect(() => {
        const selected = classes[0]?.id ?? classes[0]?.data.name
        setSelectedClass(selected)
    }, [])

    const level = classes.find((c) =>
        [c.data.name, c.id].includes(selectedClass!)
    )?.level

    useEffect(() => {
        if (currentStep !== Steps.SAVE) return

        const payload = getMutationPayload()
        updateCharacter(payload.id, payload)

        setTimeout(() => router.push('/character/' + characterId), 2000)
    }, [currentStep])

    if (currentStep === Steps.SAVE) return <Loader color="white" />

    return (
        <>
            <SpellDetails verticalOffset={0} h="95%" />

            <Stack className="mx-auto max-w-[550px]" p="sm">
                <Title>
                    {selectedClass && level
                        ? `Nível ${level + 1}`
                        : 'Novo nível'}
                </Title>
                <Transition
                    transition="fade"
                    mounted={currentStep === Steps.CLASS_SELECTION}
                >
                    {(styles) => (
                        <ClassSelection
                            styles={styles}
                            onNextStep={handleNextStep}
                        />
                    )}
                </Transition>

                <Transition
                    transition="fade"
                    mounted={currentStep === Steps.NEW_FEATURES}
                >
                    {(styles) => (
                        <NewFeatures
                            styles={styles}
                            currentStep={currentStep}
                            onNextStep={handleNextStep}
                        />
                    )}
                </Transition>
            </Stack>
        </>
    )
}

const StackContainer = ({
    styles,
    children,
}: WithStylesProp & PropsWithChildren) => (
    <Box style={styles}>
        <Stack className="overflow-auto pb-8">{children}</Stack>
    </Box>
)

const ClassSelection = ({
    styles,
    onNextStep,
}: WithStylesProp & { onNextStep: VoidFunction }) => {
    const characterClasses = useCharacterClasses()
    const attrs = useCharacterAttributes()
    const [selectedClass, setSelectedClassAtom] = useAtom(selectedClassAtom)

    const { data: customClasses, isLoading } =
        api.srdCustoms.getAllAuthorClasses.useQuery()

    const checkClassRequirement = (className: DnD5eClassName): string => {
        const currentClasses = characterClasses.map((c) => c.data.name)

        switch (className) {
            case 'barbarian':
                return currentClasses.includes('barbarian') ||
                    attrs.strength >= 13
                    ? ''
                    : 'Força 13'
            case 'bard':
                return currentClasses.includes('bard') || attrs.charisma >= 13
                    ? ''
                    : 'Carisma 13'
            case 'cleric':
                return currentClasses.includes('cleric') || attrs.wisdom >= 13
                    ? ''
                    : 'Sabedoria 13'
            case 'druid':
                return currentClasses.includes('druid') || attrs.wisdom >= 13
                    ? ''
                    : 'Sabedoria 13'
            case 'fighter':
                return currentClasses.includes('fighter') ||
                    attrs.strength >= 13 ||
                    attrs.dexterity >= 13
                    ? ''
                    : 'Força ou Destreza 13'
            case 'monk':
                return currentClasses.includes('monk') ||
                    (attrs.dexterity >= 13 && attrs.wisdom >= 13)
                    ? ''
                    : 'Destreza e Sabedoria 13'
            case 'paladin':
                return currentClasses.includes('paladin') ||
                    (attrs.strength >= 13 && attrs.charisma >= 13)
                    ? ''
                    : 'Força e Carisma 13'
            case 'ranger':
                return currentClasses.includes('ranger') ||
                    (attrs.dexterity >= 13 && attrs.wisdom >= 13)
                    ? ''
                    : 'Força e Sabedoria 13'
            case 'rogue':
                return currentClasses.includes('rogue') || attrs.dexterity >= 13
                    ? ''
                    : 'Destreza 13'
            case 'sorcerer':
                return currentClasses.includes('sorcerer') ||
                    attrs.charisma >= 13
                    ? ''
                    : 'Carisma 13'
            case 'warlock':
                return currentClasses.includes('warlock') ||
                    attrs.charisma >= 13
                    ? ''
                    : 'Carisma 13'
            case 'wizard':
                return currentClasses.includes('wizard') ||
                    attrs.intelligence >= 13
                    ? ''
                    : 'Inteligencia 13'
            default:
                return ''
        }
    }

    const normalizedCustomClasses =
        customClasses?.map((c) => ({
            label: c.name,
            value: c.id,
            disabled: false,
        })) ?? []

    const classesData: Array<LabelValue<string> & { disabled: boolean }> = [
        ...Object.entries(classes).map(([k, v]) => {
            const requirement = checkClassRequirement(k as DnD5eClassName)
            return {
                label: `${v.name} ${
                    !!requirement ? `- Requisito: ${requirement}` : ''
                }`,
                value: k,
                disabled: !!requirement,
            }
        }),
        ...normalizedCustomClasses,
    ].sort((a, b) => +a.disabled - +b.disabled)

    return (
        <>
            <StackContainer styles={styles}>
                <Select
                    leftSection={
                        isLoading ? (
                            <Loader size="sm" color="white" type="dots" />
                        ) : null
                    }
                    disabled={isLoading}
                    searchable
                    label="Escolha uma classe para subir de nível"
                    value={selectedClass}
                    data={classesData}
                    nothingFoundMessage="Classe não encontrada"
                    onChange={(value) =>
                        setSelectedClassAtom(value as DnD5eClassName)
                    }
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
    className: string
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
                    spell.level === 'cantrip' &&
                    (spell.classes.includes(className) ||
                        expandedSpellList.includes(spell.name))
                )
            }

            if (spellsSlots) {
                const spellSlotsList = spellsSlots[level - 1]
                const maxSpellLv = spellSlotsList
                    ? spellSlotsList.length - 1
                    : 0

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
                {amount} {pluralize(isCantrip ? 'Novo' : 'Nova', amount)}{' '}
                {pluralize(isCantrip ? 'truque' : 'magia', amount)}
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
    currentStep: Steps
    onNextStep: VoidFunction
}
const NewFeatures = ({ styles, currentStep, onNextStep }: NewFeaturesProps) => {
    const sheet = useUnsafeCharacterSheet()
    const { setCharacterSheet } = useCharacterSheetActions()
    const [sheetPreview, setSheetPreview] = useState(sheet)
    const [attrToImprove, setAttrToImprove] = useState<Attribute[]>([])
    const [selectedClass] = useAtom(selectedClassAtom)

    const isSrd = selectedClass! in classes
    const { data: customClass, isLoading } = api.srdCustoms.getClass.useQuery(
        selectedClass ?? '',
        { enabled: !isSrd }
    )

    useEffect(() => {
        if (currentStep !== Steps.CLOSE) return

        const classToLevelUpIndex = sheetPreview.classes.findIndex(
            (c) => c.data.name === selectedClassData.name
        )
        if (classToLevelUpIndex === -1) {
            const {
                id,
                hp,
                authorId,
                proficiencies_armor,
                proficiencies_weapon,
                proficiencies_savingThrows,
                proficiencies_skills,
                proficiencies_skillAmount,
                ...rest
            } =
                'id' in selectedClassData
                    ? selectedClassData
                    : {
                          id: undefined,
                          authorId: undefined,
                          hp: selectedClassData.hp.dice,
                          proficiencies_armor:
                              selectedClassData.proficiencies.armor ?? [],
                          proficiencies_weapon:
                              selectedClassData.proficiencies.weapon,
                          proficiencies_savingThrows:
                              selectedClassData.proficiencies.savingThrows,
                          proficiencies_skills:
                              selectedClassData.proficiencies.skills.options.map(
                                  (s) => s.value
                              ),
                          proficiencies_skillAmount:
                              selectedClassData.proficiencies.skills.amount,
                      }
            sheetPreview.classes.push({
                id,
                data: {
                    public: false,
                    cantripKnown: [],
                    spellsKnown: [],
                    spellsSlots: [],
                    ...(rest as any),
                    hp: +hp.replace('d', ''),
                    proficiencies: {
                        armor: proficiencies_armor as string[],
                        weapon: proficiencies_weapon as string[],
                        savingThrows: proficiencies_savingThrows as string[],
                        skills: proficiencies_skills as string[],
                        skillAmount: proficiencies_skillAmount,
                        tools:
                            'proficiencies' in rest
                                ? (
                                      rest.proficiencies as DnD5eClass['proficiencies']
                                  ).tools ?? []
                                : [],
                    },
                },
                level: 1,
            })
        } else {
            sheetPreview!.classes![classToLevelUpIndex].level += 1
            /** @todo Alterar vida máxima */
        }

        attrToImprove.forEach((attr) => {
            sheetPreview[attr] += 1
        })

        sheetPreview.hasChanges = true
        setCharacterSheet({ ...sheetPreview })
        onNextStep()
    }, [currentStep])

    if (!(sheetPreview && selectedClass)) return null

    const newLevel =
        (sheetPreview!.classes.find((c) =>
            [c.data.name, c.id].includes(selectedClass)
        )?.level ?? 0) + 1

    const handleSetFeature =
        (featureName: string, index: number) =>
        (featureValue: string | null) => {
            const newVal =
                (sheetPreview!.features[featureName] as string[]) ?? []
            newVal[index] = featureValue as string
            sheetPreview!.features[featureName] = newVal
            setSheetPreview({
                ...sheetPreview,
                classes: sheetPreview.classes,
            })
        }

    const selectedClassData =
        (selectedClass in classes
            ? classes[selectedClass as DnD5eClassName]
            : customClass) ?? ({} as DnD5eClass)

    const handleAddOrRemoveSpell = (spellName: string) => {
        const hasSpell = sheetPreview.spells.includes(spellName)
        if (hasSpell) {
            sheetPreview!.spells = sheetPreview!.spells.filter(
                (s) => s !== spellName
            )
        } else {
            sheetPreview!.spells.push(spellName)
        }

        sheetPreview!.spells = [...new Set(sheetPreview!.spells)]
        setSheetPreview({
            ...sheetPreview,
            classes: sheetPreview.classes,
        })
        notifications.show({
            title: hasSpell ? 'Magia removida' : 'Magia adicionada',
            message: spellName,
        })
    }

    const handleIncreaseAttr = (index: number) => (attr: string | null) => {
        setAttrToImprove((prev) => {
            const newSet = [...prev]
            newSet[index] = attr as Attribute
            return newSet
        })
    }

    if (!isSrd && isLoading) return <Loader color="white" />

    return (
        <>
            <StackContainer styles={styles}>
                {[
                    ...(selectedClassData.features as DnD5eFeature[]),
                    ...('subclasses' in selectedClassData
                        ? selectedClassData.subclasses[0].features
                        : []),
                ]
                    .filter(
                        (f) =>
                            f.level === newLevel ||
                            (f.level as number[]).includes?.(newLevel)
                    )
                    .map((f) => (
                        <Box key={f.name}>
                            <Text>
                                <strong>{f.name}.</strong>
                            </Text>

                            <ReactMarkdown
                                className="text-sm"
                                remarkPlugins={[remarkGfm]}
                            >
                                {Array.isArray(f.description)
                                    ? f.description.join('\n')
                                    : f.description}
                            </ReactMarkdown>

                            <Space h="sm" />
                            {[
                                'Melhoria de Atributo',
                                'Ability Score Improvement',
                            ].includes(f.name) && (
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
                            {/** @todo trocar por Radio.Card */}
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
                                                    description={
                                                        f.options?.find(
                                                            (o) =>
                                                                sheetPreview
                                                                    .features[
                                                                    f.name
                                                                ][i] === o.value
                                                        )?.description
                                                    }
                                                    data={f.options!.filter(
                                                        (o) =>
                                                            (
                                                                sheetPreview
                                                                    .features[
                                                                    f.name
                                                                ] as string[]
                                                            )?.indexOf(
                                                                o.value
                                                            ) === i ||
                                                            !sheetPreview.features[
                                                                f.name
                                                            ]?.includes(o.value)
                                                    )}
                                                    value={
                                                        sheetPreview.features[
                                                            f.name
                                                        ]?.[i]
                                                    }
                                                    onChange={handleSetFeature(
                                                        f.name,
                                                        i
                                                    )}
                                                />
                                            </Box>
                                        )
                                    })}
                        </Box>
                    ))}

                {'cantripKnown' in selectedClassData && (
                    <>
                        {selectedClassData.cantripKnown &&
                            selectedClassData.cantripKnown[newLevel - 2] !==
                                selectedClassData.cantripKnown[
                                    newLevel - 1
                                ] && (
                                <Text>
                                    Agora você possui{' '}
                                    {selectedClassData.cantripKnown[newLevel]}{' '}
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
                            characterSpells={sheetPreview.spells}
                            expandedSpellList={
                                selectedClassData.subclasses?.[0]
                                    .expandedSpellList ?? []
                            }
                            handleAddOrRemoveSpell={handleAddOrRemoveSpell}
                        />
                        {newLevel < 20 &&
                            selectedClassData.spellsSlots &&
                            selectedClassData.spellsSlots[
                                newLevel - 2
                            ].join() !==
                                selectedClassData.spellsSlots[
                                    newLevel - 1
                                ].join() && (
                                <Text>
                                    Agora você possui espaços de magia{' '}
                                    {selectedClassData.spellsSlots[
                                        newLevel - 1
                                    ].reduce((acc, s, i) => {
                                        if (s === Infinity) return acc

                                        const newSlot =
                                            selectedClassData.spellsSlots![
                                                newLevel - 2
                                            ][i] !== s

                                        if (!newSlot) return acc

                                        return !acc
                                            ? `nível ${i} (${s}x)`
                                            : `${acc}, nível ${i} (${s}x)`
                                    }, '')}
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
                            characterSpells={sheetPreview.spells}
                            expandedSpellList={
                                selectedClassData.subclasses?.[0]
                                    .expandedSpellList ?? []
                            }
                            handleAddOrRemoveSpell={handleAddOrRemoveSpell}
                        />{' '}
                    </>
                )}
            </StackContainer>

            <Button mt="auto" onClick={onNextStep}>
                Continuar
            </Button>
        </>
    )
}

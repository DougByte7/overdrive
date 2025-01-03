'use client'

import {
    Accordion,
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Center,
    Checkbox,
    type ComboboxItem,
    type ComboboxItemGroup,
    Divider,
    Drawer,
    Group,
    List,
    LoadingOverlay,
    NumberInput,
    Space,
    Spoiler,
    Stack,
    Switch,
    Tabs,
    Text,
    TextInput,
    Transition,
    UnstyledButton,
} from '@mantine/core'
import {
    useDebouncedCallback,
    useDebouncedValue,
    useDisclosure,
    useViewportSize,
} from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import {
    IconChevronLeft,
    IconHeartFilled,
    IconInfoCircle,
    IconPlus,
    IconSearch,
    IconShieldFilled,
    IconTrash,
} from '@tabler/icons-react'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { InferInput } from 'valibot'

import classes, { type DnD5eClassName } from '@/assets/dnd/5e/classes'
import type {
    Attribute,
    DiceNotation,
    Skill,
} from '@/assets/dnd/5e/classes/interfaces'
import equipment from '@/assets/dnd/5e/equipment.json'
import type { DnD5eEquipment } from '@/assets/dnd/5e/interfaces'
import races, {
    type DnD5eRaceName,
    type DnD5eTrait,
} from '@/assets/dnd/5e/races'
import { ClassSchema } from '@/assets/dnd/5e/schemas/classes'
import {
    useCharacterArmorClass,
    useCharacterAttributes,
    useCharacterBackstory,
    useCharacterClasses,
    useCharacterCurrentHP,
    useCharacterDexterity,
    useCharacterFeatures,
    useCharacterHP,
    useCharacterHasSpellSlots,
    useCharacterInitiative,
    useCharacterItems,
    useCharacterLevel,
    useCharacterName,
    useCharacterPicture,
    useCharacterRace,
    useCharacterSheetActions,
    useCharacterSheetHasChanges,
    useCharacterSkills,
    useCharacterStrength,
    useCharacterTempHP,
    useCharacterTraits,
} from '@/assets/dnd/5e/utils/CharacterSheet'
import getModifier from '@/assets/dnd/5e/utils/getModifier'
import getProficiencyBonus from '@/assets/dnd/5e/utils/getProficiencyBonus'
import CharacterFooter from '@/components/character/components/footer/character-footer'
import Grimoire from '@/components/character/components/grimoire'
import { activeTabAtom } from '@/components/character/state'
import DiceTray from '@/components/dice-tray'
import {
    useDiceTrayActions,
    useDiceTrayResults,
} from '@/components/dice-tray/state'
import ToggleTip from '@/components/shared/toggle-tip'
import TopBar from '@/components/top-bar'
import useCharacter from '@/hooks/useCharacter'
import { api } from '@/utils/api'
import breakpoints from '@/utils/breakpoints'
import { removeDiacritics } from '@/utils/removeDiacritics'

interface CharacterSheetPageProps {
    characterId: string
}
export default function CharacterSheetPage({
    characterId,
}: CharacterSheetPageProps) {
    const [loading, { close: setLoadingComplete }] = useDisclosure(true)
    const { getCharacter } = useCharacter()
    const [activeTab] = useAtom(activeTabAtom)
    const { width } = useViewportSize()
    const isMobile = width < breakpoints.md

    const { setCharacterSheet } = useCharacterSheetActions()
    const hasSpellSlots = useCharacterHasSpellSlots()

    const localCharacter = getCharacter(characterId)
    const isCustomRace = !((localCharacter?.race ?? '') in races)
    const { data: customRace } = api.srdCustoms.getRace.useQuery(
        localCharacter?.race ?? '',
        {
            enabled: isCustomRace,
        }
    )
    const customClassesId = localCharacter?.classes
        .filter((c) => !(c.name in classes))
        .map((c) => c.name)
    const hasCustomClass = !!customClassesId?.length
    const { data: customClasses } = api.srdCustoms.getClasses.useQuery(
        customClassesId ?? [],
        {
            enabled: hasCustomClass,
        }
    )

    // Initialize characterSheetStore
    useEffect(() => {
        if (
            !localCharacter ||
            (isCustomRace && !customRace) ||
            (hasCustomClass && !customClasses)
        )
            return

        const {
            proficiencies,
            race,
            classes: classList,
            ...sheet
        } = localCharacter

        const normalizedClasses = classList.map((c) => {
            if (c.name in classes) {
                const {
                    key,
                    subclasses,
                    proficiencies,
                    hp,
                    cantripKnown,
                    spellsKnown,
                    spellsSlots,
                    ...rest
                } = classes[c.name as DnD5eClassName]
                const normalizedClass: InferInput<typeof ClassSchema> = {
                    ...rest,
                    hp: hp.dice,
                    public: true,
                    proficiencies: {
                        armor: proficiencies.armor ?? [],
                        savingThrows: proficiencies.savingThrows,
                        skillAmount: proficiencies.skills.amount,
                        skills: proficiencies.skills.options.map(
                            (o) => o.value
                        ),
                        tools: proficiencies.tools ?? [],
                        weapon: proficiencies.weapon,
                    },
                    features: [
                        ...rest.features,
                        ...subclasses[0].features,
                    ] as any,
                    cantripKnown: cantripKnown as unknown as number[],
                    spellsKnown:
                        typeof spellsKnown === 'number'
                            ? [spellsKnown]
                            : (spellsKnown as unknown as number[]),
                    spellsSlots: spellsSlots as unknown as number[][],
                }

                return {
                    data: normalizedClass as InferInput<typeof ClassSchema>,
                    level: c.level,
                }
            }

            const {
                id,
                authorId,
                public: _,
                proficiencies_armor,
                proficiencies_savingThrows,
                proficiencies_skillAmount,
                proficiencies_skills,
                proficiencies_weapon,
                ...normalizedClass
            } = customClasses?.find((custom) => custom.id === c.name)!
            return {
                id,
                data: {
                    ...normalizedClass,
                    proficiencies: {
                        skills: proficiencies_skills,
                        armor: proficiencies_armor,
                        weapon: proficiencies_weapon,
                        savingThrows: proficiencies_savingThrows,
                        skillAmount: proficiencies_skillAmount,
                        tools: [],
                    },
                } as unknown as InferInput<typeof ClassSchema>,
                level: c.level,
            }
        })

        setLoadingComplete()
        setCharacterSheet({
            ...sheet,
            hasChanges: false,
            skills: proficiencies,
            race: isCustomRace
                ? {
                      id: race,
                      name: customRace!.name,
                      description: customRace!.description,
                      traits: customRace!.traits as unknown as DnD5eTrait[],
                  }
                : races[race as DnD5eRaceName],
            classes: normalizedClasses,
        })
    }, [customRace, localCharacter, customClasses])

    if (loading)
        return <LoadingOverlay visible loaderProps={{ type: 'bars' }} />

    return (
        <>
            <DiceTray />
            <DiceResultsNotification />
            <AutoSaveCharacter />
            <TopBar title="Personagem" />

            <main className="flex w-full flex-wrap justify-center gap-4 pb-24">
                {activeTab === 'basic' && <Basic />}

                {!isMobile && <Divider orientation="vertical" size="sm" />}
                {(activeTab === 'skills' || !isMobile) && <Skills />}

                {!!hasSpellSlots && (
                    <>
                        {!isMobile && (
                            <Divider orientation="vertical" size="sm" />
                        )}
                        {(activeTab === 'magic' || !isMobile) && <Grimoire />}
                    </>
                )}

                {!isMobile && <Divider orientation="vertical" size="sm" />}
                {(activeTab === 'inventory' || !isMobile) && <Inventory />}

                {!hasSpellSlots && (
                    <>
                        {!isMobile && (
                            <Divider orientation="vertical" size="sm" />
                        )}
                        {(activeTab === 'magic' || !isMobile) && <Grimoire />}
                    </>
                )}
            </main>

            {isMobile && <CharacterFooter />}
        </>
    )
}

function AutoSaveCharacter() {
    const { getMutationPayload, setHasChanges } = useCharacterSheetActions()
    const { updateCharacter } = useCharacter()
    const hasChanges = useCharacterSheetHasChanges()

    const save = useDebouncedCallback(() => {
        const payload = getMutationPayload()

        setHasChanges(false)
        updateCharacter(payload.id, payload)

        return
    }, 1000)

    if (!hasChanges) return <></>

    save()

    return (
        <Text
            className="fixed top-0 w-full bg-yellow-800 h-5 text-white text-center z-10"
            size="sm"
        >
            Salvando...
        </Text>
    )
}

function DiceResultsNotification() {
    const results = useDiceTrayResults()
    const { shiftResult } = useDiceTrayActions()

    results.forEach(({ roll, modifiers, label }) => {
        const total =
            roll + (modifiers?.reduce((acc, mod) => acc + mod, 0) ?? 0)
        notifications.show({
            title: label ?? 'Resultado',
            message: (
                <Group>{`${roll} ${modifiers ? `+ ${modifiers.join(' + ')}` : ''} = ${total}`}</Group>
            ),
            icon: (
                <Text className="text-2xl p-2 font-germaniaOne rounded bg-brand-700">
                    {total}
                </Text>
            ),
            autoClose: 10_000,
        })
    })

    shiftResult(results.length)

    return <></>
}

function LevelUpButton() {
    const level = useCharacterLevel()

    const characterId = location.pathname.split('/').at(-1)

    return level < 20 ? (
        <Link href={`./${characterId}/level-up`}>
            <Button size="xs" component="div">
                Level Up
            </Button>
        </Link>
    ) : null
}

function Basic() {
    const name = useCharacterName()
    const characterRace = useCharacterRace()
    const characterClasses = useCharacterClasses()

    return (
        <Tabs
            className="min-w-[350px] grow max-w-[450px] p-4 md:pr-0"
            defaultValue="info"
        >
            <Tabs.List>
                <Tabs.Tab value="info">Info</Tabs.Tab>
                <Tabs.Tab value="traits">Raça</Tabs.Tab>
                <Tabs.Tab value="features">Classes</Tabs.Tab>
                <Tabs.Tab value="backstory">História</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="info">
                <Space h="md" />
                <Group justify="space-between">
                    <div>
                        <Text size="xl" fw="bold">
                            {name}
                        </Text>

                        <Text size="sm" c="var(--do_text_color_300)">
                            {`${characterRace.name}, ${characterClasses
                                .map(
                                    (classData) =>
                                        `${classData.data.name} lv${classData.level}`
                                )
                                .join(', ')}.`}
                        </Text>
                    </div>
                    <LevelUpButton />
                </Group>

                <Space h="md" />
                <Group justify="center">
                    <InitiativeInput />
                    <ArmorClass />
                    <HpInput />
                    <TempHpInput />
                </Group>
                <Space h="xl" />
                <Attributes />
            </Tabs.Panel>

            <Tabs.Panel value="traits">
                <Traits />
            </Tabs.Panel>

            <Tabs.Panel value="features">
                <Features />
            </Tabs.Panel>
            <Tabs.Panel value="backstory">
                <CharacterPortrait />
                <Backstory />
            </Tabs.Panel>
        </Tabs>
    )
}

function Traits() {
    const race = useCharacterRace()
    const traits = useCharacterTraits()

    return (
        <Stack mt="md">
            {race.traits.map((trait) => {
                return (
                    <Stack
                        key={trait.name}
                        className="rounded border border-brand-200 border-opacity-20 p-2"
                        gap={0}
                    >
                        <Text fw="bold">{trait.name}</Text>
                        {traits[trait.name] && (
                            <Badge>
                                {
                                    (
                                        trait.options as Array<
                                            | ComboboxItem
                                            | ComboboxItemGroup<ComboboxItem>
                                        >
                                    )?.reduce((acc, o) => {
                                        if ('group' in o) {
                                            acc =
                                                o.items.find(
                                                    (i) =>
                                                        i.value ===
                                                        traits[trait.name]
                                                )?.label ?? acc
                                        } else if (
                                            o.value === traits[trait.name]
                                        ) {
                                            acc = o.label
                                        }

                                        return acc
                                    }, '') as string
                                }
                            </Badge>
                        )}
                        <Spoiler
                            maxHeight={120}
                            showLabel="Ver mais"
                            hideLabel="Ver menos"
                        >
                            <ReactMarkdown
                                className="text-sm"
                                remarkPlugins={[remarkGfm]}
                            >
                                {Array.isArray(trait.description)
                                    ? trait.description.join('\n')
                                    : trait.description}
                            </ReactMarkdown>
                        </Spoiler>
                    </Stack>
                )
            })}
        </Stack>
    )
}

function Features() {
    const classes = useCharacterClasses()
    const features = useCharacterFeatures()

    return (
        <Stack mt="md">
            {classes.map(({ data, level }) => {
                return (
                    <Stack key={data.name}>
                        <Text fw="bold">{data.name}</Text>
                        {data.features
                            .filter((f) =>
                                Array.isArray(f.level)
                                    ? f.level.some((lv) => lv <= level)
                                    : f.level <= level
                            )
                            .map((feature) => {
                                return (
                                    <Stack
                                        key={feature.name}
                                        className="rounded border border-brand-200 border-opacity-20 p-2"
                                        gap="xs"
                                    >
                                        <Group justify="space-between">
                                            <Text fw="bold">
                                                {feature.name}
                                            </Text>
                                            <Badge
                                                leftSection="lv"
                                                color="dark"
                                            >
                                                {Array.isArray(feature.level)
                                                    ? feature.level.join(', ')
                                                    : feature.level}
                                            </Badge>
                                        </Group>
                                        {features[feature.name] && (
                                            <>
                                                {/**
                                                 * @todo Support homebrew options like ranger
                                                 */}
                                                {feature.options
                                                    ?.filter((o) =>
                                                        features[
                                                            feature.name
                                                        ].includes(o.value)
                                                    )
                                                    .map((o) => (
                                                        <Fragment key={o.value}>
                                                            <Text className="text-sm font-bold">
                                                                {o.label}
                                                            </Text>
                                                            <Text>
                                                                {o.description}
                                                            </Text>
                                                        </Fragment>
                                                    ))}
                                                <Space h="md" />
                                            </>
                                        )}

                                        <Spoiler
                                            maxHeight={120}
                                            showLabel="Ver mais"
                                            hideLabel="Ver menos"
                                        >
                                            <ReactMarkdown
                                                className="text-sm [&_code]:text-wrap"
                                                remarkPlugins={[remarkGfm]}
                                            >
                                                {Array.isArray(
                                                    feature.description
                                                )
                                                    ? feature.description.join(
                                                          '\n'
                                                      )
                                                    : feature.description}
                                            </ReactMarkdown>
                                        </Spoiler>

                                        <List>
                                            {feature.rules?.map((rule) => (
                                                <List.Item key={rule.action}>
                                                    <Switch
                                                        label={rule.action}
                                                        defaultChecked={
                                                            rule.isActive
                                                        }
                                                    />
                                                </List.Item>
                                            ))}
                                        </List>
                                    </Stack>
                                )
                            })}
                    </Stack>
                )
            })}
        </Stack>
    )
}

function CharacterPortrait() {
    const picture = useCharacterPicture()

    return (
        <picture className="self-center rounded-lg">
            <Image
                src={picture}
                width={343}
                height={431}
                alt="Retrato do personagem"
            />
        </picture>
    )
}

function InitiativeInput() {
    const { setCharacterInitiative } = useCharacterSheetActions()
    const initiative = useCharacterInitiative()
    const dexterity = useCharacterDexterity()
    const handleChangeInitiative = (value: string | number) => {
        setCharacterInitiative(+value)
    }

    return (
        <Stack align="center" gap={0}>
            <NumberInput
                id="initiative-input"
                className="pt-3 size-16 text-center font-bold"
                styles={{ input: { textAlign: 'center', fontSize: '1.5rem' } }}
                hideControls
                variant="unstyled"
                min={-100}
                value={initiative ?? getModifier(dexterity)}
                max={100}
                onChange={handleChangeInitiative}
            />

            <Text
                component="label"
                htmlFor="initiative-input"
                className="text-sm font-bold text-[var(--do\_text\_color\_300)]"
            >
                Iniciativa
            </Text>
        </Stack>
    )
}

function ArmorClass() {
    const armorClass = useCharacterArmorClass()

    return (
        <Stack align="center" gap={0}>
            <Box pos="relative" h={64}>
                <IconShieldFilled className="text-[#a5a5a5]" size={64} />
                <Text
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 text-lg text-white"
                    fw="bold"
                >
                    {armorClass}
                </Text>
            </Box>
            <Text className="text-sm font-bold text-[var(--do\_text\_color\_300)]">
                CA
            </Text>
        </Stack>
    )
}

function HpInput() {
    const { setCharacterCurrentHP } = useCharacterSheetActions()
    const maxHp = useCharacterHP()
    const currentHp = useCharacterCurrentHP()

    const handleChangeCurrentHp = (value: string | number) => {
        setCharacterCurrentHP(+value)
    }

    return (
        <Stack align="center" gap={0}>
            <Box pos="relative" h={64}>
                <IconHeartFilled className="text-[#fb3642]" size={64} />
                <NumberInput
                    id="hp-input"
                    className="absolute top-1 left-1/2 -translate-x-1/2 text-lg "
                    hideControls
                    styles={{
                        input: {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'white',
                        },
                    }}
                    variant="unstyled"
                    min={-maxHp}
                    value={currentHp ?? maxHp}
                    max={maxHp}
                    size="lg"
                    onChange={handleChangeCurrentHp}
                />
            </Box>
            <Text
                component="label"
                htmlFor="hp-input"
                className="text-sm font-bold text-[var(--do\_text\_color\_300)]"
            >
                HP
            </Text>
        </Stack>
    )
}

function TempHpInput() {
    const { setCharacterTempHP } = useCharacterSheetActions()
    const tempHp = useCharacterTempHP()

    const handleChangeTempHp = (value: string | number) => {
        setCharacterTempHP(+value)
    }
    return (
        <Stack align="center" gap={0}>
            <Box pos="relative" h={64}>
                <IconHeartFilled className="text-[#69cc60]" size={64} />
                <NumberInput
                    id="thp-input"
                    className="absolute top-1 left-1/2 -translate-x-1/2 text-lg"
                    hideControls
                    styles={{
                        input: {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'white',
                        },
                    }}
                    variant="unstyled"
                    min={0}
                    value={tempHp ?? 0}
                    size="lg"
                    onChange={handleChangeTempHp}
                />
            </Box>
            <Text
                component="label"
                htmlFor="thp-input"
                className="text-sm font-bold text-[var(--do\_text\_color\_300)]"
            >
                THP
            </Text>
        </Stack>
    )
}

function Attributes() {
    const level = useCharacterLevel()
    const attrs = useCharacterAttributes()
    const characterClasses = useCharacterClasses()
    const { rollDice } = useDiceTrayActions()

    const handleRollAttr = (label: string, mod: number) => () => {
        rollDice(`d20`, [mod], label)
    }

    return (
        <Stack gap="xs">
            {attributeOptions.map((attr) => {
                const abilityModifier = getModifier(attrs[attr.value])
                const hasProficiency = characterClasses.some((c) =>
                    c.data.proficiencies?.savingThrows.includes(attr.value)
                )
                const saveModifier =
                    abilityModifier +
                    +hasProficiency * getProficiencyBonus(level)

                const isPositive = abilityModifier > 0
                return (
                    <Group key={attr.value} justify="space-between">
                        <UnstyledButton
                            onClick={handleRollAttr(
                                attr.label,
                                abilityModifier
                            )}
                        >
                            <Text>{attr.label}</Text>
                        </UnstyledButton>
                        <Group gap="xs">
                            <UnstyledButton
                                onClick={handleRollAttr(
                                    `Save de ${attr.label}`,
                                    saveModifier
                                )}
                            >
                                <Badge
                                    className="w-24"
                                    mr="sm"
                                    variant={hasProficiency ? 'dot' : 'outline'}
                                    color={hasProficiency ? 'white' : 'grey'}
                                >
                                    Save: {isPositive && '+'}
                                    {saveModifier}
                                </Badge>
                            </UnstyledButton>
                            <Badge
                                mr="sm"
                                variant="outline"
                                color={isPositive ? 'green' : 'red'}
                            >
                                {isPositive && '+'}
                                {abilityModifier}
                            </Badge>
                            <Text className="size-10 rounded bg-support-400 text-2xl font-bold text-center align-middle leading-10">
                                {attrs[attr.value]}
                            </Text>
                        </Group>
                    </Group>
                )
            })}
        </Stack>
    )
}

function Backstory() {
    const backstory = useCharacterBackstory()

    return (
        <Stack gap="xs" maw={400}>
            <Text size="lg" fw="bold">
                História do personagem
            </Text>
            <Text className="hyphens-auto">{backstory}</Text>
        </Stack>
    )
}

function Skills() {
    const level = useCharacterLevel()
    const attrs = useCharacterAttributes()
    const characterSkills = useCharacterSkills()
    const { toggleSkillProficiency } = useCharacterSheetActions()
    const { rollDice } = useDiceTrayActions()

    const handleRollAttr = (label: string, mod: number) => () => {
        rollDice(`d20`, [mod], label)
    }

    return (
        <Stack className="min-w-[320px]" gap="xs">
            {skills.map((attr) => {
                const isTrained = characterSkills.includes(attr.value)
                const handleToggle = () => toggleSkillProficiency(attr.value)

                const value =
                    +isTrained * getProficiencyBonus(level) +
                    getModifier(attrs[skillModifierMap[attr.value]])

                return (
                    <Group key={attr.value} justify="space-between">
                        <Group>
                            <Checkbox
                                checked={isTrained}
                                onChange={handleToggle}
                            />
                            <UnstyledButton
                                onClick={handleRollAttr(attr.label, value)}
                            >
                                <Text className="text-sm">{attr.label}</Text>
                            </UnstyledButton>
                        </Group>

                        <Text className="size-10 rounded bg-support-400 text-2xl font-bold text-center align-middle leading-10">
                            {value}
                        </Text>
                    </Group>
                )
            })}
        </Stack>
    )
}

function Inventory() {
    const { toggleEquippedItem, decreaseItemAmount } =
        useCharacterSheetActions()
    const { rollDice } = useDiceTrayActions()
    const strength = useCharacterStrength()
    const dexterity = useCharacterDexterity()
    const characterItems = useCharacterItems()
    const characterLevel = useCharacterLevel()
    const [selectedItem, setSelectedItem] = useState<DnD5eEquipment | null>(
        null
    )
    const [itemSelectionOpened, { open, close }] = useDisclosure(false)
    const [selectedFilter, setSelectedFilter] =
        useState<keyof typeof categoryToGroupMap>('armor')

    const handleRollAttr =
        (die: DiceNotation, label: string, mod: number[]) => () => {
            rollDice(die, mod, label)
        }

    const handleSetSelectedItem = (item: DnD5eEquipment) => () => {
        setSelectedItem(item)
    }

    const getGroupName = (category: string) => {
        switch (category) {
            case 'tools':
                return 'Ferramentas'
            case 'mounts-and-vehicles':
                return 'Montarias e Veículos'
            case 'weapon':
                return 'Armas'
            case 'armor':
                return 'Armaduras'
            default:
                return 'Equipamentos'
        }
    }
    const accordionData =
        characterItems.reduce(
            (acc, item) => {
                const group = getGroupName(item.equipment_category.index)
                const index = acc.findIndex((e) => e.group === group)

                acc[index].items.push(item)

                return acc
            },
            [
                { group: 'Armas', items: [] },
                { group: 'Armaduras', items: [] },
                { group: 'Equipamentos', items: [] },
                { group: 'Ferramentas', items: [] },
                { group: 'Montarias e Veículos', items: [] },
            ] as Array<{
                group: keyof typeof groupToCategoryMap
                items: typeof characterItems
            }>
        ) ?? []

    const handleEquipItem = (itemIndex: string) => () => {
        toggleEquippedItem(itemIndex)
    }

    const handleOpenItemSelection =
        (itemGroup: keyof typeof categoryToGroupMap) => () => {
            open()
            setSelectedFilter(itemGroup)
        }

    const getAtkBonus = (weapon: DnD5eEquipment) => {
        return weapon.weapon_range === 'Ranged'
            ? getModifier(dexterity)
            : weapon.properties.some((p) => p.index === 'finesse')
              ? getModifier(Math.max(strength, dexterity))
              : getModifier(strength)
    }

    const handleDecreaseItem = (itemIndex: string) => () => {
        decreaseItemAmount(itemIndex)
    }

    return (
        <>
            <ItemSelectionDrawer
                selectedFilter={selectedFilter}
                itemSelectionOpened={itemSelectionOpened}
                close={close}
            />

            <Accordion
                className="w-full max-w-[450px]"
                defaultValue={accordionData
                    .filter((data) => data.items.length)
                    .map((data) => data.group)}
                multiple
            >
                {accordionData.map((data) => {
                    return (
                        <Accordion.Item key={data.group} value={data.group}>
                            <Center>
                                <Accordion.Control>
                                    {data.group}
                                </Accordion.Control>

                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    color="gray"
                                    mx="sm"
                                    onClick={handleOpenItemSelection(
                                        groupToCategoryMap[data.group]
                                    )}
                                >
                                    <IconPlus size="1rem" />
                                </ActionIcon>
                            </Center>

                            <Accordion.Panel>
                                <Group>
                                    {data.items.map((itemData, i) => {
                                        return (
                                            <Group
                                                w="100%"
                                                key={itemData.index + i}
                                            >
                                                <UnstyledButton
                                                    className="grow"
                                                    onClick={handleSetSelectedItem(
                                                        itemData
                                                    )}
                                                >
                                                    <Group>
                                                        <Avatar />
                                                        <Stack gap={0}>
                                                            <div>
                                                                {itemData.amount && (
                                                                    <Text
                                                                        component="span"
                                                                        c="var(--do_text_color_300)"
                                                                    >
                                                                        {
                                                                            itemData.amount
                                                                        }
                                                                        x{' '}
                                                                    </Text>
                                                                )}
                                                                <Text
                                                                    component="span"
                                                                    fw="bold"
                                                                >
                                                                    {
                                                                        itemData.name
                                                                    }
                                                                </Text>
                                                                {itemData.damage && (
                                                                    <Text component="span">
                                                                        {` ${itemData.damage.damage_dice} + ${getAtkBonus(itemData)}`}
                                                                    </Text>
                                                                )}
                                                                {itemData.two_handed_damage && (
                                                                    <Text component="span">
                                                                        {` | ${itemData.two_handed_damage.damage_dice} + ${getModifier(strength)} ${itemData.two_handed_damage.damage_type.name}`}
                                                                    </Text>
                                                                )}
                                                            </div>
                                                            <Text
                                                                title={itemData.desc.join(
                                                                    ''
                                                                )}
                                                                size="sm"
                                                            >
                                                                {itemData.desc
                                                                    .join('')
                                                                    .substring(
                                                                        0,
                                                                        35
                                                                    )}
                                                                {itemData.desc.join(
                                                                    ''
                                                                ).length > 35 &&
                                                                    '...'}
                                                            </Text>
                                                        </Stack>
                                                    </Group>
                                                </UnstyledButton>
                                                {data.group === 'Armaduras' && (
                                                    <Button
                                                        variant="outline"
                                                        size="xs"
                                                        color={
                                                            itemData.equipped
                                                                ? 'brand'
                                                                : 'gray'
                                                        }
                                                        onClick={handleEquipItem(
                                                            itemData.index
                                                        )}
                                                    >
                                                        {itemData.equipped
                                                            ? 'Equipado'
                                                            : 'Equipar'}
                                                    </Button>
                                                )}
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="gray"
                                                    onClick={handleDecreaseItem(
                                                        itemData.index
                                                    )}
                                                >
                                                    <IconTrash size="1rem" />
                                                </ActionIcon>
                                            </Group>
                                        )
                                    })}
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )
                })}
            </Accordion>

            <Transition mounted={!!selectedItem} transition="fade">
                {(styles) => (
                    <div
                        style={{
                            ...styles,
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                            zIndex: 1,
                        }}
                        onClick={() => setSelectedItem(null)}
                    />
                )}
            </Transition>
            <Transition mounted={!!selectedItem} transition="slide-up">
                {(styles) => (
                    <div
                        style={{
                            ...styles,
                            position: 'fixed',
                            right: 0,
                            bottom: 0,
                            left: 0,
                            zIndex: 2,
                            borderTopRightRadius: 'var(--do_border_radius_lg)',
                            borderTopLeftRadius: 'var(--do_border_radius_lg)',
                            padding: '16px',
                            paddingBottom: '32px',
                            minHeight: '535px',
                            background: 'var(--mantine-color-body)',
                        }}
                    >
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
                                    <>
                                        <Button
                                            className="h-16"
                                            onClick={handleRollAttr(
                                                'd20',
                                                `${selectedItem.name} (Ataque)`,
                                                [
                                                    getAtkBonus(selectedItem),
                                                    getProficiencyBonus(
                                                        characterLevel
                                                    ),
                                                ]
                                            )}
                                        >
                                            Ataque +{' '}
                                            {getAtkBonus(selectedItem) +
                                                getProficiencyBonus(
                                                    characterLevel
                                                )}
                                        </Button>
                                        <Button
                                            className="h-16"
                                            onClick={handleRollAttr(
                                                selectedItem.damage
                                                    .damage_dice as DiceNotation,
                                                `${selectedItem.name} (Dano)`,
                                                [getAtkBonus(selectedItem)]
                                            )}
                                        >
                                            <Stack
                                                className="rounded-lg"
                                                justify="center"
                                                align="center"
                                                gap={0}
                                            >
                                                <Text c="white" fw="bold">
                                                    {
                                                        selectedItem.damage
                                                            .damage_dice
                                                    }{' '}
                                                    +{' '}
                                                    {getAtkBonus(selectedItem)}
                                                </Text>
                                                <Text c="white">
                                                    {
                                                        selectedItem.damage
                                                            .damage_type.name
                                                    }
                                                </Text>
                                            </Stack>
                                        </Button>
                                        {selectedItem.two_handed_damage && (
                                            <Button
                                                className="h-16"
                                                onClick={handleRollAttr(
                                                    selectedItem
                                                        .two_handed_damage
                                                        .damage_dice as DiceNotation,
                                                    `${selectedItem.name} (Dano)`,
                                                    [getModifier(strength)]
                                                )}
                                            >
                                                <Stack
                                                    className="rounded-lg"
                                                    justify="center"
                                                    align="center"
                                                    gap={0}
                                                >
                                                    <Text c="white" fw="bold">
                                                        {
                                                            selectedItem
                                                                .two_handed_damage
                                                                .damage_dice
                                                        }{' '}
                                                        +{' '}
                                                        {getAtkBonus(
                                                            selectedItem
                                                        )}
                                                    </Text>
                                                    <Text c="white">
                                                        {
                                                            selectedItem
                                                                .two_handed_damage
                                                                .damage_type
                                                                .name
                                                        }
                                                    </Text>
                                                </Stack>
                                            </Button>
                                        )}
                                    </>
                                )}

                                {selectedItem?.armor_class && (
                                    <Stack
                                        className="rounded-lg"
                                        justify="center"
                                        align="center"
                                        gap={0}
                                        bg="var(--do_color_primary_base)"
                                        px="md"
                                        miw={68}
                                        h={68}
                                    >
                                        <Text c="white" fw="bold">
                                            {selectedItem?.armor_class.base}{' '}
                                            {selectedItem?.armor_class
                                                .dex_bonus && `+ Des`}
                                            {selectedItem?.armor_class
                                                .max_bonus &&
                                                `(${selectedItem?.armor_class.max_bonus})`}
                                        </Text>
                                        <Text c="white">CA</Text>
                                    </Stack>
                                )}

                                {selectedItem?.armor_class?.max_bonus && (
                                    <Stack
                                        className="rounded-lg"
                                        justify="center"
                                        align="center"
                                        gap={0}
                                        bg="var(--do_color_primary_base)"
                                        px="md"
                                        miw={68}
                                        h={68}
                                    >
                                        <Text c="white">
                                            {
                                                selectedItem?.armor_class
                                                    .max_bonus
                                            }
                                        </Text>
                                        <Text c="white">Des. max.</Text>
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
    )
}

interface ItemSelectionDrawerProps {
    selectedFilter: keyof typeof categoryToGroupMap
    itemSelectionOpened: boolean
    close: VoidFunction
}
function ItemSelectionDrawer({
    selectedFilter,
    itemSelectionOpened,
    close,
}: ItemSelectionDrawerProps) {
    const { addItem } = useCharacterSheetActions()
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebouncedValue(search, 200)

    const filterFn = (category: string) => (e: (typeof equipment)[number]) => {
        return e.equipment_category.index === category
    }

    const tools = useMemo(() => {
        return equipment
            .filter(filterFn('tools'))
            .sort((a, b) => a.tool_category!.localeCompare(b.tool_category!))
    }, [])
    const mountsAndVehicles = useMemo(() => {
        return equipment
            .filter(filterFn('mounts-and-vehicles'))
            .sort((a, b) =>
                a.vehicle_category!.localeCompare(b.vehicle_category!)
            )
    }, [])
    const weapons = useMemo(() => {
        return equipment
            .filter(filterFn('weapon'))
            .sort((a, b) =>
                a.weapon_category!.localeCompare(b.weapon_category!)
            )
    }, [])
    const armors = useMemo(() => {
        return equipment
            .filter(filterFn('armor'))
            .sort((a, b) => a.armor_category!.localeCompare(b.armor_category!))
    }, [])
    const generalEquipment = useMemo(() => {
        return equipment
            .filter(
                (e) =>
                    ![
                        'tools',
                        'mounts-and-vehicles',
                        'weapon',
                        'armor',
                    ].includes(e.equipment_category.index)
            )
            .sort((a, b) =>
                a.gear_category!.name.localeCompare(b.gear_category!.name)
            )
    }, [])

    const equipmentByCategory = {
        tools,
        'mounts-and-vehicles': mountsAndVehicles,
        weapon: weapons,
        armor: armors,
        generalEquipment,
    }

    const itemList = equipmentByCategory[
        (selectedFilter as keyof typeof equipmentByCategory) ??
            'generalEquipment'
    ].filter((e) =>
        removeDiacritics(e.name.toLocaleLowerCase()).includes(
            removeDiacritics(debouncedSearch.toLocaleLowerCase())
        )
    )

    const separatorKey: Record<keyof typeof categoryToGroupMap, string> = {
        tools: 'tool_category',
        'mounts-and-vehicles': 'vehicle_category',
        weapon: 'weapon_category',
        armor: 'armor_category',
        generalEquipment: 'gear_category',
    }

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setSearch(event.currentTarget.value)
    }

    const handleClose = () => {
        setSearch('')
        close()
    }

    const handleAddItem = (itemIndex: string) => () => {
        addItem(itemIndex)
    }

    return (
        <>
            <Drawer
                title={categoryToGroupMap[selectedFilter ?? 'generalEquipment']}
                opened={itemSelectionOpened}
                position="right"
                onClose={handleClose}
            >
                <Stack>
                    <TextInput
                        type="search"
                        placeholder="Invocar pelo nome"
                        rightSection={<IconSearch />}
                        value={search}
                        onChange={handleSearch}
                    />
                    {itemList.map((item, i, prev) => {
                        const key = separatorKey[selectedFilter]
                        const prevSeparator =
                            i > 0 && // @ts-ignore
                            (prev[i - 1][key]?.name ??
                                // @ts-ignore
                                prev[i - 1][key])
                        const currentSeparator =
                            // @ts-ignore
                            item[key]?.name ??
                            // @ts-ignore
                            item[key]

                        return (
                            <Fragment key={item.index}>
                                {(i === 0 ||
                                    (i > 0 &&
                                        prevSeparator !==
                                            currentSeparator)) && (
                                    <Divider label={currentSeparator} />
                                )}
                                <Group>
                                    <Stack gap={0}>
                                        <Text>
                                            {item.name}{' '}
                                            {!!item.desc.length && (
                                                <ToggleTip
                                                    className="align-bottom"
                                                    label={item.desc}
                                                >
                                                    <IconInfoCircle size={24} />
                                                </ToggleTip>
                                            )}
                                        </Text>
                                        {!!item.contents.length && (
                                            <Spoiler
                                                styles={{
                                                    control: {
                                                        fontSize: '.75rem',
                                                    },
                                                }}
                                                maxHeight={0}
                                                showLabel="Mostrar mais"
                                                hideLabel="Esconder"
                                            >
                                                <Stack mt="sm">
                                                    {item.contents.map((c) => {
                                                        return (
                                                            <Text
                                                                key={
                                                                    c.item.index
                                                                }
                                                                className="text-xs text-support-300"
                                                            >
                                                                {c.quantity}x{' '}
                                                                {c.item.name}
                                                            </Text>
                                                        )
                                                    })}
                                                </Stack>
                                            </Spoiler>
                                        )}
                                    </Stack>
                                    {item.damage?.damage_dice && (
                                        <Text className="text-xs text-support-300">
                                            {item.damage.damage_dice} -{' '}
                                            {item.damage.damage_type.name}
                                        </Text>
                                    )}
                                    {item.armor_class && (
                                        <Text className="text-xs text-support-300">
                                            CA {item.armor_class.base}{' '}
                                            {item.armor_class.max_bonus
                                                ? `+ DES (Max ${item.armor_class.max_bonus})`
                                                : item.armor_class.dex_bonus &&
                                                  `+ DES`}
                                        </Text>
                                    )}

                                    <Text className="text-xs text-support-300 text-right flex-grow">
                                        {item.cost.quantity} {item.cost.unit}
                                    </Text>
                                    <ActionIcon
                                        title="Adicionar"
                                        onClick={handleAddItem(item.index)}
                                    >
                                        <IconPlus />
                                    </ActionIcon>
                                </Group>
                            </Fragment>
                        )
                    })}
                </Stack>
            </Drawer>
        </>
    )
}

const attributeOptions: LabelValue<Attribute>[] = [
    {
        value: 'strength',
        label: 'Força',
    },
    {
        value: 'dexterity',
        label: 'Destreza',
    },
    {
        value: 'constitution',
        label: 'Constituição',
    },
    {
        value: 'intelligence',
        label: 'Inteligência',
    },
    {
        value: 'wisdom',
        label: 'Sabedoria',
    },
    {
        value: 'charisma',
        label: 'Carisma',
    },
]

export const skills: LabelValue<Skill>[] = [
    { label: 'Arcana', value: 'arcana' },
    { label: 'Acrobacia (Acrobatics)', value: 'acrobatics' },
    { label: 'Atletismo (Athletics)', value: 'athletics' },
    { label: 'Enganação (Deception)', value: 'deception' },
    { label: 'Furtividade (Stealth)', value: 'stealth' },
    { label: 'Historia (History)', value: 'history' },
    { label: 'Intimidação (Intimidation)', value: 'intimidation' },
    { label: 'Intuição (Insight)', value: 'insight' },
    { label: 'Investigação (Investigation)', value: 'investigation' },
    { label: 'Lidar com animais (Animal Handling)', value: 'animal_handling' },
    { label: 'Medicina (Medicine)', value: 'medicine' },
    { label: 'Natureza (Nature)', value: 'nature' },
    { label: 'Percepção (Perception)', value: 'perception' },
    { label: 'Persuasão (Persuasion)', value: 'persuasion' },
    { label: 'Religião (Religion)', value: 'religion' },
    { label: 'Sobrevivência (Survival)', value: 'survival' },
]

const skillModifierMap: Record<Skill, Attribute> = {
    arcana: 'intelligence',
    acrobatics: 'dexterity',
    athletics: 'strength',
    deception: 'charisma',
    stealth: 'dexterity',
    history: 'intelligence',
    intimidation: 'charisma',
    insight: 'wisdom',
    investigation: 'intelligence',
    animal_handling: 'wisdom',
    medicine: 'wisdom',
    nature: 'intelligence',
    perception: 'wisdom',
    persuasion: 'charisma',
    religion: 'intelligence',
    survival: 'wisdom',
}

const categoryToGroupMap = {
    tools: 'Ferramentas',
    'mounts-and-vehicles': 'Montarias e Veículos',
    weapon: 'Armas',
    armor: 'Armaduras',
    generalEquipment: 'Equipamentos',
} as const

const groupToCategoryMap = {
    Ferramentas: 'tools',
    'Montarias e Veículos': 'mounts-and-vehicles',
    Armas: 'weapon',
    Armaduras: 'armor',
    Equipamentos: 'generalEquipment',
} as const

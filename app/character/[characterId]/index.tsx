/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
    Accordion,
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Center,
    Checkbox,
    Divider,
    Drawer,
    Group,
    List,
    Modal,
    Select,
    Space,
    Spoiler,
    Stack,
    Text,
    TextInput,
    Title,
    Transition,
    UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
    useDebouncedValue,
    useDisclosure,
    useMediaQuery,
    useViewportSize,
} from '@mantine/hooks'
import {
    IconChevronLeft,
    IconHeartFilled,
    IconInfoCircle,
    IconPlus,
    IconSearch,
    IconShieldFilled,
} from '@tabler/icons-react'
import { useAtom } from 'jotai'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    type CSSProperties,
    type ChangeEventHandler,
    Fragment,
    useEffect,
    useMemo,
    useState,
} from 'react'

import classes from '@/assets/dnd/5e/classes'
import type { Attribute, Skill } from '@/assets/dnd/5e/classes/interfaces'
import equipment from '@/assets/dnd/5e/equipment.json'
import type { DnD5eEquipment } from '@/assets/dnd/5e/interfaces'
import races from '@/assets/dnd/5e/races'
import { CharacterSheet } from '@/assets/dnd/5e/utils/CharacterSheet'
import getModifier from '@/assets/dnd/5e/utils/getModifier'
import getProficiencyBonus from '@/assets/dnd/5e/utils/getProficiencyBonus'
import CharacterPortrait from '@/components/character/components/character-portrait'
import CharacterFooter from '@/components/character/components/footer/character-footer'
import Grimoire from '@/components/character/components/grimoire'
import { activeTabAtom, characterAtom } from '@/components/character/state'
import ToggleTip from '@/components/shared/toggle-tip'
import useCharacter from '@/hooks/useCharacter'
import breakpoints from '@/utils/breakpoints'
import { removeDiacritics } from '@/utils/removeDiacritics'

export const getServerSideProps = (async ({ query }) => {
    if (!query.characterId) {
        return {
            props: { notFound: true, characterId: '' },
        }
    }

    return {
        props: { notFound: false, characterId: query.characterId as string },
    }
}) satisfies GetServerSideProps<{
    notFound: boolean
    characterId: string
}>

export default function CharacterSheetPage({
    notFound,
    characterId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { getCharacter, updateCharacter } = useCharacter()
    const [activeTab, setActiveTab] = useAtom(activeTabAtom)
    const [sheet, setSheet] = useAtom(characterAtom)
    const router = useRouter()
    const { width } = useViewportSize()
    const isMobile = width < breakpoints.md

    useEffect(() => {
        if (activeTab !== 'none') return

        setActiveTab('basic')
    }, [])

    useEffect(() => {
        const char = getCharacter(characterId)

        if (!char || sheet?.id === char.id) return

        setSheet(
            new CharacterSheet({
                ...char,
                classes: char.classes.map((c) => ({
                    data: classes[c.name],
                    level: c.level,
                })),
            })
        )
    })

    useEffect(() => {
        if (!notFound) return

        router.push('/home')
    }, [notFound])

    const handleUpdateCharacter = (newCharacter: CharacterSheet) => {
        const char = newCharacter.toProps()
        updateCharacter(characterId, char)
        setSheet(
            new CharacterSheet({
                ...char,
                classes: char.classes.map((c) => ({
                    data: classes[c.name],
                    level: c.level,
                })),
            })
        )
    }

    const hp = sheet?.hp ?? 0

    const characterLevel =
        sheet?.classes.reduce((acc, c) => acc + c.level, 0) ?? 1

    const handleChangeTempHp: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!sheet) return

        const { value } = e.currentTarget
        sheet.tempHp = +value
        handleUpdateCharacter(sheet)
    }

    const handleChangeCurrentHp: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!sheet) return

        const { value } = e.currentTarget
        sheet.currentHp = +value
        handleUpdateCharacter(sheet)
    }

    const handleChangeInitiative: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (!sheet) return

        const { value } = e.currentTarget
        sheet.initiative = +value
        handleUpdateCharacter(sheet)
    }

    return (
        sheet && (
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

                        <Title
                            className="absolute left-1/2 -translate-x-1/2"
                            size="md"
                        >
                            Personagem
                        </Title>

                        <Group gap="xs">
                            {!isMobile && (
                                <>
                                    <Link href={`./${characterId}/traits`}>
                                        Traços raciais
                                    </Link>
                                    <Link href={`./${characterId}/features`}>
                                        Características de classe
                                    </Link>
                                </>
                            )}
                            {sheet.classes.reduce(
                                (acc, c) => acc + c.level,
                                0
                            ) < 20 && (
                                <Link href={`./${characterId}/level-up`}>
                                    <Button size="xs" component="div">
                                        Level Up
                                    </Button>
                                </Link>
                            )}
                        </Group>
                    </Group>
                </header>
                <main className="flex w-full flex-wrap justify-center gap-4 pb-24">
                    {activeTab === 'basic' && (
                        <Stack className="min-w-[350px] max-w-[450px] p-4">
                            <CharacterPortrait
                                imgSrc={sheet.picture as string}
                                name={sheet.name}
                                label={`${
                                    races[sheet.race!].name
                                }, ${sheet.classes
                                    .map(
                                        (classIndex) =>
                                            `${classIndex.data.name} lv${classIndex.level}`
                                    )
                                    .join(', ')}.`}
                            />
                            <Group justify="center">
                                <Stack align="center" gap={0}>
                                    <TextInput
                                        css={css`
                                            padding-top: 6px;
                                            height: 64px;
                                            input {
                                                font-weight: bold;
                                                color: var(--do_text_color_300);
                                                text-align: center;
                                            }
                                        `}
                                        variant="unstyled"
                                        type="number"
                                        min={-100}
                                        value={
                                            sheet.initiative ??
                                            sheet.dexterity.mod
                                        }
                                        max={100}
                                        size="lg"
                                        onChange={handleChangeInitiative}
                                    />

                                    <Text
                                        size="sm"
                                        fw="bold"
                                        c="var(--do_text_color_300)"
                                    >
                                        Iniciativa
                                    </Text>
                                </Stack>

                                <Stack align="center" gap={0}>
                                    <Box pos="relative" h={64}>
                                        <IconShieldFilled
                                            css={css`
                                                color: #a5a5a5;
                                            `}
                                            size={64}
                                        />
                                        <Text
                                            className="absolute top-1/4 left-1/2 -translate-x-1/2"
                                            size="lg"
                                            fw="bold"
                                            c="var(--do_text_color_600)"
                                        >
                                            {sheet.armorClass}
                                        </Text>
                                    </Box>
                                    <Text
                                        size="sm"
                                        fw="bold"
                                        c="var(--do_text_color_300)"
                                    >
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
                                        <TextInput
                                            css={css`
                                                position: absolute;
                                                top: 4px;
                                                left: 0;
                                                width: 64px;

                                                input {
                                                    font-weight: bold;
                                                    color: var(
                                                        --do_text_color_600
                                                    );
                                                    text-align: center;
                                                }
                                            `}
                                            variant="unstyled"
                                            type="number"
                                            min={-hp}
                                            value={sheet.currentHp ?? hp}
                                            max={hp}
                                            size="lg"
                                            onChange={handleChangeCurrentHp}
                                        />
                                    </Box>
                                    <Text
                                        size="sm"
                                        fw="bold"
                                        c="var(--do_text_color_300)"
                                    >
                                        HP
                                    </Text>
                                </Stack>

                                <Stack align="center" gap={0}>
                                    <Box pos="relative" h={64}>
                                        <IconHeartFilled
                                            css={css`
                                                color: #69cc60;
                                            `}
                                            size={64}
                                        />
                                        <TextInput
                                            css={css`
                                                position: absolute;
                                                top: 4px;
                                                left: 0;
                                                width: 64px;

                                                input {
                                                    font-weight: bold;
                                                    color: var(
                                                        --do_text_color_600
                                                    );
                                                    text-align: center;
                                                }
                                            `}
                                            variant="unstyled"
                                            type="number"
                                            min={-hp}
                                            value={sheet.tempHp ?? 0}
                                            max={hp}
                                            size="lg"
                                            onChange={handleChangeTempHp}
                                        />
                                    </Box>
                                    <Text
                                        size="sm"
                                        fw="bold"
                                        c="var(--do_text_color_300)"
                                    >
                                        THP
                                    </Text>
                                </Stack>
                            </Group>
                            <Stack gap="xs">
                                {attributeOptions.map((attr) => {
                                    const abilityModifier = getModifier(
                                        sheet[attr.value].total
                                    )

                                    const hasProficiency = sheet.classes.some(
                                        (c) =>
                                            c.data.proficiencies.savingThrows.includes(
                                                attr.value
                                            )
                                    )

                                    return (
                                        <Group
                                            key={attr.value}
                                            justify="space-between"
                                        >
                                            <Text>{attr.label}</Text>
                                            <Group gap="sm">
                                                <Badge
                                                    mr="sm"
                                                    variant={
                                                        hasProficiency
                                                            ? 'dot'
                                                            : 'outline'
                                                    }
                                                    color={
                                                        hasProficiency
                                                            ? 'white'
                                                            : 'grey'
                                                    }
                                                >
                                                    Save:{' '}
                                                    {abilityModifier > 0 && '+'}
                                                    {abilityModifier +
                                                        +hasProficiency *
                                                            getProficiencyBonus(
                                                                characterLevel
                                                            )}
                                                </Badge>
                                                <Badge
                                                    mr="sm"
                                                    variant="outline"
                                                    color="white"
                                                >
                                                    {abilityModifier > 0 && '+'}
                                                    {abilityModifier}
                                                </Badge>
                                                <Text
                                                    css={attributeNumberStyles}
                                                >
                                                    {sheet[attr.value].total}
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
                                    {sheet.backstory}
                                </Text>
                            </Stack>
                        </Stack>
                    )}

                    {(activeTab === 'skills' || !isMobile) && (
                        <Stack className="min-w-[320px]" gap="xs">
                            {skills.map((attr) => {
                                const isTrained = sheet.proficiencies.includes(
                                    attr.value
                                )

                                return (
                                    <Group
                                        key={attr.value}
                                        justify="space-between"
                                    >
                                        <Checkbox
                                            label={attr.label}
                                            checked={isTrained}
                                        />

                                        <Text css={attributeNumberStyles}>
                                            {+isTrained *
                                                getProficiencyBonus(
                                                    characterLevel
                                                ) +
                                                getModifier(
                                                    sheet[
                                                        skillModifierMap[
                                                            attr.value
                                                        ]
                                                    ].total
                                                )}
                                        </Text>
                                    </Group>
                                )
                            })}
                        </Stack>
                    )}

                    {(activeTab === 'inventory' || !isMobile) && (
                        <Inventory onUpdateCharacter={handleUpdateCharacter} />
                    )}

                    {(activeTab === 'magic' || !isMobile) && <Grimoire />}
                </main>

                {isMobile && <CharacterFooter />}
            </>
        )
    )
}

interface InventoryProps {
    onUpdateCharacter: (newCharacter: CharacterSheet) => void
}
function Inventory({ onUpdateCharacter }: InventoryProps) {
    const [character] = useAtom(characterAtom)
    const [selectedItem, setSelectedItem] = useState<DnD5eEquipment | null>(
        null
    )
    const handleSetSelectedItem = (item: DnD5eEquipment) => () => {
        setSelectedItem(item)
    }
    const [itemSelectionOpened, { open, close }] = useDisclosure(false)
    const [selectedFilter, setSelectedFilter] = useState<string | Nill>()

    const accordionData = useMemo(() => {
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

        return (
            character?.items.reduce(
                (acc, item) => {
                    const itemData = equipment.find(
                        (e) => e.index === item.index
                    )
                    if (!itemData) return acc

                    const group = getGroupName(
                        itemData.equipment_category.index
                    )
                    const index = acc.findIndex((e) => e.group === group)

                    acc[index].items.push(itemData)

                    return acc
                },
                [
                    { group: 'Armas', items: [] },
                    { group: 'Armaduras', items: [] },
                    { group: 'Equipamentos', items: [] },
                    { group: 'Ferramentas', items: [] },
                    { group: 'Montarias e Veículos', items: [] },
                ] as Array<{ group: string; items: DnD5eEquipment[] }>
            ) ?? []
        )
    }, [character])

    const handleEquipItem = (itemIndex: string) => () => {
        if (!character) return

        const { items = [] } = character
        const index = items.findIndex((i) => i.index === itemIndex)
        character.items[index].equipped = !items[index].equipped

        onUpdateCharacter(character)
    }

    const handleOpenItemSelection = (itemGroup: string) => () => {
        open()
        setSelectedFilter(itemGroup)
    }

    const groupToCategoryMap: Record<any, string> = {
        Ferramentas: 'tools',
        'Montarias e Veículos': 'mounts-and-vehicles',
        Armas: 'weapon',
        Armaduras: 'armor',
        Equipamentos: 'generalEquipment',
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
                defaultValue={accordionData.map((data) => data.group)}
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
                                        const item = character?.items.find(
                                            (item) =>
                                                item.index === itemData.index
                                        )!
                                        return (
                                            <Group
                                                w="100%"
                                                key={itemData.index + i}
                                            >
                                                <UnstyledButton
                                                    css={css`
                                                        flex-grow: 1;
                                                    `}
                                                    onClick={handleSetSelectedItem(
                                                        itemData
                                                    )}
                                                >
                                                    <Group>
                                                        <Avatar />
                                                        <Stack gap={0}>
                                                            <div>
                                                                {item.amount && (
                                                                    <Text
                                                                        component="span"
                                                                        c="var(--do_text_color_300)"
                                                                    >
                                                                        {
                                                                            item.amount
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
                                                                {item.ammo && (
                                                                    <Text
                                                                        component="span"
                                                                        c="var(--do_text_color_300)"
                                                                        size="sm"
                                                                    >
                                                                        {' '}
                                                                        Mun:{' '}
                                                                        {
                                                                            item.ammo
                                                                        }
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
                                                            item.equipped
                                                                ? 'brand'
                                                                : 'gray'
                                                        }
                                                        onClick={handleEquipItem(
                                                            item.index
                                                        )}
                                                    >
                                                        {item.equipped
                                                            ? 'Equipado'
                                                            : 'Equipar'}
                                                    </Button>
                                                )}
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
                                            border-radius: var(
                                                --do_border_radius_md
                                            );
                                        `}
                                        px="md"
                                        miw={68}
                                        h={68}
                                    >
                                        <Text color="white" fw="bold">
                                            {selectedItem?.damage.damage_dice}
                                        </Text>
                                        <Text color="white">
                                            {
                                                selectedItem?.damage.damage_type
                                                    .name
                                            }
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
                                            border-radius: var(
                                                --do_border_radius_md
                                            );
                                        `}
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
                                        justify="center"
                                        align="center"
                                        gap={0}
                                        bg="var(--do_color_primary_base)"
                                        css={css`
                                            border-radius: var(
                                                --do_border_radius_md
                                            );
                                        `}
                                        px="md"
                                        miw={68}
                                        h={68}
                                    >
                                        <Text color="white">
                                            {
                                                selectedItem?.armor_class
                                                    .max_bonus
                                            }
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
    )
}

interface ItemSelectionDrawerProps {
    selectedFilter: string | Nill
    itemSelectionOpened: boolean
    close: VoidFunction
}
function ItemSelectionDrawer({
    selectedFilter,
    itemSelectionOpened,
    close,
}: ItemSelectionDrawerProps) {
    const [characterSheet, setCharacterSheet] = useAtom(characterAtom)
    const { updateCharacter } = useCharacter()
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebouncedValue(search, 200)
    const [
        openedNewItemModal,
        { open: openNewItemModal, close: closeNewItemModal },
    ] = useDisclosure(false)

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

    const separatorKey: Record<any, string> = {
        tools: 'tool_category',
        'mounts-and-vehicles': 'vehicle_category',
        weapon: 'weapon_category',
        armor: 'armor_category',
        generalEquipment: 'gear_category',
    }

    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearch(event.currentTarget.value)
    }

    const handleClose = () => {
        setSearch('')
        close()
    }

    const handleAddItem = (itemIndex: string) => () => {
        if (!characterSheet) return

        characterSheet.addItem(itemIndex)
        setCharacterSheet(
            new CharacterSheet({
                ...characterSheet.toProps(),
                classes: characterSheet.classes,
            })
        )

        updateCharacter(characterSheet.id, characterSheet.toProps())
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
                        label="Invocar pelo nome"
                        rightSection={<IconSearch />}
                        value={search}
                        onChange={handleSearch}
                    />
                    <Button onClick={openNewItemModal}>Novo</Button>
                    {itemList.map((item, i, prev) => {
                        // Type safety first :D
                        // @ts-ignore
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
            <NewItemModal
                category={selectedFilter!}
                opened={openedNewItemModal}
                onClose={closeNewItemModal}
            />
        </>
    )
}

interface NewItemModal {
    opened: boolean
    category: string
    onClose: VoidFunction
}
function NewItemModal({ opened, category, onClose }: NewItemModal) {
    const isMobile = useMediaQuery('(max-width: 50em)')

    const form = useForm({
        initialValues: {
            name: '',
            category, // Undefined for some reason...
        },

        validate: {
            name: (value) => (value ? null : 'O nome não pode ficar em branco'),
            category: (value) => (value ? null : 'Selecione um tipo de item'),
        },
    })

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Modal
            title="Novo item"
            opened={opened}
            fullScreen={isMobile}
            transitionProps={{ transition: 'fade', duration: 200 }}
            onClose={handleClose}
        >
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Stack>
                    <TextInput
                        label="Nome"
                        required
                        {...form.getInputProps('name')}
                    />
                    <Select
                        label="Tipo"
                        required
                        data={Object.entries(categoryToGroupMap).map(
                            ([k, v]) => {
                                return {
                                    label: v,
                                    value: k,
                                }
                            }
                        )}
                        {...form.getInputProps('category')}
                    />
                    <Space h="sm" />
                    <Button type="submit">Criar e adicionar</Button>
                </Stack>
            </form>
        </Modal>
    )
}

const attributeNumberStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: var(--do_border_radius_sm);
    width: 39px;
    height: 40px;
    background: var(--do_color_support_dark_30);
    font-size: var(--do_text_size_lg);
    font-weight: bold;
`

const backdropStyles: CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
}
const itemInfoStyles: CSSProperties = {
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

const categoryToGroupMap: Record<any, string> = {
    tools: 'Ferramentas',
    'mounts-and-vehicles': 'Montarias e Veículos',
    weapon: 'Armas',
    armor: 'Armaduras',
    generalEquipment: 'Equipamentos',
}

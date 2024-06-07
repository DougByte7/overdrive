import {
    Accordion,
    ActionIcon,
    Avatar,
    Badge,
    Box,
    ComboboxItem,
    Divider,
    Grid,
    Group,
    Paper,
    Space,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import { skills } from 'app/character/[characterId]/character-sheet'
import { useAtom } from 'jotai'
import {
    type CSSProperties,
    type Dispatch,
    Fragment,
    type SetStateAction,
    useMemo,
} from 'react'

import abilityScores from '@/assets/dnd/5e/abilityScores'
import classes, { DnD5eClassName } from '@/assets/dnd/5e/classes'
import type {
    DnD5eFeature,
    EquipmentOption,
} from '@/assets/dnd/5e/classes/interfaces'
import equipmentList from '@/assets/dnd/5e/equipment.json'
import races, {
    type DnD5eRaceName,
    type DnD5eTrait,
} from '@/assets/dnd/5e/races'
import spells from '@/assets/dnd/5e/spells.json'
import getModifier from '@/assets/dnd/5e/utils/getModifier'
import storageKeys from '@/constants/storageKeys'
import type { RouterOutputs } from '@/utils/api'

import { Steps } from '../../character-builder'
import { avatarPreviewUrlAton, characterFormAton } from '../../state'

interface ReviewOptionsProps {
    styles: CSSProperties
    setStep: Dispatch<SetStateAction<number>>
}
export default function ReviewOptions({ styles, setStep }: ReviewOptionsProps) {
    const [form] = useAtom(characterFormAton)
    const [avatarPreviewUrl] = useAtom(avatarPreviewUrlAton)

    const normalizedItemList = useMemo(() => {
        return form.items.reduce((acc, item) => {
            const duplicateItemIndex = acc.findIndex(
                (i) => i.item === item.item
            )
            if (duplicateItemIndex !== -1) {
                acc[duplicateItemIndex].amount += item.amount
                return [...acc]
            }

            return [...acc, item]
        }, [] as EquipmentOption[])
    }, [form])

    const selectedRace =
        form.race! in races
            ? races[form.race! as DnD5eRaceName]
            : (JSON.parse(
                  sessionStorage.getItem(storageKeys.charBuilder.race) ?? ''
              ) as RouterOutputs['srdCustoms']['getAllAuthorRaces'][number])

    const selectedClass =
        form.classes[0].name! in classes
            ? classes[form.classes[0].name! as DnD5eClassName]
            : (JSON.parse(
                  sessionStorage.getItem(storageKeys.charBuilder.class) ?? ''
              ) as RouterOutputs['srdCustoms']['getAllAuthorClasses'][number])

    return (
        <Stack style={styles} gap="md">
            <Box>
                <Title size="h4">Só mais uma coisinha!</Title>
                <Text size="sm">
                    Decidiu mudar algo? Sua chance é agora! Uma última olhada
                    antes da aventura.
                </Text>
            </Box>

            <Box>
                <Text size="sm">Perfil e Atributos</Text>
                <Paper withBorder p="md">
                    <Group>
                        <Avatar
                            size={40}
                            alt=""
                            src={
                                avatarPreviewUrl ||
                                `/images/fantasy/races/${form.race}.png`
                            }
                        />
                        <Text className="grow" fw={600}>
                            {form.name || 'Nome'}
                        </Text>
                        <EditButton
                            step={Steps.DESCRIPTION}
                            setStep={setStep}
                        />
                    </Group>
                </Paper>

                <Space h="md" />

                <Paper withBorder p="md">
                    <Group>
                        <Text className="grow" fw={600}>
                            Atributos
                        </Text>
                        <EditButton
                            step={Steps.ATTRIBUTE_METHOD}
                            setStep={setStep}
                        />
                    </Group>
                    <Stack>
                        {Object.values(abilityScores).map((ability) => {
                            const attVal =
                                form[ability.attributeName].base +
                                form[ability.attributeName].bonus
                            const mod = getModifier(attVal)
                            return (
                                <Grid
                                    key={ability.attributeName}
                                    align="center"
                                >
                                    <Grid.Col span={4}>
                                        {ability.name.substring(0, 3)}
                                    </Grid.Col>
                                    <Grid.Col span={8}>
                                        <Group>
                                            <span className="flex justify-center items-center rounded size-10 bg-support-400 text-2xl font-bold">
                                                {attVal}
                                            </span>
                                            <Badge variant="outline">
                                                {mod >= 0 && '+'}
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
                        <Text className="grow" fw={600}>
                            {selectedRace.name}
                        </Text>
                        <EditButton step={Steps.RACE} setStep={setStep} />
                    </Group>

                    <Space h="md" />

                    <Accordion variant="contained">
                        {(selectedRace.traits as DnD5eTrait[]).map((trait) => (
                            <Accordion.Item key={trait.name} value={trait.name}>
                                <Accordion.Control>
                                    <Text fw={600}>{trait.name}</Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {trait.description}
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Paper>
            </Box>

            <Box>
                <Text size="sm">Classe</Text>
                <Paper withBorder p="md">
                    <Group>
                        <Text className="grow" fw={600}>
                            {selectedClass.name}
                        </Text>
                        <EditButton step={Steps.CLASS} setStep={setStep} />
                    </Group>

                    <Space h="md" />

                    <Accordion variant="contained">
                        {(selectedClass.features as DnD5eFeature[]).map(
                            (feature) => (
                                <Accordion.Item
                                    key={feature.name}
                                    value={feature.name}
                                >
                                    <Accordion.Control>
                                        <Text fw={600}>
                                            {feature.name}
                                            <Badge color="gray" size="xs">
                                                {Array.isArray(feature.level)
                                                    ? feature.level.join(', ')
                                                    : feature.level}
                                                º nível
                                            </Badge>
                                        </Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        {feature.description}
                                    </Accordion.Panel>
                                </Accordion.Item>
                            )
                        )}
                    </Accordion>
                </Paper>
            </Box>

            <Box>
                <Paper withBorder p="md">
                    <Group>
                        <Text className="grow" fw={600}>
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
                                        (
                                            (
                                                selectedRace.traits as DnD5eTrait[]
                                            )
                                                .find((t) => t.name === k)
                                                ?.options?.find(
                                                    (o) =>
                                                        (o as ComboboxItem)
                                                            .value === v
                                                ) as ComboboxItem
                                        )?.label
                                    }
                                </Text>
                            )
                        })}
                        {Object.entries(form.features).map(([k, v], i) => {
                            return (
                                <Text key={`${v}${i}`}>
                                    {k}:{' '}
                                    {
                                        (
                                            selectedClass.features as DnD5eFeature[]
                                        )
                                            .find((f) => f.name === k)
                                            ?.options?.find(
                                                (o) => o.value === v
                                            )?.label
                                    }
                                </Text>
                            )
                        })}
                        {form.proficiencies.map((p) => (
                            <Text key={p}>
                                {skills.find((s) => s.value === p)?.label}
                            </Text>
                        ))}
                    </Stack>
                </Paper>
            </Box>

            <Box>
                <Paper withBorder p="md">
                    <Group>
                        <Text className="grow" fw={600}>
                            Itens
                        </Text>
                        <EditButton step={Steps.ITEMS} setStep={setStep} />
                    </Group>

                    <Space h="md" />

                    <Stack>
                        {normalizedItemList.map((item, i) => {
                            return (
                                <Text key={`${item.item}${i}`}>
                                    {item.amount}x{' '}
                                    {equipmentList.find(
                                        (e) => e.index === item.item
                                    )?.name ?? 'ITEM_NOT_FOUND'}
                                </Text>
                            )
                        })}
                    </Stack>
                </Paper>
            </Box>

            {!!form.spells.length && (
                <Box>
                    <Paper withBorder p="md">
                        <Group>
                            <Text className="grow" fw={600}>
                                Magias
                            </Text>
                            <EditButton step={Steps.SPELLS} setStep={setStep} />
                        </Group>

                        <Space h="md" />

                        <Stack>
                            {Array.from(form.spells)
                                .sort((a, b) => {
                                    return a < b ? -1 : a > b ? 1 : 0
                                })
                                .map(
                                    (spellName) => {
                                        return spells.find(
                                            (spell) => spell.name === spellName
                                        )
                                    },
                                    [] as typeof spells
                                )
                                .sort((a, b) => {
                                    const a0 = isNaN(+a!.level!)
                                        ? 0
                                        : +a!.level!
                                    const b0 = isNaN(+b!.level!)
                                        ? 0
                                        : +b!.level!
                                    return a0 - b0
                                })
                                .map((spell, i, arr) => {
                                    const showDivider =
                                        i === 0 ||
                                        spell?.level !== arr[i - 1]?.level

                                    return (
                                        <Fragment key={`${spell}${i}`}>
                                            {showDivider && (
                                                <Divider
                                                    mt="md"
                                                    labelPosition="center"
                                                    label={
                                                        spell?.level ===
                                                        'cantrip'
                                                            ? 'Truques'
                                                            : `${spell?.level}º Nível`
                                                    }
                                                />
                                            )}
                                            <Text>{spell!.name}</Text>
                                        </Fragment>
                                    )
                                })}
                        </Stack>
                    </Paper>
                </Box>
            )}
        </Stack>
    )
}

const EditButton = ({
    step,
    setStep,
}: {
    step: number
    setStep: Dispatch<SetStateAction<number>>
}) => (
    <ActionIcon
        className="rounded-bl-none"
        color="white"
        size="xs"
        variant="outline"
        onClick={() => setStep(step)}
    >
        <IconPencil size=".75rem" />
    </ActionIcon>
)

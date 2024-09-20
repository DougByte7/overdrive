/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
    ActionIcon,
    Badge,
    Box,
    Group,
    MultiSelect,
    NumberInput,
    Paper,
    Space,
    Stack,
    Table,
    Text,
    Title,
    Tooltip,
} from '@mantine/core'
import { IconInfoCircle, IconMinus, IconPlus } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import isNil from 'lodash.isnil'
import {
    type CSSProperties,
    MouseEventHandler,
    useMemo,
    useRef,
    useState,
} from 'react'

import abilityScores from '@/assets/dnd/5e/abilityScores'
import type { Attribute } from '@/assets/dnd/5e/classes/interfaces'
import races from '@/assets/dnd/5e/races'
import getModifier from '@/assets/dnd/5e/utils/getModifier'

import type { AttrMethod, AttributeScore } from '../../interfaces'
import { attrMethodAtom, characterFormAton, pointBuyAtom } from '../../state'

interface AttributeSelectionProps {
    styles: CSSProperties
}
export default function AttributeSelection({
    styles,
}: AttributeSelectionProps) {
    const pointBuyValueCost = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9,
    } as const

    const [form, setForm] = useAtom(characterFormAton)
    const [attrMethod] = useAtom(attrMethodAtom)
    const [selectedRoll, setSelectedRoll] = useState({
        activeIndex: -1,
        value: 0,
    })
    const [availablePoints, setAvailablePoints] = useAtom(pointBuyAtom)
    const attrUsedAt = useRef(new Map<Attribute, number | null>())
    const indexUsedAt = useRef(new Map<number, Attribute | null>())

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

    const stdArray = [15, 14, 13, 12, 10, 8]
    const rolls = useMemo(() => {
        const rollAttribute = () => {
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

        return Array(6).fill(null).map(rollAttribute)
    }, [])
    const attributeValueOptions = attrMethod === 'array' ? stdArray : rolls

    const handleSelectAttrValue =
        (activeIndex: number, value: number) => () => {
            setSelectedRoll({ activeIndex, value })
        }

    const handleSetBonusAttr = (value: number) => (attrNames: string[]) => {
        ;(attrNames as Attribute[]).forEach((attr) => {
            setForm((prev) => ({
                ...prev,
                [attr]: {
                    ...prev[attr],
                    bonus: value,
                },
            }))
        })
    }

    const handleSetAttrValue =
        (
            attr: Attribute,
            index: number
        ): MouseEventHandler<HTMLButtonElement> =>
        (e) => {
            e.stopPropagation()
            if (!selectedRoll.value) return

            if (['diceroll', 'array'].includes(attrMethod)) {
                const usedAtIndex = attrUsedAt.current.get(attr)
                if (!isNil(usedAtIndex)) {
                    indexUsedAt.current.set(usedAtIndex, null)
                }

                const usedAtAttr = indexUsedAt.current.get(index)
                if (!isNil(usedAtAttr)) {
                    attrUsedAt.current.set(usedAtAttr, null)
                }

                attrUsedAt.current.set(attr, index)
                indexUsedAt.current.set(index, attr)
            }

            const newAttrValues = (
                [
                    'strength',
                    'dexterity',
                    'constitution',
                    'intelligence',
                    'wisdom',
                    'charisma',
                ] as Attribute[]
            ).reduce(
                (acc, attribute) => {
                    const i = attrUsedAt.current.get(attribute)
                    const base = !isNil(i) ? attributeValueOptions[i] : 0
                    const bonus: number =
                        form.race! in races
                            ? (races[form.race as keyof typeof races].boost?.[
                                  attribute
                              ] ?? 0)
                            : 0
                    const total = base + bonus

                    return {
                        ...acc,
                        [attribute]: {
                            base,
                            bonus,
                            total,
                        },
                    }
                },
                {} as Record<Attribute, AttributeScore>
            )
            setForm((form) => {
                return { ...form, ...newAttrValues }
            })

            setSelectedRoll({
                activeIndex: -1,
                value: 0,
            })
        }

    const handleIncreaseAttrValue = (attr: Attribute) => () => {
        setForm((form) => {
            const newForm = structuredClone(form)
            newForm[attr].base++
            return newForm
        })

        setAvailablePoints(
            (points) =>
                points +
                pointBuyValueCost[
                    form[attr].base as keyof typeof pointBuyValueCost
                ] -
                pointBuyValueCost[
                    (form[attr].base + 1) as keyof typeof pointBuyValueCost
                ]
        )
    }

    const handleDecreaseAttrValue = (attr: Attribute) => () => {
        setForm((form) => {
            const newForm = structuredClone(form)
            newForm[attr].base--
            return newForm
        })

        setAvailablePoints(
            (points) =>
                points +
                pointBuyValueCost[
                    form[attr].base as keyof typeof pointBuyValueCost
                ] -
                pointBuyValueCost[
                    (form[attr].base - 1) as keyof typeof pointBuyValueCost
                ]
        )
    }

    const handleSetManualAttrValue =
        (attr: Attribute) => (value: number | string) => {
            setForm((form) => {
                const newForm = structuredClone(form)
                newForm[attr].base = +value

                return newForm
            })
        }

    const description: Record<AttrMethod, string> = {
        diceroll:
            'Agora que rolamos todos os dados, vamos dividir em seus atributos.',
        pointbuy: 'Vamos dividir seus pontos em seus atributos.',
        array: 'Vamos dividir os valores em seus atributos.',
        custom: 'Defina seus atributos livremente.',
    }

    return (
        <Stack style={styles} gap="md">
            <Box>
                <Title size="h4">Escolha os seus atributos!</Title>
                <Text size="sm">{description[attrMethod as AttrMethod]}</Text>
                <Space h="xs" />
                <Group gap="xs">
                    {attrMethod === 'pointbuy' && (
                        <Tooltip
                            withArrow
                            position="bottom-start"
                            bg="var(--do_color_primary_light_50)"
                            label={
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Valor</th>
                                            <th>Custo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(pointBuyValueCost).map(
                                            ([score, cost]) => (
                                                <tr key={score}>
                                                    <td>{score}</td>
                                                    <td>{cost}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            }
                        >
                            <Group gap="xs">
                                <IconInfoCircle />
                                <Text size="lg">
                                    Pontos disponíveis:{' '}
                                    <strong>{availablePoints}</strong>
                                </Text>
                            </Group>
                        </Tooltip>
                    )}
                    {['diceroll', 'array'].includes(attrMethod) &&
                        attributeValueOptions.map((attrValue, i) => {
                            return (
                                <button
                                    key={i}
                                    css={[
                                        attributeButtonStyles,
                                        selectedRoll.activeIndex === i
                                            ? attributeButtonActiveStyles
                                            : null,
                                        indexUsedAt.current.get(i)
                                            ? attributeButtonUsedStyles
                                            : null,
                                    ]}
                                    onClick={handleSelectAttrValue(
                                        i,
                                        attrValue
                                    )}
                                >
                                    {attrValue}
                                </button>
                            )
                        })}
                </Group>
            </Box>

            {form.race! in races &&
                races[form.race! as keyof typeof races].boost?.anyAttr && (
                    <MultiSelect
                        data={attributeOptions.filter(
                            (attr) =>
                                !races[form.race! as keyof typeof races]
                                    .boost?.[attr.value]
                        )}
                        label={`Escolha ${races[form.race! as keyof typeof races].boost!.anyAttr!.amount} atributo${
                            races[form.race! as keyof typeof races].boost!
                                .anyAttr!.amount > 1
                                ? 's'
                                : ''
                        } para aumentar em ${races[form.race! as keyof typeof races].boost!.anyAttr!.value}`}
                        maxValues={
                            races[form.race! as keyof typeof races].boost
                                ?.anyAttr?.amount
                        }
                        onChange={handleSetBonusAttr(
                            races[form.race! as keyof typeof races].boost
                                ?.anyAttr?.value ?? 0
                        )}
                    />
                )}

            {Object.values(abilityScores).map((ability) => {
                const abilityTotal =
                    form[ability.attributeName].base +
                    form[ability.attributeName].bonus
                const abilityModifier = getModifier(abilityTotal)

                const AttributeButton = ['diceroll', 'array'].includes(
                    attrMethod
                ) ? (
                    <button
                        css={attributeButtonStyles}
                        onClick={handleSetAttrValue(
                            ability.attributeName,
                            selectedRoll.activeIndex
                        )}
                    >
                        {abilityTotal ?? ''}
                    </button>
                ) : (
                    <NumberInput
                        className="w-11"
                        styles={{ input: { textAlign: 'center' } }}
                        readOnly={attrMethod === 'pointbuy'}
                        value={
                            form[ability.attributeName].base +
                            form[ability.attributeName].bonus
                        }
                        onChange={handleSetManualAttrValue(
                            ability.attributeName
                        )}
                        hideControls
                    />
                )

                return (
                    <Paper
                        key={ability.name}
                        shadow="xs"
                        p="sm"
                        pos="relative"
                        withBorder
                    >
                        <Group gap="xs">
                            {attrMethod === 'pointbuy' && (
                                <ActionIcon
                                    title={`Diminuir ${ability.name}`}
                                    color="brand"
                                    size="sm"
                                    radius="xl"
                                    variant="filled"
                                    disabled={
                                        form[ability.attributeName].base === 8
                                    }
                                    onClick={handleDecreaseAttrValue(
                                        ability.attributeName
                                    )}
                                >
                                    <IconMinus size="1.125rem" />
                                </ActionIcon>
                            )}

                            {!!form[ability.attributeName].bonus ? (
                                <Tooltip
                                    position="top-start"
                                    label={`Base: ${form[ability.attributeName].base} + Bonus: ${
                                        form[ability.attributeName].bonus
                                    }`}
                                >
                                    {AttributeButton}
                                </Tooltip>
                            ) : (
                                AttributeButton
                            )}
                            {attrMethod === 'pointbuy' && (
                                <ActionIcon
                                    title={`Aumentar ${ability.name}`}
                                    color="brand"
                                    size="sm"
                                    radius="xl"
                                    variant="filled"
                                    disabled={
                                        form[ability.attributeName].base ===
                                            15 ||
                                        availablePoints +
                                            pointBuyValueCost[
                                                form[ability.attributeName]
                                                    .base as keyof typeof pointBuyValueCost
                                            ] <
                                            pointBuyValueCost[
                                                (form[ability.attributeName]
                                                    .base +
                                                    1) as keyof typeof pointBuyValueCost
                                            ]
                                    }
                                    onClick={handleIncreaseAttrValue(
                                        ability.attributeName
                                    )}
                                >
                                    <IconPlus size="1.125rem" />
                                </ActionIcon>
                            )}

                            <Text fw={600}>{ability.name} </Text>
                            {!!form[ability.attributeName] && (
                                <Badge
                                    ml="auto"
                                    variant="outline"
                                    color="white"
                                >
                                    {abilityModifier > 0 && '+'}
                                    {abilityModifier}
                                </Badge>
                            )}
                        </Group>
                    </Paper>
                )
            })}
        </Stack>
    )
}

const attributeButtonActiveStyles = css`
    outline: 1px solid var(--do_color_primary_base);
    outline-offset: 2px;
`

const attributeButtonUsedStyles = css`
    opacity: 0.5;
    text-decoration: line-through;
`

const attributeButtonStyles = css`
    cursor: pointer;
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

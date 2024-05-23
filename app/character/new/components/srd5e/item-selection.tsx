import { Box, Fieldset, Radio, Select, Stack, Text, Title } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { type CSSProperties, useEffect, useState } from 'react'

import classes, { type DnD5eClassName } from '@/assets/dnd/5e/classes'
import type { EquipmentOption } from '@/assets/dnd/5e/classes/interfaces'
import equipmentList from '@/assets/dnd/5e/equipment.json'
import storageKeys from '@/constants/storageKeys'
import type { RouterOutputs } from '@/utils/api'

import { characterFormAton, itemSelectionLockAton } from '../../state'

const itemsMapAtom = atom<Record<string, EquipmentOption[]>>({})

interface ItemsSelectionProps {
    styles: CSSProperties
}
export default function ItemsSelection({ styles }: ItemsSelectionProps) {
    const [form, setForm] = useAtom(characterFormAton)
    const [, setItemSelectionLockAton] = useAtom(itemSelectionLockAton)
    const [itemsMap] = useAtom(itemsMapAtom)

    const [equipmentOptions] = useState(
        () =>
            (form.classes[0].name in classes
                ? classes[form.classes[0].name as DnD5eClassName]
                      .equipmentOptions
                : (
                      JSON.parse(
                          sessionStorage.getItem(
                              storageKeys.charBuilder.class
                          ) ?? '{}'
                      ) as RouterOutputs['srdCustoms']['getAllAuthorClasses'][number]
                  ).equipmentOptions) as EquipmentOption[][][]
    )

    // get selected items with lodash.at(Radio.key)
    const [selectedItems, setSelectedItems] = useState<Array<string>>(() =>
        Array(equipmentOptions.length).fill(null)
    )
    const handleSelectItem = (i: number) => (value: any) => {
        setSelectedItems((prev) => {
            prev[i] = value
            return [...prev]
        })
    }

    useEffect(() => {
        const allSettled = selectedItems
            .flatMap((selected) => itemsMap[selected])
            .every((item) => !!item)

        setItemSelectionLockAton(allSettled)
        if (!allSettled) return

        setForm((prev) => {
            return {
                ...prev,
                items: selectedItems
                    .flatMap((selected) => itemsMap[selected])
                    .reduce((acc, item) => {
                        if (!item) return acc

                        const duplicateIndex = acc.findIndex(
                            (equipment) => equipment.item === item.item
                        )
                        if (duplicateIndex >= 0) {
                            const duplicate = acc[duplicateIndex]
                            acc[duplicateIndex] = {
                                ...duplicate,
                                amount: duplicate.amount + 1,
                            }
                        } else {
                            acc.push(item)
                        }

                        return acc
                    }, [] as EquipmentOption[]),
            }
        })
    }, [itemsMap, selectedItems])

    return (
        <Stack style={styles} gap="md">
            <Box>
                <Title size="h4">Escolha seu equipamento</Title>
                <Text size="sm">
                    Marque uma opção de cada caixa, selecione um item específico
                    se necessário
                </Text>
            </Box>

            <Stack gap="md" pb={32} mih="calc(100% - 170px)">
                {equipmentOptions.map((options, i) => {
                    return (
                        <Fieldset key={i}>
                            <Radio.Group
                                value={selectedItems[i]}
                                onChange={handleSelectItem(i)}
                            >
                                <Stack>
                                    {options.map((items, j) => {
                                        const key = `[${i}].[${j}]`
                                        return (
                                            <Radio
                                                key={key}
                                                value={key}
                                                label={items.map(
                                                    (data, k, arr) => {
                                                        return (
                                                            <ItemDisplay
                                                                key={`${i}${j}${k}`}
                                                                mapKey={key}
                                                                index={k}
                                                                size={
                                                                    arr.length
                                                                }
                                                                equipmentOption={
                                                                    data
                                                                }
                                                            />
                                                        )
                                                    }
                                                )}
                                            />
                                        )
                                    })}
                                </Stack>
                            </Radio.Group>
                        </Fieldset>
                    )
                })}
            </Stack>
        </Stack>
    )
}

interface ItemDisplayProps {
    mapKey: string
    index: number
    size: number
    equipmentOption: EquipmentOption
}
function ItemDisplay({
    mapKey,
    index,
    size,
    equipmentOption,
}: ItemDisplayProps) {
    const [, setItemsMap] = useAtom(itemsMapAtom)
    const isCategoryRange = [
        'martial weapon',
        'simple weapon',
        'martial melee',
        'martial ranged',
        'simple melee',
        'simple ranged',
    ].includes(equipmentOption.item.toLowerCase())

    const isTool = [
        "artisan's tools",
        'musical instrument',
        'gaming sets',
        'other tools',
    ].includes(equipmentOption.item.toLowerCase())

    const isGear = [
        'standard gear',
        'holy symbols',
        'ammunition',
        'equipment packs',
        'kits',
        'arcane foci',
        'druidic foci',
    ].includes(equipmentOption.item.toLowerCase())

    const getItemByIndex = (index: string) => {
        return equipmentList.find((e) => e.index === index)
    }

    const getItemsByCategoryRange = (query: string) => {
        return equipmentList.filter((e) => e.category_range?.includes(query))
    }

    const getItemsByToolCategory = (query: string) => {
        return equipmentList.filter((e) => e.tool_category === query)
    }

    const getItemsByGearCategory = (query: string) => {
        return equipmentList.filter((e) => e.gear_category?.index === query)
    }

    const parseData = (list: typeof equipmentList) =>
        list.map((item) => ({
            label:
                item.name +
                (item.damage
                    ? ` - ${item.damage.damage_dice} ${item.damage.damage_type.name}`
                    : ''),
            value: item.index,
        }))

    const handleSelectOption =
        (localIndex: number, amount = 1, isItem = false) =>
        (value: string | null) =>
            setItemsMap((prev) => {
                if (!prev[mapKey]) {
                    const length = isItem ? size : size + amount - 1
                    prev[mapKey] = Array(length).fill(null)
                }

                prev[mapKey][index + localIndex] = {
                    item: value!,
                    amount: isItem ? amount : 1,
                }

                return { ...prev }
            })

    let equipmentOptions: typeof equipmentList = []
    if (isCategoryRange) {
        equipmentOptions = getItemsByCategoryRange(
            equipmentOption.item.split(' ')[0]
        )
    } else if (isTool) {
        equipmentOptions = getItemsByToolCategory(equipmentOption.item)
    } else if (isGear) {
        equipmentOptions = getItemsByGearCategory(equipmentOption.item)
    }

    useEffect(() => {
        if (isCategoryRange || isTool || isGear) return

        handleSelectOption(
            0,
            equipmentOption.amount,
            true
        )(equipmentOption.item)
    }, [])

    return isCategoryRange || isTool || isGear ? (
        <>
            {Array(equipmentOption.amount)
                .fill(0)
                .map((_, i) => (
                    <Select
                        key={equipmentOption.item + i}
                        searchable
                        clearable={false}
                        label={equipmentOption.item}
                        data={parseData(equipmentOptions)}
                        onChange={handleSelectOption(i)}
                    />
                ))}
        </>
    ) : (
        <Text>
            {getItemByIndex(equipmentOption.item)?.name}{' '}
            {equipmentOption.amount}x
        </Text>
    )
}

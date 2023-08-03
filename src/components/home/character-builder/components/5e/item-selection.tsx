import {
  Stack,
  Box,
  Title,
  Text,
  Radio,
  Select,
  Paper,
  type SelectItem,
} from "@mantine/core"
import { useAtom } from "jotai"
import { characterFormAton } from "../../state"
import classes from "@/assets/dnd/5e/classes"
import equipmentList from "@/assets/dnd/5e/equipment.json"
import { type CSSProperties, Fragment, useState, useRef } from "react"
import type {
  EquipmentCategoryList,
  EquipmentGearList,
  EquipmentIndex,
  EquipmentOption,
  EquipmentToolList,
  WithAmount,
} from "@/assets/dnd/5e/classes/interfaces"

interface ItemsSelectionProps {
  styles: CSSProperties
}
export default function ItemsSelection({ styles }: ItemsSelectionProps) {
  const [form, setForm] = useAtom(characterFormAton)
  const [radioValue, setRadioValue] = useState<Record<string, string>>({})
  const [listGroupValue, setListGroupValue] = useState<Record<string, string>>(
    {}
  )
  const selectedItems = useRef<WithAmount<EquipmentIndex>[][]>([])

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

  const mapSelectData = (label: string, value: string, group?: string) => ({
    label,
    value,
    group,
  })

  const getCategoryRangeDataAndLabel = (
    item: WithAmount<EquipmentCategoryList>
  ): [string, SelectItem[]] => {
    return [
      `Selecione 1 arma ${item.category_range.toLowerCase()}`,
      getItemsByCategoryRange(item.category_range).map((e) =>
        mapSelectData(
          `${e.name} - ${e.damage?.damage_dice ?? ""} ${e.properties
            .map((p) => p.name)
            .join(", ")}`,
          JSON.stringify({ index: e.index, amount: 1 }),
          e.category_range
        )
      ),
    ]
  }

  const getToolCategoryDataAndLabel = (
    item: WithAmount<EquipmentToolList>
  ): [string, SelectItem[]] => {
    return [
      "Selecione 1 ferramenta",
      getItemsByToolCategory(item.tool_category).map((e) =>
        mapSelectData(
          e.name,
          JSON.stringify({ index: e.index, amount: 1 }),
          e.tool_category
        )
      ),
    ]
  }

  const getGearCategoryDataAndLabel = (
    item: WithAmount<EquipmentGearList>
  ): [string, SelectItem[]] => {
    const gears = getItemsByGearCategory(item.gear_category)

    return [
      `Selecione 1 ${gears[0]?.gear_category?.name}`,
      gears.map((e) =>
        mapSelectData(e.name, JSON.stringify({ index: e.index, amount: 1 }))
      ),
    ]
  }

  const buildListValue = (
    key: string,
    itemList: WithAmount<
      | EquipmentIndex
      | EquipmentCategoryList
      | EquipmentToolList
      | EquipmentGearList
    >[]
  ): string => {
    return itemList
      .map((item, i) => {
        if ("index" in item) return JSON.stringify(item)

        if (listGroupValue[key + i]) return listGroupValue[key + i]

        return key + i
      })
      .join()
  }

  const handleChangeListGroupValue = (key: string) => (value: string) => {
    setListGroupValue((prev) => ({ ...prev, [key]: value }))
  }

  const buildRadioData = (
    key: string,
    item: EquipmentOption
  ): [string | JSX.Element[], SelectItem[]] => {
    if ("list" in item) {
      return [
        item.list.flatMap((listItem) => {
          let label = ""
          let data: SelectItem[] = []

          if ("index" in listItem) {
            return [
              <>
                {`${listItem.amount}x ${getItemByIndex(listItem.index)?.name} ${
                  "ammo" in listItem ? ` e ${listItem.ammo}x munições ` : ""
                }`}
                <br />
              </>,
            ]
          } else if ("category_range" in listItem) {
            ;[label, data] = getCategoryRangeDataAndLabel(listItem)
          } else if ("tool_category" in listItem) {
            ;[label, data] = getToolCategoryDataAndLabel(listItem)
          } else if ("gear_category" in listItem) {
            ;[label, data] = getGearCategoryDataAndLabel(listItem)
          }

          return new Array(listItem.amount).fill(null).map((_, i) => {
            return (
              <Select
                key={label + i}
                placeholder={label}
                data={data}
                searchable
                nothingFound="Nada encontrado"
                onChange={handleChangeListGroupValue(key + i)}
              />
            )
          })
        }),
        [{ value: buildListValue(key, item.list) }],
      ]
    } else if ("category_range" in item) {
      return getCategoryRangeDataAndLabel(item)
    } else if ("tool_category" in item) {
      return getToolCategoryDataAndLabel(item)
    } else if ("gear_category" in item) {
      return getGearCategoryDataAndLabel(item)
    }

    return [
      `${item.amount}x ${getItemByIndex(item.index)?.name}${
        "ammo" in item ? `, e ${item.ammo}x munições` : ""
      }`,
      [{ value: JSON.stringify(item) }],
    ]
  }

  const handleSelectItem = (group: number) => (value: string) => {
    selectedItems.current[group] = JSON.parse(
      value
    ) as WithAmount<EquipmentIndex>[]
    setForm((prevForm) => {
      return {
        ...prevForm,
        items: selectedItems.current.flat(),
      }
    })
  }

  const getRadioValue = (
    key: string,
    equipment: string | JSX.Element[],
    data: SelectItem[]
  ) => {
    if (radioValue[key]) return radioValue[key]

    const multipleValues = Object.keys(radioValue).filter((v) =>
      v.startsWith(key)
    )
    if (multipleValues.length)
      return Object.entries(radioValue)
        .filter(([k]) => multipleValues.includes(k))
        .map(([_, v]) => v)
        .join()

    if (typeof equipment === "string" && !equipment.startsWith("Selecione"))
      return data[0].value

    if (Array.isArray(equipment)) return data.map((d) => d.value).join()

    return key
  }

  const handleSetRadioValue = (key: string) => (value: string) => {
    setRadioValue((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Stack style={styles} spacing="md">
      <Box>
        <Title size="h4">Escolha seu equipamento</Title>
        <Text size="sm">Escolha seu equipamento</Text>
      </Box>

      <Stack spacing="md" pb={32} mih="calc(100% - 170px)">
        {classes[form.classes[0]].proficiencies.equipmentOptions.map(
          (item, i) => {
            return (
              <Paper key={i} withBorder p="xs">
                <Radio.Group onChange={handleSelectItem(i)}>
                  {item.map((itemData, j) => {
                    const key = `${i}${j}`
                    const [equipmentLabel, data] = buildRadioData(key, itemData)

                    const value = `[${getRadioValue(
                      key,
                      equipmentLabel,
                      data
                    )}]`

                    return (
                      <Fragment key={key}>
                        {j > 0 && <Text>ou</Text>}
                        <Radio
                          styles={{
                            inner: { alignSelf: "center" },
                            labelWrapper: { width: "100%" },
                          }}
                          value={value}
                          disabled={(JSON.parse(value) as any[]).some(
                            (v) => typeof v === "number"
                          )}
                          label={
                            "index" in itemData ? (
                              equipmentLabel
                            ) : (
                              <>
                                {Array.isArray(equipmentLabel) &&
                                  equipmentLabel}
                                {"amount" in itemData &&
                                  new Array(itemData.amount)
                                    .fill(null)
                                    .map((_, k) => {
                                      return (
                                        <Select
                                          key={`${i}${j}${k}`}
                                          placeholder={equipmentLabel as string}
                                          data={data}
                                          searchable
                                          nothingFound="Nada encontrado"
                                          onChange={handleSetRadioValue(
                                            `${i}${j}${k}`
                                          )}
                                        />
                                      )
                                    })}
                              </>
                            )
                          }
                        />
                      </Fragment>
                    )
                  })}
                </Radio.Group>
              </Paper>
            )
          }
        )}
      </Stack>
    </Stack>
  )
}

import abilityScores from "@/assets/dnd/5e/abilityScores"
import races from "@/assets/dnd/5e/races"
import {
  Stack,
  Box,
  Title,
  Space,
  Group,
  Tooltip,
  Table,
  MultiSelect,
  Paper,
  ActionIcon,
  Badge,
  Text,
} from "@mantine/core"
import { IconInfoCircle, IconMinus, IconPlus } from "@tabler/icons-react"
import { attrMethodAtom, characterFormAton, pointBuyAtom } from "../../state"
import { useAtom } from "jotai"
import {
  useState,
  type CSSProperties,
  useMemo,
  useRef,
  MouseEventHandler,
} from "react"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import type { Attribute } from "@/assets/dnd/5e/classes/interfaces"
import type { AttributeScore } from "../../interfaces"
import getModifier from "@/assets/dnd/5e/utils/getModifier"
import isNil from "lodash.isnil"

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
  const attributeValueOptions = attrMethod === "array" ? stdArray : rolls

  const handleSelectAttrValue = (activeIndex: number, value: number) => () => {
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
    (attr: Attribute, index: number): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation()
      if (!selectedRoll.value) return

      if (["diceroll", "array"].includes(attrMethod)) {
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
          "strength",
          "dexterity",
          "constitution",
          "intelligence",
          "wisdom",
          "charisma",
        ] as Attribute[]
      ).reduce((acc, attribute) => {
        const i = attrUsedAt.current.get(attribute)
        const base = !isNil(i) ? attributeValueOptions[i] : 0
        const bonus = form.race ? races[form.race].boost?.[attribute] ?? 0 : 0
        const total = base + bonus

        return {
          ...acc,
          [attribute]: {
            base,
            bonus,
            total,
          },
        }
      }, {} as Record<Attribute, AttributeScore>)
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
      newForm[attr].total++
      return newForm
    })

    setAvailablePoints(
      (points) =>
        points +
        pointBuyValueCost[form[attr].base as keyof typeof pointBuyValueCost] -
        pointBuyValueCost[
          (form[attr].base + 1) as keyof typeof pointBuyValueCost
        ]
    )
  }

  const handleDecreaseAttrValue = (attr: Attribute) => () => {
    setForm((form) => {
      const newForm = structuredClone(form)
      newForm[attr].base--
      newForm[attr].total--
      return newForm
    })

    setAvailablePoints(
      (points) =>
        points +
        pointBuyValueCost[form[attr].base as keyof typeof pointBuyValueCost] -
        pointBuyValueCost[
          (form[attr].base - 1) as keyof typeof pointBuyValueCost
        ]
    )
  }

  return (
    <Stack style={styles} gap="md">
      <Box>
        <Title size="h4">Escolha os seus atributos!</Title>
        <Text size="sm">
          Agora que rolamos todos os dados, vamos dividir em seus atributos.
        </Text>
        <Space h="xs" />
        <Group gap="xs">
          {attrMethod === "pointbuy" ? (
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
                    {Object.entries(pointBuyValueCost).map(([score, cost]) => (
                      <tr key={score}>
                        <td>{score}</td>
                        <td>{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              }
            >
              <Group gap="xs">
                <IconInfoCircle />
                <Text size="lg">
                  Pontos disponíveis: <strong>{availablePoints}</strong>
                </Text>
              </Group>
            </Tooltip>
          ) : (
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
                  onClick={handleSelectAttrValue(i, attrValue)}
                >
                  {attrValue}
                </button>
              )
            })
          )}
        </Group>
      </Box>

      {races[form.race!].boost?.anyAttr && (
        <MultiSelect
          data={attributeOptions}
          label={`Escolha ${races[form.race!].boost!.anyAttr!.amount} atributo${
            races[form.race!].boost!.anyAttr!.amount > 1 ? "s" : ""
          } para aumentar em ${races[form.race!].boost!.anyAttr!.value}`}
          maxValues={races[form.race!].boost?.anyAttr?.amount}
          onChange={handleSetBonusAttr(
            races[form.race!].boost?.anyAttr?.value ?? 0
          )}
        />
      )}

      {Object.values(abilityScores).map((ability) => {
        const abilityModifier = getModifier(form[ability.attributeName].total)

        const AttributeButton = (
          <button
            css={attributeButtonStyles}
            onClick={handleSetAttrValue(
              ability.attributeName,
              selectedRoll.activeIndex
            )}
          >
            {form[ability.attributeName].total ?? ""}
          </button>
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
              {attrMethod === "pointbuy" && (
                <ActionIcon
                  title={`Diminuir ${ability.name}`}
                  color="brand"
                  size="sm"
                  radius="xl"
                  variant="filled"
                  disabled={form[ability.attributeName].base === 8}
                  onClick={handleDecreaseAttrValue(ability.attributeName)}
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
              {attrMethod === "pointbuy" && (
                <ActionIcon
                  title={`Aumentar ${ability.name}`}
                  color="brand"
                  size="sm"
                  radius="xl"
                  variant="filled"
                  disabled={
                    form[ability.attributeName].base === 15 ||
                    availablePoints +
                      pointBuyValueCost[
                        form[ability.attributeName]
                          .base as keyof typeof pointBuyValueCost
                      ] <
                      pointBuyValueCost[
                        (form[ability.attributeName].base +
                          1) as keyof typeof pointBuyValueCost
                      ]
                  }
                  onClick={handleIncreaseAttrValue(ability.attributeName)}
                >
                  <IconPlus size="1.125rem" />
                </ActionIcon>
              )}

              <Text fw={600}>{ability.name} </Text>
              {!!form[ability.attributeName] && (
                <Badge ml="auto" variant="outline">
                  {abilityModifier > 0 && "+"}
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
  background: var(--do_color_primary_light_50);
  font-size: var(--do_text_size_lg);
  font-weight: bold;
`

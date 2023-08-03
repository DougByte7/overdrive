import races from "@/assets/dnd/5e/races"
import { Stack, Box, Title, Text, Select, Code } from "@mantine/core"
import { useAtom } from "jotai"
import { type CSSProperties, type ReactNode, useMemo } from "react"
import { characterFormAton } from "../../state"
import classes, { type Skill } from "@/assets/dnd/5e/classes"

interface FeaturesSelectionProps {
  styles: CSSProperties
}
export default function FeaturesSelection({ styles }: FeaturesSelectionProps) {
  const [form, setForm] = useAtom(characterFormAton)

  const raceTraits = useMemo(() => {
    return races[form.race!].traits.reduce((acc, trait) => {
      if (!trait.options) return acc

      return [
        ...acc,
        <Select
          key={trait.name}
          label={trait.name}
          data={trait.options}
          onChange={(val) =>
            setForm((f) => {
              f.traits[trait.name] = val!
              return { ...f }
            })
          }
        />,
      ]
    }, [] as ReactNode[])
  }, [form.race, setForm])

  const classFeatures = useMemo(() => {
    return classes[form.classes[0]!].features.reduce((acc, feature) => {
      if (!feature.options) return acc

      return [
        ...acc,
        <>
          <Select
            key={feature.name}
            label={feature.name}
            data={feature.options}
            onChange={(val) =>
              setForm((f) => {
                f.features[feature.name] = val!
                return { ...f }
              })
            }
          />
          {form.features[feature.name] && (
            <Code>
              {(feature.description as string[])
                .find((desc) =>
                  desc.startsWith(
                    feature.options!.find(
                      (op) => op.value === form.features[feature.name]
                    )!.label
                  )
                )
                ?.replace(/.+:\s/, "")}
            </Code>
          )}
        </>,
      ]
    }, [] as ReactNode[])
  }, [form.classes, form.features, setForm])

  /**
   * @todo filter proficiencies from background
   */
  const proficiencies = useMemo(() => {
    const { skills } = classes[form.classes[0]].proficiencies
    const options = []
    for (let i = 0; i < skills.amount; i++) {
      options.push(
        <Select
          key={i}
          label="Proficiência em habilidade"
          value={form.proficiencies[i]}
          data={skills.options.filter(
            (op) =>
              form.proficiencies[i] === op.value ||
              !form.proficiencies.includes(op.value)
          )}
          onChange={(val) =>
            setForm((f) => {
              f.proficiencies[i] = val as Skill
              return { ...f }
            })
          }
        />
      )
    }
    return options
  }, [form])

  return (
    <Stack style={styles} spacing="md" mih="calc(100% - 170px)">
      <Box>
        <Title size="h4">Escolha seus aspectos de classe/raça</Title>
        <Text size="sm">Escolha seus aspectos de classe/raça</Text>
      </Box>

      <Stack spacing="md">
        {raceTraits}
        {classFeatures}
        {proficiencies}
      </Stack>
    </Stack>
  )
}

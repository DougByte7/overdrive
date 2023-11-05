import races from "@/assets/dnd/5e/races";
import { Stack, Box, Title, Text, Select, Code } from "@mantine/core";
import { useAtom } from "jotai";
import { type CSSProperties, type ReactNode, useMemo } from "react";
import { characterFormAton } from "../../state";
import classes, { type Skill } from "@/assets/dnd/5e/classes";

interface FeaturesSelectionProps {
  styles: CSSProperties;
}
export default function FeaturesSelection({ styles }: FeaturesSelectionProps) {
  const [form, setForm] = useAtom(characterFormAton);

  const raceTraits = useMemo(() => {
    return races[form.race!].traits.reduce((acc, trait) => {
      if (!trait.options) return acc;

      return [
        ...acc,
        <Select
          key={trait.name}
          label={trait.name}
          data={trait.options}
          onChange={(val) =>
            setForm((f) => {
              f.traits[trait.name] = val!;
              return { ...f };
            })
          }
        />,
      ];
    }, [] as ReactNode[]);
  }, [form]);

  const classFeatures = useMemo(() => {
    return classes[form.classes[0].name!].features.reduce((acc, feature) => {
      if (
        (Array.isArray(feature.level) && !feature.level.includes(1)) ||
        (typeof feature.level === "number" && feature.level > 1) ||
        !feature.options
      )
        return acc;

      return [
        ...acc,
        <>
          <Select
            key={feature.name}
            label={feature.name}
            data={feature.options}
            onChange={(val) =>
              setForm((f) => {
                f.features[feature.name] = val!;
                return { ...f };
              })
            }
          />
          {form.features[feature.name] && (
            <Code>{feature.misc?.[feature.name]}</Code>
          )}
        </>,
      ];
    }, [] as ReactNode[]);
  }, [form]);

  /**
   * @todo filter proficiencies from background
   */
  const proficiencies = useMemo(() => {
    const { skills } = classes[form.classes[0].name].proficiencies;
    const options = [];
    for (let i = 0; i < skills.amount; i++) {
      options.push(
        <Select
          key={i}
          label="Proficiência em habilidade"
          value={form.proficiencies[i]}
          data={skills.options.filter(
            (op) =>
              form.proficiencies[i] === op.value ||
              !form.proficiencies.includes(op.value),
          )}
          onChange={(val) =>
            setForm((f) => {
              f.proficiencies[i] = val as Skill;
              return { ...f };
            })
          }
        />,
      );
    }
    return options;
  }, [form]);

  return (
    <Stack style={styles} gap="md" mih="calc(100% - 170px)">
      <Box>
        <Title size="h4">Escolha seus aspectos de classe/raça</Title>
        <Text size="sm">Escolha seus aspectos de classe/raça</Text>
      </Box>

      <Stack gap="md">
        {raceTraits}
        {classFeatures}
        {proficiencies}
      </Stack>
    </Stack>
  );
}

import { Stack, Box, Title, Radio, Space, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { attrMethodAtom, characterFormAton } from "../../state";
import type { CSSProperties } from "react";
import type { AttrMethod } from "../../interfaces";

interface AttributeMethodProps {
  styles: CSSProperties;
}
export default function AttributeMethod({ styles }: AttributeMethodProps) {
  const [, setForm] = useAtom(characterFormAton);
  const [attrMethod, setAttrMethod] = useAtom(attrMethodAtom);

  const handleSetAttrMethod = (method: string) => {
    setAttrMethod(method as AttrMethod);
    setForm((form) => {
      const baseValue = 8 * +(method === "pointbuy");

      form.strength.base = baseValue;
      form.dexterity.base = baseValue;
      form.constitution.base = baseValue;
      form.intelligence.base = baseValue;
      form.wisdom.base = baseValue;
      form.charisma.base = baseValue;

      return form;
    });
  };

  const options: Array<{
    label: string;
    value: AttrMethod;
    description: string;
  }> = [
    {
      value: "diceroll",
      label: "Rolar os dados",
      description: "Vamos fazer várias rolagens e anotar os valores (4d6kh3).",
    },
    {
      value: "pointbuy",
      label: "Compra de pontos",
      description:
        "Você terá 27 pontos para compar seus atributos como desejar.",
    },
    {
      value: "array",
      label: "Vetor padrão",
      description: "Utilize o vetor padrão [15, 14, 13, 12, 10, 8].",
    },
  ];

  return (
    <Stack style={styles} gap="md">
      <Box>
        <Title size="h4">Como você quer selecionar os atributos?</Title>
        <Text size="sm">
          Pergunte ao mestre da mesa se ele possui alguma preferencia.
        </Text>
      </Box>

      <Radio.Group value={attrMethod} onChange={handleSetAttrMethod}>
        <Stack>
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
            />
          ))}

          <Radio
            value="custom"
            label="Customizado"
            description="Preencha os valores como desejar."
            disabled
          />
        </Stack>
      </Radio.Group>

      <Space h="2rem" />
    </Stack>
  );
}

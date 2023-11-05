/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Stack,
  Box,
  Title,
  Accordion,
  UnstyledButton,
  Group,
  Avatar,
  Paper,
  Text,
} from "@mantine/core";
import races, { DnD5eRaceName } from "@/assets/dnd/5e/races";
import { CSSProperties, MouseEventHandler } from "react";
import { useAtom } from "jotai";
import { characterFormAton } from "../../state";

interface RaceSelectionProps {
  styles: CSSProperties;
}
export default function RaceSelection({ styles }: RaceSelectionProps) {
  const [form, setForm] = useAtom(characterFormAton);

  const handleSelectRace =
    (race: DnD5eRaceName): MouseEventHandler<HTMLButtonElement> =>
    (_) => {
      setForm((form) => {
        form.race = race;

        form.strength.bonus = races[race].boost?.strength ?? 0;
        form.dexterity.bonus = races[race].boost?.dexterity ?? 0;
        form.constitution.bonus = races[race].boost?.constitution ?? 0;
        form.intelligence.bonus = races[race].boost?.intelligence ?? 0;
        form.wisdom.bonus = races[race].boost?.wisdom ?? 0;
        form.charisma.bonus = races[race].boost?.charisma ?? 0;

        return { ...form };
      });
    };

  return (
    <Stack style={styles} gap="md">
      <Box>
        <Title size="h4">Escolha uma raça</Title>
        <Text size="sm">Escolha uma raça</Text>
      </Box>

      <Accordion
        variant="separated"
        radius="md"
        styles={{
          item: {
            background: "none",
            border: "1px solid var(--do_text_color_500)",
          },
          chevron: {
            justifySelf: "end",
            marginLeft: "0.65rem",
            color: "var(--do_color_primary_base)",
          },
        }}
      >
        {Object.entries(races).map(([raceKey, race]) => (
          <Accordion.Item value={race.name} key={race.name} pos="relative">
            <UnstyledButton
              css={css`
                position: absolute;
                top: 16px;
                left: 16px;
                bottom: 16px;
                right: 56px;
              `}
              aria-label={`Selecionar: ${race.name}, ${race.description};`}
              onClick={handleSelectRace(raceKey as DnD5eRaceName)}
            />
            <Accordion.Control
              css={css`
                border-radius: inherit;
                border: 1px solid
                  ${form.race === raceKey
                    ? "var(--do_color_primary_base)"
                    : "transparent"};
              `}
              aria-label="Exibir mais informações"
            >
              <Group>
                <Avatar
                  size={40}
                  alt=""
                  src={`/images/fantasy/races/${raceKey}.png`}
                />
                <span>
                  <Text fw={600}>{race.name}</Text>
                  <Text size="sm">{race.description}</Text>
                </span>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {race.traits.map((trait) => (
                  <Paper
                    key={race.name + trait.name}
                    withBorder
                    p="md"
                    radius="md"
                  >
                    <Group>
                      <Text fw={600}>{trait.name}</Text>
                      <Text>{trait.description}</Text>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
}

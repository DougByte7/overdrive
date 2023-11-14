/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Group,
  ActionIcon,
  Title,
  Tabs,
  Stack,
  Switch,
  Drawer,
  Button,
  TextInput,
  Select,
  RangeSlider,
  Text,
  Box,
  Divider,
} from "@mantine/core";
import { IconChevronLeft, IconFilter, IconSearch } from "@tabler/icons-react";
import monsters from "@/assets/dnd/5e/monsters.json";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { MonsterCard } from "@/components/monsters/monster-card";
import {
  useDebouncedState,
  useDisclosure,
  useLocalStorage,
} from "@mantine/hooks";
import type { DnD5eMonster } from "@/assets/dnd/5e/interfaces";
import { useAtom } from "jotai";
import { selectedMonsterAtom } from "@/components/monsters/state";

const initialFilterState: {
  type: string;
  alignment: string;
  size: [number, number];
  cr: [number, number];
} = {
  type: "any",
  alignment: "any",
  size: [0, 5],
  cr: [0, 27],
};

export default function PageMonsters() {
  const [selectedMonster, setSelectedMonster] = useAtom(selectedMonsterAtom);

  const [showXp, setShowXp] = useLocalStorage({
    key: "monster:showXp",
    defaultValue: false,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const [search, setSearch] = useDebouncedState("", 200);
  const [preFilters, setPreFilters] = useState(initialFilterState);
  const [filters, setFilters] = useState(initialFilterState);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const removeDiacritics = (string: string) =>
    string.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(removeDiacritics(e.currentTarget.value.toLocaleLowerCase()));
  };

  const monsterList = useMemo(() => {
    return filteredMonsters.map((monster) => {
      return <MonsterCard key={monster.index} monster={monster} />;
    });
  }, [filteredMonsters]);

  const getUniqueValuesOf = (
    key: keyof DnD5eMonster,
    sortFn?: (a: any, b: any) => number,
  ): any[] => Array.from(new Set(monsters.map((m) => m[key]).sort(sortFn)));

  const getLabelValue = (value: any, label?: any) => ({
    label: label ?? value,
    value,
  });

  const monsterTypes = useMemo(
    () => [
      { label: "Qualquer", value: "any" },
      ...getUniqueValuesOf("type").map((m) => getLabelValue(m)),
    ],
    [],
  );
  const monsterAlign = useMemo(
    () => [
      { label: "Qualquer", value: "any" },
      ...getUniqueValuesOf("alignment").map((m) => getLabelValue(m)),
    ],
    [],
  );

  const handleClearFilters = () => {
    setPreFilters(initialFilterState);
    setFilters(initialFilterState);
    close();
  };

  const handleFilter = () => {
    setFilters(preFilters);
    close();
  };

  useEffect(() => {
    const filterByType = (monster: DnD5eMonster) => {
      return filters.type === "any" || monster.type === filters.type;
    };

    const filterByAlignment = (monster: DnD5eMonster) => {
      return (
        filters.alignment === "any" || monster.alignment === filters.alignment
      );
    };

    const filterBySize = (monster: DnD5eMonster) => {
      const sizeValue =
        monsterSizes.find((s) => s.label === monster.size)?.value ?? 0;

      return sizeValue >= filters.size[0] && sizeValue <= filters.size[1];
    };

    const filterByCr = (monster: DnD5eMonster) => {
      const crValue =
        monsterCr.find((s) => s.label === monster.challenge_rating)?.value ?? 0;
      return crValue >= filters.cr[0] && crValue <= filters.cr[1];
    };

    setFilteredMonsters(
      monsters.filter(
        (monster) =>
          removeDiacritics(monster.name.toLowerCase()).includes(search) &&
          filterByType(monster) &&
          filterByAlignment(monster) &&
          filterBySize(monster) &&
          filterByCr(monster),
      ),
    );
  }, [search, filters]);

  return (
    <>
      <header>
        <Group p="md">
          <ActionIcon
            size="xl"
            variant="light"
            title="Voltar para página inicial"
            component="a"
            href="/home"
          >
            <IconChevronLeft size="1rem" color="var(--do_color_primary_base)" />
          </ActionIcon>

          <Title css={pageTitleStyles} size="md">
            Monstros
          </Title>
        </Group>
      </header>
      <main>
        <Tabs defaultValue="encounter">
          <Tabs.List>
            <Tabs.Tab value="encounter">Encontros</Tabs.Tab>
            <Tabs.Tab value="all">Todos</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="encounter" p="sm">
            Todo
          </Tabs.Panel>
          <Tabs.Panel value="all" p="sm">
            <Stack>
              <Group justify="space-between">
                <TextInput
                  w="100%"
                  type="search"
                  placeholder="Invocar pelo nome"
                  rightSection={<IconSearch />}
                  onChange={handleSearch}
                />
                <Switch
                  labelPosition="left"
                  label="Exibir:"
                  onLabel="XP"
                  offLabel="CR"
                  checked={showXp}
                  onChange={() => setShowXp(!showXp)}
                />
                <Button
                  leftSection={<IconFilter size={16} />}
                  size="xs"
                  onClick={open}
                >
                  FILTRAR
                </Button>
              </Group>
              {monsterList}
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Drawer opened={opened} onClose={close} title="Filtros">
          <Stack h="calc(100vh - 76px)">
            <Select
              label="Tipo"
              value={preFilters.type}
              data={monsterTypes}
              onChange={(type: string | null) =>
                setPreFilters((prev) => ({ ...prev, type: type as string }))
              }
            />
            <Select
              label="Alinhamento"
              value={preFilters.alignment}
              data={monsterAlign}
              onChange={(alignment: string | null) =>
                setPreFilters((prev) => ({
                  ...prev,
                  alignment: alignment as string,
                }))
              }
            />
            <Box px="sm">
              <Text>Tamanho</Text>
              <RangeSlider
                label={(val) =>
                  monsterSizes.find((mark) => mark.value === val)?.label
                }
                defaultValue={[0, monsterSizes.length - 1]}
                step={1}
                minRange={0}
                max={monsterSizes.length - 1}
                marks={monsterSizes.slice(1, monsterSizes.length - 1)}
                value={preFilters.size}
                onChange={(size) =>
                  setPreFilters((prev) => ({ ...prev, size }))
                }
              />
            </Box>
            <Box px="sm">
              <Text>CR</Text>
              <RangeSlider
                label={(val) =>
                  monsterCr.find((mark) => mark.value === val)?.label
                }
                defaultValue={[0, monsterCr.length - 1]}
                step={1}
                minRange={0}
                max={monsterCr.length - 1}
                marks={[monsterCr[0], monsterCr.at(-1)!]}
                value={preFilters.cr}
                onChange={(cr) => setPreFilters((prev) => ({ ...prev, cr }))}
              />
            </Box>

            <Group justify="start" mt="auto">
              <Button variant="outline" onClick={handleClearFilters}>
                Limpar
              </Button>
              <Button onClick={handleFilter}>Aplicar</Button>
            </Group>
          </Stack>
        </Drawer>

        <Drawer
          position="right"
          opened={!!selectedMonster}
          onClose={() => setSelectedMonster(null)}
          title={selectedMonster?.name}
        >
          <Stack>
            <Stack gap={0}>
              <Group>
                {selectedMonster?.armor_class.map((ac, i) => (
                  <Text key={i}>
                    AC {ac.value} {ac.type}
                  </Text>
                ))}
              </Group>

              <Text>
                HP {selectedMonster?.hit_points} (
                {selectedMonster?.hit_points_roll})
              </Text>

              <Text>
                Velocidade:{" "}
                {Object.entries(selectedMonster?.speed ?? {}).map(
                  ([k, v]) => `${k}: ${v} `,
                )}
              </Text>
            </Stack>

            <Divider />

            <Group gap="xs">
              <Text size="sm">FOR {selectedMonster?.strength}</Text>
              <Text size="sm">DES {selectedMonster?.dexterity}</Text>
              <Text size="sm">CON {selectedMonster?.constitution}</Text>
              <Text size="sm">INT {selectedMonster?.intelligence}</Text>
              <Text size="sm">SAB {selectedMonster?.wisdom}</Text>
              <Text size="sm">CAR {selectedMonster?.charisma}</Text>
            </Group>

            <Divider />

            <Stack gap={0}>
              <Text>Proficiências</Text>
              {selectedMonster?.proficiencies.map((p) => (
                <Text key={p.proficiency.index}>
                  {p.proficiency.name} +{p.value}
                </Text>
              ))}

              <Text>
                Sentidos{" "}
                {selectedMonster?.senses.blindsight &&
                  `Visão as cegas ${selectedMonster?.senses.blindsight}`}
                {selectedMonster?.senses.darkvision &&
                  `Visão no escuro ${selectedMonster?.senses.darkvision}`}
                {selectedMonster?.senses.tremorsense &&
                  `Sentido sísmico ${selectedMonster?.senses.tremorsense}`}
                {selectedMonster?.senses.truesight &&
                  `Visão verdadeira ${selectedMonster?.senses.truesight}`}
              </Text>

              <Text>
                Percepção passiva {selectedMonster?.senses.passive_perception}
              </Text>

              <Text>Idiomas {selectedMonster?.languages}</Text>

              {!!selectedMonster?.condition_immunities.length && (
                <Text>
                  Imune{" "}
                  {selectedMonster?.condition_immunities.map((c) => c.name)}
                </Text>
              )}

              {!!selectedMonster?.damage_immunities.length && (
                <Text>Imune a dano {selectedMonster?.damage_immunities}</Text>
              )}

              {!!selectedMonster?.damage_resistances.length && (
                <Text>Resistente {selectedMonster?.damage_resistances}</Text>
              )}

              {!!selectedMonster?.damage_vulnerabilities.length && (
                <Text>
                  Vulnerável {selectedMonster?.damage_vulnerabilities}
                </Text>
              )}

              <Text>
                CR {selectedMonster?.challenge_rating} ({selectedMonster?.xp}{" "}
                XP)
              </Text>
            </Stack>

            <Divider />

            <Stack>
              {selectedMonster?.special_abilities.map((sp) => (
                <Text key={sp.name}>
                  <strong>{sp.name}.</strong> {sp.desc}
                </Text>
              ))}
            </Stack>

            <Divider label="Ações" />

            <Stack>
              {selectedMonster?.actions.map((a) => (
                <Text key={a.name}>
                  <strong>{a.name}.</strong> {a.desc}
                </Text>
              ))}
            </Stack>

            {!!selectedMonster?.legendary_actions.length && (
              <>
                <Divider label="Ações Lendárias" />

                <Stack>
                  {selectedMonster?.legendary_actions.map((a) => (
                    <Text key={a.name}>
                      <strong>{a.name}.</strong> {a.desc}
                    </Text>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        </Drawer>
      </main>
    </>
  );
}

const pageTitleStyles = css`
  position: absolute;
  left: 50%;
  translate: -50%;
`;

const monsterSizes = [
  {
    label: "Tiny",
    value: 0,
  },
  {
    label: "Small",
    value: 1,
  },
  {
    label: "Medium",
    value: 2,
  },
  {
    label: "Large",
    value: 3,
  },
  {
    label: "Huge",
    value: 4,
  },
  {
    label: "Gargantuan",
    value: 5,
  },
];
const monsterCr = [
  {
    label: 0,
    value: 0,
  },
  {
    label: 0.125,
    value: 1,
  },
  {
    label: 0.25,
    value: 2,
  },
  {
    label: 0.5,
    value: 3,
  },
  {
    label: 1,
    value: 4,
  },
  {
    label: 2,
    value: 5,
  },
  {
    label: 3,
    value: 6,
  },
  {
    label: 4,
    value: 7,
  },
  {
    label: 5,
    value: 8,
  },
  {
    label: 6,
    value: 9,
  },
  {
    label: 7,
    value: 10,
  },
  {
    label: 8,
    value: 11,
  },
  {
    label: 9,
    value: 12,
  },
  {
    label: 10,
    value: 13,
  },
  {
    label: 11,
    value: 14,
  },
  {
    label: 12,
    value: 15,
  },
  {
    label: 13,
    value: 16,
  },
  {
    label: 14,
    value: 17,
  },
  {
    label: 15,
    value: 18,
  },
  {
    label: 16,
    value: 19,
  },
  {
    label: 17,
    value: 20,
  },
  {
    label: 19,
    value: 21,
  },
  {
    label: 20,
    value: 22,
  },
  {
    label: 21,
    value: 23,
  },
  {
    label: 22,
    value: 24,
  },
  {
    label: 23,
    value: 25,
  },
  {
    label: 24,
    value: 26,
  },
  {
    label: 30,
    value: 27,
  },
];

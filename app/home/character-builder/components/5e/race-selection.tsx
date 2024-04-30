import {
    Accordion,
    ActionIcon,
    Avatar,
    Box,
    Button,
    Divider,
    Fieldset,
    Group,
    Paper,
    Select,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import { CSSProperties, Fragment, MouseEventHandler } from 'react'

import races, { DnD5eRace, DnD5eRaceName } from '@/assets/dnd/5e/races'
import storageKeys from '@/constants/storageKeys'

import { characterFormAton } from '../../state'

interface RaceSelectionProps {
    styles: CSSProperties
}
export default function RaceSelection({ styles }: RaceSelectionProps) {
    const [form, setForm] = useAtom(characterFormAton)

    const handleSelectRace =
        (race: DnD5eRaceName): MouseEventHandler<HTMLButtonElement> =>
        (_) => {
            setForm((form) => {
                form.race = race
                if (race === 'custom') return { ...form }

                form.strength.bonus = races[race].boost?.strength ?? 0
                form.dexterity.bonus = races[race].boost?.dexterity ?? 0
                form.constitution.bonus = races[race].boost?.constitution ?? 0
                form.intelligence.bonus = races[race].boost?.intelligence ?? 0
                form.wisdom.bonus = races[race].boost?.wisdom ?? 0
                form.charisma.bonus = races[race].boost?.charisma ?? 0

                return { ...form }
            })
        }

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
                        background: 'none',
                        border: '1px solid var(--do_border_color)',
                    },
                    chevron: {
                        justifySelf: 'end',
                        marginLeft: '0.65rem',
                        color: 'var(--do_color_primary_base)',
                    },
                }}
            >
                {Object.entries(races).map(([raceKey, race]) => (
                    <Accordion.Item
                        styles={{
                            item: {
                                background: 'none',
                                border:
                                    form.race === raceKey
                                        ? '2px solid var(--do_color_primary_base)'
                                        : '1px solid var(--do_text_color_500)',
                            },
                        }}
                        value={race.name}
                        key={race.name}
                        pos="relative"
                    >
                        <UnstyledButton
                            className="absolute top-4 left-4 bottom-4 right-14"
                            aria-label={`Selecionar: ${race.name}, ${race.description};`}
                            onClick={handleSelectRace(raceKey as DnD5eRaceName)}
                        />
                        <Accordion.Control aria-label="Exibir mais informações">
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

                <Accordion.Item
                    styles={{
                        item: {
                            background: 'none',
                            border:
                                form.race === 'custom'
                                    ? '2px solid var(--do_color_primary_base)'
                                    : '1px solid var(--do_text_color_500)',
                        },
                    }}
                    value={'custom'}
                    pos="relative"
                >
                    <Accordion.Control aria-label="Exibir mais informações">
                        <Group>
                            <Avatar size={40} alt="" />
                            <span>
                                <Text fw={600}>Customizado</Text>
                                <Text size="sm">Crie uma raça customizada</Text>
                            </span>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <FormCustomRace />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}

function FormCustomRace() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
            speed: {
                land: 9,
                climb: 0,
                fly: 0,
                swimming: 0,
                burrow: 0,
            },
            type: 'humanoid',
            size: 'medium',
            darkvision: 0,
            traits: [
                {
                    name: '',
                    description: '',
                    key: randomId(),
                },
            ],
        },
    })

    const save = (race: DnD5eRace) => {
        const races = JSON.parse(
            localStorage.getItem(storageKeys.srd5Races) ?? '[]'
        ) as DnD5eRace[]

        localStorage.setItem(
            storageKeys.srd5Races,
            JSON.stringify([...races, race])
        )
    }

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack gap="md">
                <TextInput
                    withAsterisk
                    label="Nome"
                    autoComplete="off"
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label="Descrição"
                    {...form.getInputProps('description')}
                />
                <Fieldset legend="Velocidade (Metros)">
                    <TextInput
                        label="Terrestre"
                        defaultValue={9}
                        type="number"
                        {...form.getInputProps('speed.land')}
                    />
                    <TextInput
                        label="Escalada"
                        defaultValue={0}
                        type="number"
                        {...form.getInputProps('speed.climb')}
                    />
                    <TextInput
                        label="Voo"
                        defaultValue={0}
                        type="number"
                        {...form.getInputProps('speed.fly')}
                    />
                    <TextInput
                        label="Natação"
                        defaultValue={0}
                        type="number"
                        {...form.getInputProps('speed.swimming')}
                    />
                    <TextInput
                        label="Escavação"
                        defaultValue={0}
                        type="number"
                        {...form.getInputProps('speed.burrow')}
                    />
                </Fieldset>
                <Select
                    allowDeselect={false}
                    label="Tipo"
                    defaultValue={'humanoid'}
                    data={[
                        'humanoid',
                        'monstrosity',
                        'dragon',
                        'giant',
                        'undead',
                        'aberration',
                        'fiend',
                        'celestial',
                        'fey',
                        'elemental',
                        'construct',
                        'ooze',
                        'plant',
                        'beast',
                    ]}
                    {...form.getInputProps('type')}
                />
                <Select
                    allowDeselect={false}
                    label="Tamanho"
                    defaultValue={'medium'}
                    data={[
                        'tiny',
                        'small',
                        'medium',
                        'large',
                        'huge',
                        'gargantuan',
                    ]}
                    {...form.getInputProps('size')}
                />
                <TextInput
                    label="Visão no escuro (Metros)"
                    type="number"
                    defaultValue={0}
                    {...form.getInputProps('darkvision')}
                />

                <Fieldset legend="Habilidades adicionais">
                    {form.values.traits.map((_, i) => (
                        <Fragment key={form.key(`traits${i}.key`)}>
                            {i !== 0 && <Divider color="gray" my="md" />}
                            <TextInput
                                label="Nome"
                                {...form.getInputProps(`traits.${i}.name`)}
                            />
                            <TextInput
                                label="Descrição"
                                {...form.getInputProps(
                                    `traits.${i}.description`
                                )}
                            />
                        </Fragment>
                    ))}
                    <ActionIcon
                        className="mt-2 float-end"
                        size="lg"
                        radius="xl"
                        title="Adicionar Habilidade"
                        onClick={() => {
                            form.insertListItem('traits', {
                                name: '',
                                description: '',
                                key: randomId(),
                            })
                        }}
                    >
                        <IconPlus />
                    </ActionIcon>
                </Fieldset>

                <Button type="submit">Salvar e Selecionar</Button>
            </Stack>
        </form>
    )
}

'use client'

import { useAuth } from '@clerk/nextjs'
import {
    Accordion,
    ActionIcon,
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    Fieldset,
    Group,
    Loader,
    NumberInput,
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
import { randomId, useMediaQuery } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconPlus } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import { valibotResolver } from 'mantine-form-valibot-resolver'
import Link from 'next/link'
import { type CSSProperties, Fragment } from 'react'

import races, { type DnD5eRaceName } from '@/assets/dnd/5e/races'
import { CustomRaceSchema } from '@/assets/dnd/5e/utils/schemas/race'
import { type RouterOutputs, api } from '@/utils/api'

import { characterFormAton } from '../../state'

interface RaceSelectionProps {
    styles: CSSProperties
}
export default function RaceSelection({ styles }: RaceSelectionProps) {
    const [form, setForm] = useAtom(characterFormAton)
    const matches = useMediaQuery('(min-width: 900px)')
    const { data: customRaces, isLoading } =
        api.srdCustoms.getAllAuthorRaces.useQuery()

    const handleSelectRace =
        (race: DnD5eRaceName) =>
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            setForm((form) => {
                form.race = race

                form.strength.bonus =
                    races[race as DnD5eRaceName].boost?.strength ?? 0
                form.dexterity.bonus =
                    races[race as DnD5eRaceName].boost?.dexterity ?? 0
                form.constitution.bonus =
                    races[race as DnD5eRaceName].boost?.constitution ?? 0
                form.intelligence.bonus =
                    races[race as DnD5eRaceName].boost?.intelligence ?? 0
                form.wisdom.bonus =
                    races[race as DnD5eRaceName].boost?.wisdom ?? 0
                form.charisma.bonus =
                    races[race as DnD5eRaceName].boost?.charisma ?? 0

                return { ...form }
            })
        }

    const handleSelectCustomRace =
        (race: RouterOutputs['srdCustoms']['getAllAuthorRaces'][number]) =>
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            setForm((prev) => {
                prev.race = race.id
                return { ...prev }
            })
            sessionStorage.setItem('charbuilder:race', JSON.stringify(race))
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
                        value={race.name}
                        key={race.name}
                        styles={{
                            item: {
                                background: 'none',
                                border:
                                    form.race === raceKey
                                        ? '2px solid var(--do_color_primary_base)'
                                        : '1px solid var(--do_text_color_500)',
                            },
                        }}
                    >
                        <Accordion.Control aria-label="Exibir mais informações">
                            <UnstyledButton
                                className="w-full"
                                aria-label={`Selecionar: ${race.name}, ${race.description};`}
                                onClick={handleSelectRace(
                                    raceKey as DnD5eRaceName
                                )}
                            >
                                <Group>
                                    <Avatar
                                        size={40}
                                        alt=""
                                        src={`/images/fantasy/races/${raceKey}.png`}
                                    />
                                    <span>
                                        <Text fw={600}>{race.name}</Text>
                                        <Text size="sm">
                                            {race.description}
                                        </Text>
                                    </span>
                                </Group>
                            </UnstyledButton>
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

                {isLoading ? (
                    <Group className="my-4" justify="center">
                        <Loader /> Carregando suas customizações
                    </Group>
                ) : (
                    customRaces?.map((race) => {
                        return (
                            <Accordion.Item
                                value={race.name}
                                key={race.id}
                                styles={{
                                    item: {
                                        background: 'none',
                                        border:
                                            form.race === race.id
                                                ? '2px solid var(--do_color_primary_base)'
                                                : '1px solid var(--do_text_color_500)',
                                    },
                                }}
                            >
                                <Accordion.Control aria-label="Exibir mais informações">
                                    <UnstyledButton
                                        className="w-full"
                                        aria-label={`Selecionar: ${race.name};`}
                                        onClick={handleSelectCustomRace(race)}
                                    >
                                        <Group>
                                            <Avatar size={40} alt="" />
                                            <span>
                                                <Text fw={600}>
                                                    {race.name}
                                                </Text>
                                                <Text size="sm">
                                                    {race.description}
                                                </Text>
                                            </span>
                                        </Group>
                                    </UnstyledButton>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack gap="md">
                                        {race.traits.map((trait) => (
                                            <Paper
                                                key={
                                                    race.name +
                                                    (trait as any).name
                                                }
                                                withBorder
                                                p="md"
                                                radius="md"
                                            >
                                                <Group>
                                                    <Text fw={600}>
                                                        {(trait as any).name}
                                                    </Text>
                                                    <Text>
                                                        {
                                                            (trait as any)
                                                                .description
                                                        }
                                                    </Text>
                                                </Group>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                        )
                    })
                )}
            </Accordion>
            <Button
                className=" mb-4"
                leftSection={<IconPlus />}
                variant="subtle"
                onClick={() =>
                    modals.open({
                        fullScreen: !matches,
                        title: 'Nova Raça',
                        children: <FormCustomRace />,
                    })
                }
            >
                <Text size="sm">Criar uma raça customizada</Text>
            </Button>
        </Stack>
    )
}

function FormCustomRace() {
    const { isSignedIn } = useAuth()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            public: false,
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
        validate: valibotResolver(CustomRaceSchema),
    })

    const queryUtils = api.useUtils()
    const { isLoading, mutate } = api.srdCustoms.createRace.useMutation({
        onSuccess() {
            queryUtils.invalidate(undefined, {
                queryKey: ['srdCustoms.getAllAuthorRaces'],
            })
            modals.closeAll()
        },
    })

    const save = (race: typeof form.values) => {
        const createAndSelectCustomRace = () => {
            mutate(race)
        }

        if (isSignedIn) {
            if (race.public) {
                modals.openConfirmModal({
                    centered: true,
                    title: 'Confirmação de publicação de material homebrew',
                    children: (
                        <>
                            <Text>
                                Ao clicar em ‘Confirmar’, você está atestando
                                que o material fornecido não viola os direitos
                                autorais de terceiros nem nossos{' '}
                                <Link
                                    className="underline text-brand-200"
                                    href="/tos"
                                    target="_blank"
                                >
                                    termos de uso
                                </Link>
                                .
                            </Text>
                            <Text>
                                Esteja ciente de que qualquer infração pode
                                resultar na remoção permanente do material e na
                                suspensão da sua conta.
                            </Text>
                        </>
                    ),
                    labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
                    onConfirm: createAndSelectCustomRace,
                })
            } else {
                createAndSelectCustomRace()
            }
        }
    }

    return (
        <form onSubmit={form.onSubmit(save)}>
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
                    <NumberInput
                        label="Terrestre"
                        defaultValue={9}
                        step={1}
                        {...form.getInputProps('speed.land')}
                    />
                    <NumberInput
                        label="Escalada"
                        defaultValue={0}
                        step={1}
                        {...form.getInputProps('speed.climb')}
                    />
                    <NumberInput
                        label="Voo"
                        defaultValue={0}
                        step={1}
                        {...form.getInputProps('speed.fly')}
                    />
                    <NumberInput
                        label="Natação"
                        defaultValue={0}
                        step={1}
                        {...form.getInputProps('speed.swimming')}
                    />
                    <NumberInput
                        label="Escavação"
                        defaultValue={0}
                        step={1}
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
                <NumberInput
                    label="Visão no escuro (Metros)"
                    step={1}
                    defaultValue={0}
                    {...form.getInputProps('darkvision')}
                />

                <Fieldset legend="Habilidades adicionais">
                    {form.values.traits.map((_, i) => (
                        <Fragment key={form.key(`traits.${i}.key`)}>
                            {i !== 0 && <Divider color="gray" my="md" />}
                            <TextInput
                                withAsterisk
                                label="Nome"
                                {...form.getInputProps(`traits.${i}.name`)}
                            />
                            <Textarea
                                autosize
                                withAsterisk
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

                <Checkbox
                    disabled={!isSignedIn}
                    label="Tornar publico na galeria homebrew"
                    description="É estritamente proibido a publicação de material oficial"
                    {...form.getInputProps('public', { type: 'checkbox' })}
                />
                <Button loading={isLoading} type="submit">
                    Salvar
                </Button>
            </Stack>
        </form>
    )
}

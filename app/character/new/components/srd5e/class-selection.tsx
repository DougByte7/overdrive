import { useAuth } from '@clerk/nextjs'
import {
    Accordion,
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Checkbox,
    Divider,
    Fieldset,
    Group,
    List,
    Loader,
    MultiSelect,
    NumberInput,
    Paper,
    Select,
    Space,
    Stack,
    TagsInput,
    Text,
    TextInput,
    Textarea,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMediaQuery } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import { valibotResolver } from 'mantine-form-valibot-resolver'
import Link from 'next/link'
import { type CSSProperties, Fragment } from 'react'
import { safeParse } from 'valibot'

import classes, {
    type DnD5eClassName,
    type Skill,
} from '@/assets/dnd/5e/classes'
import equipment from '@/assets/dnd/5e/equipment.json'
import { CustomClassSchema } from '@/assets/dnd/5e/utils/schemas/classes'
import storageKeys from '@/constants/storageKeys'
import { type RouterOutputs, api } from '@/utils/api'

import { characterFormAton } from '../../state'

interface ClassSelectionProps {
    styles: CSSProperties
}
export default function ClassSelection({ styles }: ClassSelectionProps) {
    const [form, setForm] = useAtom(characterFormAton)
    const matches = useMediaQuery('(min-width: 900px)')
    const { data: customClasses, isLoading } =
        api.srdCustoms.getAllAuthorClasses.useQuery()

    const handleSelectClass =
        (className: DnD5eClassName) =>
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()

            const initialHp = classes[className].hp.average

            setForm((form) => ({
                ...form,
                hp: initialHp,
                currentHp: initialHp,
                classes: [{ name: className, level: 1 }],
            }))
        }

    const handleSelectCustomClass =
        (
            customClass: RouterOutputs['srdCustoms']['getAllAuthorClasses'][number]
        ) =>
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()

            if (!customClass.hp) {
                notifications.show({
                    color: 'red',
                    title: 'Erro: A classe selecionada não possui HP',
                    message:
                        'Edite a classe na sua página de homebrews e tente novamente',
                    autoClose: 30_000,
                })
                return
            }

            const averageHp = +customClass.hp.replace('d', '') + 1

            sessionStorage.setItem(
                storageKeys.charBuilder.class,
                JSON.stringify(customClass)
            )

            setForm((form) => ({
                ...form,
                hp: averageHp,
                currentHp: averageHp,
                classes: [{ name: customClass.id, level: 1 }],
            }))
        }

    return (
        <Stack style={styles} gap="md">
            <Box>
                <Title size="h4">Escolha uma classe</Title>
                <Text size="sm">Escolha uma classe</Text>
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
                {Object.entries(classes).map(([classKey, classData]) => (
                    <Accordion.Item
                        key={classData.name}
                        value={classData.name}
                        styles={{
                            item: {
                                background: 'none',
                                border:
                                    form.classes[0]?.name === classKey
                                        ? '2px solid var(--do_color_primary_base)'
                                        : '1px solid var(--do_text_color_500)',
                            },
                        }}
                    >
                        <Accordion.Control aria-label="Exibir mais informações">
                            <UnstyledButton
                                className="w-full"
                                aria-label={`Selecionar: ${classData.name}, ${classData.description};`}
                                onClick={handleSelectClass(
                                    classKey as DnD5eClassName
                                )}
                            >
                                <Group gap="xs">
                                    <Avatar
                                        size={40}
                                        alt=""
                                        src={`/icons/${classKey}.png`}
                                    />
                                    <div className="w-[78%]">
                                        <Text fw={600}>{classData.name}</Text>
                                        <Text size="11px">
                                            {classData.description}
                                        </Text>
                                    </div>
                                </Group>
                            </UnstyledButton>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack gap="md">
                                {classData.features.map((trait) => (
                                    <Paper
                                        key={classData.name + trait.name}
                                        withBorder
                                        p="md"
                                        radius="md"
                                    >
                                        <Group>
                                            <Text fw={600}>
                                                {trait.name}{' '}
                                                <Badge color="gray" size="xs">
                                                    {Array.isArray(trait.level)
                                                        ? trait.level.join(', ')
                                                        : trait.level}
                                                    º nível
                                                </Badge>
                                            </Text>
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
                    customClasses?.map((customClass) => {
                        return (
                            <Accordion.Item
                                styles={{
                                    item: {
                                        background: 'none',
                                        border:
                                            form.classes[0]?.name ===
                                            customClass.id
                                                ? '2px solid var(--do_color_primary_base)'
                                                : '1px solid var(--do_text_color_500)',
                                    },
                                }}
                                value={customClass.name}
                                key={customClass.id}
                            >
                                <Accordion.Control aria-label="Exibir mais informações">
                                    <UnstyledButton
                                        className="w-full"
                                        aria-label={`Selecionar: ${customClass.name};`}
                                        onClick={handleSelectCustomClass(
                                            customClass
                                        )}
                                    >
                                        <Group wrap="nowrap">
                                            <Avatar size={40} alt="" />
                                            <span>
                                                <Text fw={600}>
                                                    {customClass.name}
                                                </Text>
                                                <Text size="sm" lineClamp={1}>
                                                    {customClass.description}
                                                </Text>
                                            </span>
                                        </Group>
                                    </UnstyledButton>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack gap="md">
                                        {customClass.features.map((feature) => (
                                            <Paper
                                                key={
                                                    customClass.name +
                                                    (feature as any).name
                                                }
                                                withBorder
                                                p="md"
                                                radius="md"
                                            >
                                                <Group>
                                                    <Text fw={600}>
                                                        {(feature as any).name}
                                                    </Text>
                                                    <Text>
                                                        {
                                                            (feature as any)
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
                        size: 'xl',
                        title: 'Nova Classe',
                        children: <FormCustomClass />,
                    })
                }
            >
                <Text size="sm">Criar uma classe customizada</Text>
            </Button>
        </Stack>
    )
}

function FormCustomClass() {
    const { isSignedIn } = useAuth()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            public: false,
            name: '',
            description: '',
            hp: '',
            cantripKnown: [],
            spellsKnown: [],
            spellsSlots: [],
            proficiencies: {
                armor: [],
                weapon: [],
                savingThrows: [],
                skills: [],
                skillAmount: 2,
                tools: [],
            },
            equipmentOptions: [[[{ item: '', amount: 1 }]]],
            features: [
                {
                    name: '',
                    description: '',
                    level: [],
                },
            ],
        },
        validate: valibotResolver(CustomClassSchema),
    })

    const queryUtils = api.useUtils()
    const { isLoading, mutate } = api.srdCustoms.createClass.useMutation({
        onSuccess() {
            queryUtils.invalidate(undefined, {
                queryKey: ['srdCustoms.getAllAuthorClasses'],
            })
            modals.closeAll()
        },
    })

    const save = (customClass: typeof form.values) => {
        const createAndSelectCustomRace = () => {
            mutate(customClass)
        }

        if (isSignedIn) {
            if (customClass.public) {
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

    const anyEquipmentFromGroup = {
        group: 'Qualquer de uma categoria',
        items: ['Simple Weapon', 'Martial Weapon'],
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
                    autosize
                    label="Descrição"
                    {...form.getInputProps('description')}
                />

                <Select
                    label="HP"
                    data={['d4', 'd6', 'd8', 'd10', 'd12', 'd20']}
                    {...form.getInputProps('hp')}
                />

                <Fieldset legend="Proficiências">
                    <Checkbox.Group
                        label="Armadura"
                        {...form.getInputProps('proficiencies.armor')}
                    >
                        <Group>
                            <Checkbox value="light" label="Leve" />
                            <Checkbox value="medium" label="Média" />
                            <Checkbox value="heavy" label="Pesada" />
                            <Checkbox value="shield" label="Escudo" />
                        </Group>
                    </Checkbox.Group>
                    <MultiSelect
                        label="Armas"
                        data={[
                            'simple',
                            'martial',
                            'lightCrossbow',
                            'handCrossbow',
                            'rapier',
                            'shortSword',
                            'longSword',
                            'dagger',
                            'dart',
                            'quarterstaff',
                        ]}
                        {...form.getInputProps('proficiencies.weapon')}
                    />
                    <MultiSelect
                        label="Testes de resistência"
                        data={[
                            'strength',
                            'dexterity',
                            'constitution',
                            'intelligence',
                            'wisdom',
                            'charisma',
                        ]}
                        {...form.getInputProps('proficiencies.savingThrows')}
                    />

                    <Group>
                        <MultiSelect
                            className="grow"
                            label="Habilidades"
                            data={skills}
                            {...form.getInputProps('proficiencies.skills')}
                        />
                        <NumberInput
                            className="w-28"
                            label="Quantidade"
                            {...form.getInputProps('proficiencies.skillAmount')}
                        />
                    </Group>
                </Fieldset>

                <Fieldset legend="Opções de equipamento">
                    <Space h="lg" />
                    <List type="ordered" listStyleType="numeric">
                        {form.values.equipmentOptions.map((group, i) => {
                            return (
                                <List.Item
                                    key={form.key(`equipmentOptions.${i}`)}
                                    styles={{
                                        itemWrapper: { width: '100%' },
                                        itemLabel: {
                                            display: 'block',
                                            width: '100%',
                                        },
                                    }}
                                >
                                    <List
                                        withPadding
                                        type="ordered"
                                        listStyleType="lower-alpha"
                                    >
                                        {group.map((option, j) => (
                                            <List.Item
                                                key={form.key(
                                                    `equipmentOptions.${i}.${j}`
                                                )}
                                                styles={{
                                                    itemWrapper: {
                                                        width: '100%',
                                                    },
                                                    itemLabel: {
                                                        display: 'block',
                                                        width: '100%',
                                                    },
                                                }}
                                            >
                                                {option.map((_, k, arr) => (
                                                    <Group
                                                        key={form.key(
                                                            `equipmentOptions.${i}.${j}.${k}`
                                                        )}
                                                        align="end"
                                                    >
                                                        <Select
                                                            searchable
                                                            className="w-3/5"
                                                            label="Item"
                                                            data={equipment.reduce(
                                                                (acc, e) => {
                                                                    const groupIndex =
                                                                        acc.findIndex(
                                                                            (
                                                                                list
                                                                            ) =>
                                                                                list.group ===
                                                                                e
                                                                                    .equipment_category
                                                                                    .name
                                                                        )

                                                                    acc[
                                                                        groupIndex
                                                                    ].items.push(
                                                                        {
                                                                            label: e.name,
                                                                            value: e.index,
                                                                        }
                                                                    )
                                                                    return acc
                                                                },
                                                                [
                                                                    anyEquipmentFromGroup,
                                                                    {
                                                                        group: 'Weapon',
                                                                        items: [],
                                                                    },
                                                                    {
                                                                        group: 'Armor',
                                                                        items: [],
                                                                    },
                                                                    {
                                                                        group: 'Adventuring Gear',
                                                                        items: [],
                                                                    },
                                                                    {
                                                                        group: 'Tools',
                                                                        items: [],
                                                                    },
                                                                    {
                                                                        group: 'Mounts and Vehicles',
                                                                        items: [],
                                                                    },
                                                                ] as Array<{
                                                                    group: string
                                                                    items: Array<
                                                                        | {
                                                                              label: string
                                                                              value: string
                                                                          }
                                                                        | string
                                                                    >
                                                                }>
                                                            )}
                                                            {...form.getInputProps(
                                                                `equipmentOptions.${i}.${j}.${k}.item`
                                                            )}
                                                        />
                                                        <NumberInput
                                                            className="w-28"
                                                            label="Quantidade"
                                                            {...form.getInputProps(
                                                                `equipmentOptions.${i}.${j}.${k}.amount`
                                                            )}
                                                        />
                                                        {arr.length - 1 ===
                                                            k && (
                                                            <ActionIcon
                                                                size="lg"
                                                                radius="xl"
                                                                title="Adicionar item"
                                                                onClick={() => {
                                                                    form.insertListItem(
                                                                        `equipmentOptions.${i}.${j}`,
                                                                        {
                                                                            item: '',
                                                                            amount: 1,
                                                                        }
                                                                    )
                                                                }}
                                                            >
                                                                <IconPlus />
                                                            </ActionIcon>
                                                        )}
                                                    </Group>
                                                ))}
                                            </List.Item>
                                        ))}
                                        <Button
                                            className="mt-4"
                                            leftSection={<IconPlus />}
                                            variant="subtle"
                                            onClick={() => {
                                                form.insertListItem(
                                                    `equipmentOptions.${i}`,
                                                    [
                                                        {
                                                            item: '',
                                                            amount: 1,
                                                        },
                                                    ]
                                                )
                                            }}
                                        >
                                            Adicionar opção ao grupo
                                        </Button>
                                    </List>
                                </List.Item>
                            )
                        })}
                    </List>
                    <Button
                        className="mt-4"
                        leftSection={<IconPlus />}
                        onClick={() => {
                            form.insertListItem('equipmentOptions', [
                                [
                                    {
                                        item: '',
                                        amount: 1,
                                    },
                                ],
                            ])
                        }}
                    >
                        Adicionar grupo
                    </Button>
                </Fieldset>

                <Fieldset legend="Habilidades de Classe">
                    {form.values.features.map((_, i) => {
                        const manualValidationBecauseUseFormDoesNotShowErrorMessageForTagsForSomeReason =
                            safeParse(
                                CustomClassSchema.entries.features.item.entries
                                    .level,
                                form.getInputProps(`features.${i}.level`)
                                    .defaultValue
                            )

                        return (
                            <Fragment key={form.key(`features.${i}`)}>
                                {i !== 0 && <Divider color="gray" my="md" />}
                                <TextInput
                                    key={form.key(`features.${i}.name`)}
                                    withAsterisk
                                    label="Nome"
                                    {...form.getInputProps(
                                        `features.${i}.name`
                                    )}
                                />
                                <Textarea
                                    key={form.key(`features.${i}.description`)}
                                    autosize
                                    withAsterisk
                                    label="Descrição"
                                    {...form.getInputProps(
                                        `features.${i}.description`
                                    )}
                                />
                                <TagsInput
                                    key={form.key(`features.${i}.level`)}
                                    label="Nível ou Níveis"
                                    type="number"
                                    {...form.getInputProps(
                                        `features.${i}.level`
                                    )}
                                    error={
                                        !form.isTouched(
                                            `features.${i}.level`
                                        ) ||
                                        manualValidationBecauseUseFormDoesNotShowErrorMessageForTagsForSomeReason.success
                                            ? null
                                            : manualValidationBecauseUseFormDoesNotShowErrorMessageForTagsForSomeReason
                                                  .issues[0].message
                                    }
                                />
                            </Fragment>
                        )
                    })}
                    <ActionIcon
                        className="mt-2 float-end"
                        size="lg"
                        radius="xl"
                        title="Adicionar Habilidade"
                        onClick={() => {
                            form.insertListItem('features', {
                                name: '',
                                description: '',
                                level: [],
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

const skills: LabelValue<Skill>[] = [
    { label: 'Acrobacia (Acrobatics)', value: 'acrobatics' },
    { label: 'Lidar com animais (Animal Handling)', value: 'animal_handling' },
    { label: 'Arcana', value: 'arcana' },
    { label: 'Atletismo (Athletics)', value: 'athletics' },
    { label: 'Enganação (Deception)', value: 'deception' },
    { label: 'Historia (History)', value: 'history' },
    { label: 'Intuição (Insight)', value: 'insight' },
    { label: 'Intimidação (Intimidation)', value: 'intimidation' },
    { label: 'Investigação (Investigation)', value: 'investigation' },
    { label: 'Medicina (Medicine)', value: 'medicine' },
    { label: 'Natureza (Nature)', value: 'nature' },
    { label: 'Percepção (Perception)', value: 'perception' },
    { label: 'Persuasão (Persuasion)', value: 'persuasion' },
    { label: 'Religião (Religion)', value: 'religion' },
    { label: 'Furtividade (Stealth)', value: 'stealth' },
    { label: 'Sobrevivência (Survival)', value: 'survival' },
]

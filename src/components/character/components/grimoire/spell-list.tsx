import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    Group,
    Radio,
    Select,
    Space,
    Stack,
    Text,
    TextInput,
    UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconBox,
    IconCircleDashed,
    IconCone2,
    IconFilter,
    IconHemisphere,
    IconLineDashed,
    IconPlus,
    IconSearch,
    IconSphere,
    IconWand,
} from '@tabler/icons-react'
import { useAtom } from 'jotai'
import { ChangeEventHandler, Fragment, useState } from 'react'

import { DnD5eSpell } from '@/assets/dnd/5e/interfaces'
import ToggleTip from '@/components/shared/toggle-tip'
import { removeDiacritics } from '@/utils/removeDiacritics'

import { selectedSpellAton } from '../../state'
import type { AddOrRemoveSpellEvent } from './interfaces'

interface SpellCardProps {
    spell: DnD5eSpell
    isEdit: boolean
    onAddOrRemoveSpell?: AddOrRemoveSpellEvent
}
function SpellCard({ spell, isEdit, onAddOrRemoveSpell }: SpellCardProps) {
    const [, setSelectedSpell] = useAtom(selectedSpellAton)
    const [isMarked, { toggle }] = useDisclosure(spell.marked)
    const schoolColorMap = {
        necromancy: 'teal',
        transmutation: 'green',
        abjuration: 'blue',
        illusion: 'violet',
        conjuration: 'orange',
        enchantment: 'yellow',
        evocation: 'red',
        divination: 'gray',
    }

    const handleAddRemove = (spellName: string) => () => {
        if (isEdit) toggle()
        onAddOrRemoveSpell?.(spellName)
    }

    return (
        <Box pos="relative">
            <ActionIcon
                style={{
                    position: 'absolute',
                    top: 40,
                    right: 12,
                    transition: 'rotate 150ms',
                    rotate: isMarked ? '45deg' : '0deg',
                }}
                size="xl"
                radius="xl"
                variant={isEdit ? 'outline' : 'filled'}
                color={isEdit ? (isMarked ? 'red' : 'gray') : 'brand'}
                title={
                    isEdit ? (isMarked ? 'Remover' : 'Adicionar') : 'Conjurar'
                }
                onClick={handleAddRemove(spell.name)}
            >
                {isEdit ? (
                    <IconPlus size="1.125rem" />
                ) : (
                    <IconWand size="1.125rem" />
                )}
            </ActionIcon>

            <UnstyledButton w="100%" onClick={() => setSelectedSpell(spell)}>
                <Group
                    style={{
                        'border-radius': 'var(--do_border_radius_md)',
                        border: '1px solid var(--do_border_color)',
                        padding: '8px',
                        height: '100px',
                    }}
                    gap={0}
                    justify="space-between"
                >
                    <Text
                        className="grow-0 shrink basis-full"
                        fw="bold"
                        ta="center"
                    >
                        {spell.name}
                    </Text>

                    <Stack align="stretch" gap={4}>
                        {spell.casting_time.startsWith('1 reaction') ? (
                            <ToggleTip label={spell.casting_time}>
                                <Badge
                                    style={{
                                        width: '100%',
                                        color: '#868e96',
                                        'border-color': 'currentColor',
                                    }}
                                    size="xs"
                                    variant="dot"
                                >
                                    1 Reaction
                                </Badge>
                            </ToggleTip>
                        ) : (
                            <Badge size="xs" color="gray" variant="outline">
                                {spell.casting_time}
                            </Badge>
                        )}

                        <Badge
                            size="xs"
                            color={
                                schoolColorMap[
                                    spell.school as keyof typeof schoolColorMap
                                ]
                            }
                            variant="outline"
                        >
                            {spell.school}
                        </Badge>

                        <Badge size="xs" variant="outline">
                            {spell.range
                                .replace(/-?f(ee|oo)t(-radius)?/, 'ft ')
                                .replace(
                                    /\(|(cone|hemisphere|line|cube|sphere|radius)|\)/g,
                                    ''
                                )
                                .replace('-mile', ' mi')}
                            {spell.range.includes('cone') && (
                                <IconCone2
                                    className="ml-[2px] mb-[-3px]"
                                    size={12}
                                />
                            )}
                            {spell.range.includes('hemisphere') && (
                                <IconHemisphere
                                    className="ml-[2px] mb-[-3px] rotate-180"
                                    size={12}
                                />
                            )}
                            {spell.range.includes('line') && (
                                <IconLineDashed
                                    className="ml-[2px] mb-[-3px]"
                                    size={12}
                                />
                            )}
                            {spell.range.includes('cube') && (
                                <IconBox
                                    className="ml-[2px] mb-[-3px]"
                                    size={12}
                                />
                            )}
                            {spell.range.includes(' sphere') && (
                                <IconSphere
                                    className="ml-[2px] mb-[-3px]"
                                    size={12}
                                />
                            )}
                            {spell.range.includes(' radius') && (
                                <IconCircleDashed
                                    className="ml-[2px] mb-[-3px]"
                                    size={12}
                                />
                            )}
                        </Badge>
                    </Stack>

                    <Group gap={4}>
                        {spell.duration.startsWith('Concentration') && (
                            <Badge
                                color="gray"
                                title="Concentraçào"
                                size="xs"
                                variant="outline"
                            >
                                C
                            </Badge>
                        )}
                        {spell.ritual && (
                            <Badge
                                title="Ritual"
                                color="gray"
                                size="xs"
                                variant="outline"
                            >
                                R
                            </Badge>
                        )}
                        {spell.components.verbal && (
                            <Badge
                                title="Verbal"
                                color="gray"
                                size="xs"
                                variant="outline"
                            >
                                V
                            </Badge>
                        )}
                        {spell.components.somatic && (
                            <Badge
                                title="Somático"
                                color="gray"
                                size="xs"
                                variant="outline"
                            >
                                S
                            </Badge>
                        )}
                        {spell.components.material && (
                            <ToggleTip
                                label={spell.components.materials_needed!}
                            >
                                <Badge
                                    style={{
                                        color: '#868e96',
                                        'border-color': 'currentColor',
                                    }}
                                    title="Material"
                                    size="xs"
                                    variant="dot"
                                    mb={'8px'}
                                >
                                    M
                                </Badge>
                            </ToggleTip>
                        )}
                    </Group>

                    <Space w={48} />
                </Group>
            </UnstyledButton>
        </Box>
    )
}

interface SpellListProps {
    spells: DnD5eSpell[]
    isEdit?: boolean
    onAddOrRemoveSpell?: AddOrRemoveSpellEvent
}
export default function SpellList({
    spells,
    isEdit,
    onAddOrRemoveSpell,
}: SpellListProps) {
    const initialFilter: {
        className: string
        level: string
        school: string
        concentration: string
        ritual: string
        verbal: boolean | 'any'
        somatic: boolean | 'any'
        material: boolean | 'any'
        castingTime: string
        range: string
        duration: string
    } = {
        className: 'any',
        level: 'any',
        school: 'any',
        concentration: 'any',
        ritual: 'any',
        verbal: 'any',
        somatic: 'any',
        material: 'any',
        castingTime: 'any',
        range: 'any',
        duration: 'any',
    }
    const [search, setSearch] = useState('')
    const [filters, setFilter] = useState(initialFilter)
    const [preFilters, setPreFilter] = useState(filters)
    const [opened, { open, close }] = useDisclosure(false)

    const isAny = (filter: any) => filter === 'any'
    const filteredSpells = spells.filter((s) => {
        return (
            s.name.toLowerCase().includes(search) &&
            (isAny(filters.className) ||
                s.classes.includes(filters.className)) &&
            (isAny(filters.level) || s.level == filters.level) &&
            (isAny(filters.school) || s.school === filters.school) &&
            (isAny(filters.castingTime) ||
                s.casting_time.toLowerCase().includes(filters.castingTime)) &&
            (isAny(filters.range) ||
                s.range.toLowerCase().includes(filters.range)) &&
            (isAny(filters.duration) ||
                s.duration.toLowerCase().includes(filters.duration)) &&
            (isAny(filters.ritual) || s.ritual.toString() === filters.ritual) &&
            (isAny(filters.concentration) ||
                (filters.concentration === 'true'
                    ? s.duration.toLowerCase().includes('concentration')
                    : !s.duration.toLowerCase().includes('concentration'))) &&
            (isAny(filters.verbal) || s.components.verbal === filters.verbal) &&
            (isAny(filters.somatic) ||
                s.components.somatic === filters.somatic) &&
            (isAny(filters.material) ||
                s.components.material === filters.material)
        )
    })

    const filterValues = {
        classNames: [
            { label: 'Classe', value: 'any' },
            { label: 'Bardo', value: 'bard' },
            { label: 'Bruxo', value: 'warlock' },
            { label: 'Clérigo', value: 'cleric' },
            { label: 'Druida', value: 'druid' },
            { label: 'Feiticeiro', value: 'sorcerer' },
            { label: 'Mago', value: 'wizard' },
            { label: 'Paladino', value: 'paladin' },
            { label: 'Patrulheiro', value: 'ranger' },
        ],
        levels: [
            { label: 'Nível', value: 'any' },
            { label: 'Truque', value: 'cantrip' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
        ],
        schools: [
            { label: 'Todas', value: 'any' },
            { label: 'Necromancia', value: 'necromancy' },
            { label: 'Transmutação', value: 'transmutation' },
            { label: 'Abjuração', value: 'abjuration' },
            { label: 'Ilusão', value: 'illusion' },
            { label: 'Conjuração', value: 'conjuration' },
            { label: 'Encantamento', value: 'enchantment' },
            { label: 'Evocação', value: 'evocation' },
            { label: 'Adivinhação', value: 'divination' },
        ],
        castingTime: [
            { label: 'Todas', value: 'any' },
            { label: 'Ação Bonus', value: 'bonus' },
            { label: 'Ação', value: '1 action' },
            { label: 'Reação', value: 'reaction' },
            { label: 'Minuto', value: 'minute' },
            { label: 'Hora', value: 'hour' },
        ],
        range: [
            { label: 'Todos', value: 'any' },
            { label: 'Nenhum', value: 'none' },
            { label: 'Pessoal', value: 'self' },
            { label: 'Visão', value: 'sight' },
            { label: 'Especial', value: 'special' },
            { label: 'Alvo', value: 'target' },
            { label: 'Toque', value: 'touch' },
            { label: 'Sem limite', value: 'unlimited' },
        ],
        duration: [
            { label: 'Todas', value: 'any' },
            { label: 'Rodada', value: 'round' },
            { label: 'Minuto', value: 'minute' },
            { label: 'Hora', value: 'hour' },
            { label: 'Dia', value: 'day' },
            { label: 'Instantânea', value: 'instantaneous' },
            { label: 'Especial', value: 'special' },
            { label: 'Dissipada', value: 'dispelled' },
            { label: 'Acionada', value: 'triggered' },
        ],
    }

    const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(removeDiacritics(e.currentTarget.value.toLocaleLowerCase()))
    }

    const handleFilterClass = (className: string) => {
        setFilter((prev) => ({ ...prev, className }))
    }

    const handleFilterLevel = (level: string) => {
        setFilter((prev) => ({ ...prev, level }))
    }

    const handleClearFilters = () => {
        setSearch('')
        setFilter(initialFilter)
        setPreFilter(initialFilter)
        close()
    }

    const handleFilter = () => {
        setFilter(preFilters)
        close()
    }

    return (
        <>
            <Stack gap="xs">
                <Group justify="space-between" gap="sm">
                    <TextInput
                        w="100%"
                        type="search"
                        placeholder="Que arcano deseja revelar?"
                        rightSection={<IconSearch />}
                        onChange={handleSearch}
                    />
                    <Select
                        w="30%"
                        value={filters.className}
                        data={filterValues.classNames}
                        onChange={handleFilterClass as any}
                    />
                    <Select
                        w="30%"
                        value={filters.level}
                        data={filterValues.levels}
                        onChange={handleFilterLevel as any}
                    />
                    <Button
                        leftSection={<IconFilter size={16} />}
                        size="xs"
                        onClick={open}
                    >
                        FILTRAR
                    </Button>
                </Group>

                {filteredSpells.map((spell, i, arr) => {
                    const prev = arr.at(i - 1)
                    const shouldShowLabel =
                        i === 0 || prev?.level !== spell?.level
                    const levelLabel =
                        spell?.level === 'cantrip'
                            ? 'Truques'
                            : `Nível ${spell?.level}`

                    return (
                        spell && (
                            <Fragment key={spell.name}>
                                {shouldShowLabel && (
                                    <Divider
                                        className="sticky top-0 bg-[var(--mantine-color-body)] leading-[2.5] z-[3]"
                                        label={
                                            <Text fw="bold" size="lg">
                                                {levelLabel}
                                            </Text>
                                        }
                                        labelPosition="center"
                                        size="sm"
                                    />
                                )}
                                <SpellCard
                                    spell={spell}
                                    isEdit={!!isEdit}
                                    onAddOrRemoveSpell={onAddOrRemoveSpell}
                                />
                            </Fragment>
                        )
                    )
                })}
            </Stack>
            <Drawer opened={opened} onClose={close} title="Filtros">
                <Stack h="calc(100vh - 76px)">
                    <Select
                        label="Escola"
                        value={preFilters.school}
                        data={filterValues.schools}
                        onChange={
                            ((school: string) =>
                                setPreFilter((prev) => ({
                                    ...prev,
                                    school,
                                }))) as any
                        }
                    />
                    <Select
                        label="Tempo de conjuração"
                        value={preFilters.castingTime}
                        data={filterValues.castingTime}
                        onChange={
                            ((castingTime: string) =>
                                setPreFilter((prev) => ({
                                    ...prev,
                                    castingTime,
                                }))) as any
                        }
                    />
                    <Select
                        label="Alcance"
                        value={preFilters.range}
                        data={filterValues.range}
                        onChange={
                            ((range: string) =>
                                setPreFilter((prev) => ({
                                    ...prev,
                                    range,
                                }))) as any
                        }
                    />
                    <Select
                        label="Duração"
                        value={preFilters.duration}
                        data={filterValues.duration}
                        onChange={
                            ((duration: string) =>
                                setPreFilter((prev) => ({
                                    ...prev,
                                    duration,
                                }))) as any
                        }
                    />

                    <Radio.Group
                        defaultValue="any"
                        label="Ritual"
                        onChange={(ritual: string) =>
                            setPreFilter((prev) => ({ ...prev, ritual }))
                        }
                    >
                        <Group>
                            <Radio value="true" label="Sim" />
                            <Radio value="false" label="Não" />
                            <Radio value="any" label="Todos" />
                        </Group>
                    </Radio.Group>

                    <Radio.Group
                        defaultValue={preFilters.concentration}
                        label="Concentração"
                        onChange={(concentration: string) =>
                            setPreFilter((prev) => ({ ...prev, concentration }))
                        }
                    >
                        <Group>
                            <Radio value="true" label="Sim" />
                            <Radio value="false" label="Não" />
                            <Radio value="any" label="Todos" />
                        </Group>
                    </Radio.Group>

                    <Checkbox.Group
                        defaultValue={[
                            'any',
                            'verbal',
                            'somatic',
                            'material',
                        ].filter((v) => {
                            switch (v) {
                                case 'any':
                                    return preFilters.verbal === 'any'
                                case 'verbal':
                                    return preFilters.verbal !== false
                                case 'somatic':
                                    return preFilters.somatic !== false
                                case 'material':
                                    return preFilters.material !== false
                                default:
                                    return true
                            }
                        })}
                        label="Componentes"
                        onChange={(components: string[]) => {
                            setPreFilter((prev) => {
                                const hasAny = components.includes('any')
                                const verbal = hasAny
                                    ? 'any'
                                    : components.includes('verbal')
                                const somatic = hasAny
                                    ? 'any'
                                    : components.includes('somatic')
                                const material = hasAny
                                    ? 'any'
                                    : components.includes('material')

                                return { ...prev, verbal, somatic, material }
                            })
                        }}
                    >
                        <Group>
                            <Checkbox value="any" label="Qualquer" />
                            <Checkbox
                                value="verbal"
                                label="Verbal"
                                disabled={preFilters.verbal === 'any'}
                            />
                            <Checkbox
                                value="somatic"
                                label="Somático"
                                disabled={preFilters.somatic === 'any'}
                            />
                            <Checkbox
                                value="material"
                                label="Material"
                                disabled={preFilters.material === 'any'}
                            />
                        </Group>
                    </Checkbox.Group>

                    <Group justify="end" mt="auto">
                        <Button variant="outline" onClick={handleClearFilters}>
                            Limpar
                        </Button>
                        <Button onClick={handleFilter}>Aplicar</Button>
                    </Group>
                </Stack>
            </Drawer>
        </>
    )
}

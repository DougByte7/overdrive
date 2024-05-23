import { Box, Code, Divider, Select, Stack, Text, Title } from '@mantine/core'
import { skills } from 'app/character/[characterId]'
import { useAtom } from 'jotai'
import { type CSSProperties, Fragment, type ReactNode, useMemo } from 'react'

import classes, {
    type DnD5eClassName,
    type Skill,
} from '@/assets/dnd/5e/classes'
import races, { type DnD5eRaceName } from '@/assets/dnd/5e/races'
import storageKeys from '@/constants/storageKeys'
import type { RouterOutputs } from '@/utils/api'

import { characterFormAton } from '../../state'

interface FeaturesSelectionProps {
    styles: CSSProperties
}
export default function FeaturesSelection({ styles }: FeaturesSelectionProps) {
    const [form, setForm] = useAtom(characterFormAton)

    const raceTraits = useMemo(() => {
        if (!(form.race! in races)) return []

        return races[form.race! as DnD5eRaceName].traits.reduce(
            (acc, trait) => {
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
            },
            [] as ReactNode[]
        )
    }, [form])

    const classFeatures = useMemo(() => {
        if (!(form.classes[0].name! in classes)) return []

        return classes[form.classes[0].name! as DnD5eClassName].features.reduce(
            (acc, feature) => {
                if (
                    (Array.isArray(feature.level) &&
                        !feature.level.includes(1)) ||
                    (typeof feature.level === 'number' && feature.level > 1) ||
                    !feature.options
                )
                    return acc

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
                            <Code>{feature.misc?.[feature.name]}</Code>
                        )}
                    </>,
                ]
            },
            [] as ReactNode[]
        )
    }, [form])

    /**
     * @todo filter proficiencies from background
     */
    const proficiencies = useMemo(() => {
        const homebrewClass = JSON.parse(
            sessionStorage.getItem(storageKeys.charBuilder.class) ?? '{}'
        ) as RouterOutputs['srdCustoms']['getAllAuthorClasses'][number]

        const isSrdClass = form.classes[0].name! in classes
        const { skills: skillOptions } = isSrdClass
            ? classes[form.classes[0].name! as DnD5eClassName].proficiencies
            : {
                  skills: {
                      options: homebrewClass.proficiencies_skills.map(
                          (skill) => ({
                              ...skills.find((s) => s.value === skill)!,
                          })
                      ),
                      amount: homebrewClass.proficiencies_skillAmount,
                  },
              }

        const options = []
        for (let i = 0; i < skillOptions.amount; i++) {
            options.push(
                <Select
                    key={i}
                    label="Proficiência em habilidade"
                    withAsterisk
                    value={form.proficiencies[i]}
                    data={skillOptions.options.filter(
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

        if (!isSrdClass) {
            options.push(
                <Fragment key="class-proficiencies">
                    <Divider label="Habilidades de classe (se houver)" />
                    <Select
                        label="Proficiência em habilidade"
                        value={
                            form.proficiencies[
                                homebrewClass.proficiencies_skillAmount
                            ]
                        }
                        data={skills.filter(
                            (op) =>
                                form.proficiencies[
                                    homebrewClass.proficiencies_skillAmount
                                ] === op.value ||
                                !form.proficiencies.includes(op.value)
                        )}
                        onChange={(val) =>
                            setForm((f) => {
                                f.proficiencies[
                                    homebrewClass.proficiencies_skillAmount
                                ] = val as Skill
                                return { ...f }
                            })
                        }
                    />
                    <Select
                        label="Proficiência em habilidade"
                        value={
                            form.proficiencies[
                                homebrewClass.proficiencies_skillAmount + 1
                            ]
                        }
                        data={skills.filter(
                            (op) =>
                                form.proficiencies[
                                    homebrewClass.proficiencies_skillAmount + 1
                                ] === op.value ||
                                !form.proficiencies.includes(op.value)
                        )}
                        onChange={(val) =>
                            setForm((f) => {
                                f.proficiencies[
                                    homebrewClass.proficiencies_skillAmount + 1
                                ] = val as Skill
                                return { ...f }
                            })
                        }
                    />
                </Fragment>
            )
        }

        return options
    }, [form])

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
    )
}

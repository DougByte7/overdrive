'use client'

import {
    BackgroundImage,
    Box,
    Button,
    Card,
    Paper,
    Space,
    Stack,
    Text,
    Title,
    Transition,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { captureException } from '@sentry/nextjs'
import { useAtom } from 'jotai'
import { nanoid } from 'lib/nanoid'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import classes, { DnD5eClassName } from '@/assets/dnd/5e/classes'
import races, { type DnD5eRaceName } from '@/assets/dnd/5e/races'
import type { CharacterSheetProps } from '@/assets/dnd/5e/utils/CharacterSheet'
import getModifier from '@/assets/dnd/5e/utils/getModifier'
import TopBar from '@/components/top-bar'
import storageKeys from '@/constants/storageKeys'
import useCharacter from '@/hooks/useCharacter'
import { useIsSignedOutNotification } from '@/hooks/useIsSignedNotification'
import { type RouterOutputs, api } from '@/utils/api'

import AttributeMethod from './components/srd5e/attribute-method'
import AttributeSelection from './components/srd5e/attribute-selection'
import CharacterDescription from './components/srd5e/character-description'
import ClassSelection from './components/srd5e/class-selection'
import FeaturesSelection from './components/srd5e/features-selection'
import ItemsSelection from './components/srd5e/item-selection'
import RaceSelection from './components/srd5e/race-selection'
import ReviewOptions from './components/srd5e/review-options'
import SpellSelection from './components/srd5e/spell-selection'
import {
    attrMethodAtom,
    avatarPreviewUrlAton,
    characterFormAton,
    itemSelectionLockAton,
    pointBuyAtom,
} from './state'

export enum Steps {
    UNSET,
    DESCRIPTION,
    RACE,
    CLASS,
    ATTRIBUTE_METHOD,
    ATTRIBUTE,
    FEATURES,
    ITEMS,
    SPELLS,
    REVIEW,
    FINAL,
    CLOSE,
}

export default function CharacterBuilder() {
    useIsSignedOutNotification()
    const [form, setForm] = useAtom(characterFormAton)
    const [attrMethod] = useAtom(attrMethodAtom)
    const [availablePoints] = useAtom(pointBuyAtom)
    const [avatarPreviewUrl] = useAtom(avatarPreviewUrlAton)
    const [itemSelectionLock] = useAtom(itemSelectionLockAton)
    const router = useRouter()
    const { addCharacter } = useCharacter()

    const [step, setStep] = useState(Steps.DESCRIPTION)
    const id = useMemo(nanoid, [])

    // Prefetch custom data
    api.srdCustoms.getAllAuthorRaces.useQuery()
    api.srdCustoms.getAllAuthorClasses.useQuery()

    const { spellsKnown, cantripKnown } =
        classes[form.classes[0]?.name as DnD5eClassName] ?? {}
    const hasCantrips = cantripKnown?.length
    const hasSpells =
        !!spellsKnown &&
        ((typeof spellsKnown === 'number' && spellsKnown !== Infinity) ||
            (Array.isArray(spellsKnown) && !!spellsKnown[0]))
    const shouldSkipSpellStep = !(hasCantrips || hasSpells)

    const resetForm = () => setForm(characterFormAton.init)

    const handledPrev = () => {
        const prevStep = step - 1
        if (prevStep === Steps.UNSET) {
            resetForm()
        }

        if (step === Steps.REVIEW && shouldSkipSpellStep) {
            setStep((step) => step - 2)
        } else {
            setStep(prevStep)
        }
    }
    const handleNext = () => {
        if (step + 1 === Steps.FINAL) {
            try {
                const newCharacter: CharacterSheetProps<'name'> = {
                    ...form,
                    id,
                    hp:
                        form.hp +
                        getModifier(
                            form.constitution.base + form.constitution.bonus
                        ),
                    currentHp:
                        form.currentHp +
                        getModifier(
                            form.constitution.base + form.constitution.bonus
                        ),
                    tempHp: 0,
                    initiative: getModifier(
                        form.dexterity.base + form.dexterity.bonus
                    ),
                    picture:
                        avatarPreviewUrl ||
                        `/images/fantasy/races/${form.race}.png`,
                    race: form.race!,
                    classes: form.classes,
                    strength: form.strength.base + form.strength.bonus,
                    dexterity: form.dexterity.base + form.dexterity.bonus,
                    constitution:
                        form.constitution.base + form.constitution.bonus,
                    intelligence:
                        form.intelligence.base + form.intelligence.bonus,
                    wisdom: form.wisdom.base + form.wisdom.bonus,
                    charisma: form.charisma.base + form.charisma.bonus,
                }
                console.log(newCharacter)

                addCharacter(newCharacter)
            } catch (e) {
                captureException(e)
                notifications.show({
                    title: 'Erro',
                    message:
                        'Não foi possível salvar seu personagem! Tente novamente.',
                })
            }
        }

        if (step + 1 === Steps.CLOSE) {
            /**
             * @todo Go to character sheet on linked adventure or empty board
             */
            resetForm()

            router.push(`/character/${id}`)
        }

        if (step === Steps.ITEMS && shouldSkipSpellStep) {
            setStep((step) => step + 2)
        } else {
            setStep((step) => step + 1)
        }
    }

    const isInvalidFormStep = () => {
        switch (step) {
            case Steps.DESCRIPTION: {
                return !form.name
            }
            case Steps.RACE: {
                return !form.race
            }
            case Steps.CLASS: {
                return !form.classes.length
            }
            case Steps.ATTRIBUTE_METHOD: {
                return !attrMethod
            }
            case Steps.ATTRIBUTE: {
                return (
                    (attrMethod !== 'pointbuy' &&
                        !(
                            form.strength.base &&
                            form.dexterity.base &&
                            form.constitution.base &&
                            form.intelligence.base &&
                            form.wisdom.base &&
                            form.charisma.base
                        )) ||
                    (attrMethod === 'pointbuy' && availablePoints > 0)
                )
            }
            case Steps.ITEMS: {
                return !itemSelectionLock
            }
            default: {
                return false
            }
        }
    }

    const selectedRace =
        form.race! in races
            ? races[form.race as DnD5eRaceName]
            : (JSON.parse(
                  sessionStorage.getItem(storageKeys.charBuilder.race) ?? ''
              ) as RouterOutputs['srdCustoms']['getAllAuthorRaces'][number])
    const selectedClass =
        form.classes[0]?.name in classes
            ? classes[form.classes[0]?.name as DnD5eClassName]
            : (JSON.parse(
                  sessionStorage.getItem(storageKeys.charBuilder.class) ?? ''
              ) as RouterOutputs['srdCustoms']['getAllAuthorClasses'][number])

    return (
        <>
            <TopBar title="Novo Personagem" />
            <Paper className="m-6 mx-auto max-w-[550px] md:p-4" shadow="xs">
                <Stack className="w-full p-4" gap="md">
                    <Transition
                        mounted={step === Steps.DESCRIPTION}
                        transition="fade"
                    >
                        {(styles) => <CharacterDescription styles={styles} />}
                    </Transition>

                    <Transition mounted={step === Steps.RACE} transition="fade">
                        {(styles) => <RaceSelection styles={styles} />}
                    </Transition>

                    <Transition
                        mounted={step === Steps.CLASS}
                        transition="fade"
                    >
                        {(styles) => <ClassSelection styles={styles} />}
                    </Transition>

                    {/**
                     * @todo Background selection
                     */}

                    <Transition
                        mounted={step === Steps.ATTRIBUTE_METHOD}
                        transition="fade"
                    >
                        {(styles) => <AttributeMethod styles={styles} />}
                    </Transition>

                    <Transition
                        mounted={step === Steps.ATTRIBUTE}
                        transition="fade"
                    >
                        {(styles) => <AttributeSelection styles={styles} />}
                    </Transition>

                    <Transition
                        mounted={step === Steps.FEATURES}
                        transition="fade"
                    >
                        {(styles) => <FeaturesSelection styles={styles} />}
                    </Transition>

                    <Transition
                        mounted={step === Steps.ITEMS}
                        transition="fade"
                    >
                        {(styles) => <ItemsSelection styles={styles} />}
                    </Transition>

                    <Transition
                        mounted={step === Steps.SPELLS}
                        transition="fade"
                    >
                        {(styles) => <SpellSelection styles={styles} />}
                    </Transition>

                    <Transition
                        mounted={step === Steps.REVIEW}
                        transition="fade"
                    >
                        {(styles) => (
                            <ReviewOptions styles={styles} setStep={setStep} />
                        )}
                    </Transition>

                    <Transition
                        mounted={step === Steps.FINAL}
                        transition="fade"
                    >
                        {(styles) => (
                            <Stack style={styles} gap="md">
                                <Box>
                                    <Title size="h4">
                                        Seu personagem foi gerado!
                                    </Title>
                                    <Text size="sm">
                                        O que está esperando, grandes aventuras
                                        esperam por você.
                                    </Text>
                                </Box>
                                <Card radius="md" w={280} h={275} p={0}>
                                    <BackgroundImage
                                        src={
                                            avatarPreviewUrl ||
                                            `/images/fantasy/races/${form.race}.png`
                                        }
                                        radius="md"
                                        h="100%"
                                    >
                                        <div className="background-[linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)] p-4 h-full">
                                            <Text
                                                fw={500}
                                                c="var(--do_text_color_300)"
                                                size="sm"
                                            >
                                                {selectedRace?.name},{' '}
                                                {selectedClass?.name}.
                                            </Text>

                                            <Text
                                                size="lg"
                                                c="var(--do_text_color_600)"
                                            >
                                                {form.name}
                                            </Text>
                                        </div>
                                    </BackgroundImage>
                                </Card>
                                <Space h="2rem" />
                            </Stack>
                        )}
                    </Transition>

                    <Stack gap="xs">
                        <Button
                            fullWidth
                            size="lg"
                            disabled={isInvalidFormStep()}
                            onClick={handleNext}
                        >
                            {step === Steps.REVIEW
                                ? 'Criar personagem'
                                : step === Steps.FINAL
                                  ? 'Iniciar aventura'
                                  : 'Próximo'}
                        </Button>

                        {step > Steps.DESCRIPTION && (
                            <Button
                                variant="outline"
                                fullWidth
                                size="lg"
                                onClick={handledPrev}
                            >
                                Voltar
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Paper>
        </>
    )
}

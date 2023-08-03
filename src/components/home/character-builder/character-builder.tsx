import { css } from "@emotion/react"
import {
  ActionIcon,
  Title,
  Text,
  Box,
  Button,
  Stack,
  Space,
  Transition,
  BackgroundImage,
  Card,
} from "@mantine/core"
import { IconChevronLeft } from "@tabler/icons"
import { useState } from "react"
import races from "@/assets/dnd/5e/races"
import classes from "@/assets/dnd/5e/classes"
import { useAtom } from "jotai"
import {
  attrMethodAtom,
  avatarPreviewUrlAton,
  characterFormAton,
  pointBuyAtom,
} from "./state"
import CharacterDescription from "./components/5e/character-description"
import RaceSelection from "./components/5e/race-selection"
import ClassSelection from "./components/5e/class-selection"
import AttributeMethod from "./components/5e/attribute-method"
import AttributeSelection from "./components/5e/attribute-selection"
import ReviewOptions from "./components/5e/review-options"
import FeaturesSelection from "./components/5e/features-selection"
import ItemsSelection from "./components/5e/item-selection"

interface CharacterBuilderProps {
  onCancel: VoidFunction
}

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

export default function CharacterBuilder({ onCancel }: CharacterBuilderProps) {
  const [form] = useAtom(characterFormAton)
  const [attrMethod] = useAtom(attrMethodAtom)
  const [availablePoints] = useAtom(pointBuyAtom)
  const [avatarPreviewUrl] = useAtom(avatarPreviewUrlAton)

  const [step, setStep] = useState(Steps.DESCRIPTION)

  const handledPrev = () => {
    const prevStep = step - 1
    if (prevStep === Steps.UNSET) onCancel()

    setStep(prevStep)
  }
  const handleNext = () => {
    if (step === Steps.FINAL) {
      try {
        const characters = JSON.parse(
          localStorage.getItem("characters") ?? "[]"
        )
        form.picture ??= `/images/fantasy/races/${form.race}.png`
        localStorage.setItem(
          "characters",
          JSON.stringify([...characters, form])
        )
      } catch {
        console.error("Erro ao salvar personagem local")
      }
    }

    if (step === Steps.CLOSE) {
      /**
       * @todo Go to character sheet on linked adventure or empty board
       */

      onCancel()
    }
    setStep((step) => step + 1)
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
          (attrMethod !== "pointbuy" &&
            !(
              form.strength &&
              form.dexterity &&
              form.constitution &&
              form.intelligence &&
              form.wisdom &&
              form.charisma
            )) ||
          (attrMethod === "pointbuy" && availablePoints > 0)
        )
      }
      default: {
        return false
      }
    }
  }

  return (
    <Stack spacing="md" h={590}>
      <ActionIcon
        variant="light"
        aria-label={step - 1 === 0 ? "Cancelar" : "Voltar etapa"}
        onClick={handledPrev}
      >
        <IconChevronLeft size="1rem" color="var(--do_color_primary_base)" />
      </ActionIcon>

      <Transition mounted={step === Steps.DESCRIPTION} transition="fade">
        {(styles) => <CharacterDescription styles={styles} />}
      </Transition>

      <Transition mounted={step === Steps.RACE} transition="fade">
        {(styles) => <RaceSelection styles={styles} />}
      </Transition>

      <Transition mounted={step === Steps.CLASS} transition="fade">
        {(styles) => <ClassSelection styles={styles} />}
      </Transition>

      {/**
       * @todo Background selection
       */}

      <Transition mounted={step === Steps.ATTRIBUTE_METHOD} transition="fade">
        {(styles) => <AttributeMethod styles={styles} />}
      </Transition>

      <Transition mounted={step === Steps.ATTRIBUTE} transition="fade">
        {(styles) => <AttributeSelection styles={styles} />}
      </Transition>

      <Transition mounted={step === Steps.FEATURES} transition="fade">
        {(styles) => <FeaturesSelection styles={styles} />}
      </Transition>

      <Transition mounted={step === Steps.ITEMS} transition="fade">
        {(styles) => <ItemsSelection styles={styles} />}
      </Transition>

      <Transition mounted={step === Steps.SPELLS} transition="fade">
        {(styles) => (
          <SpellsSelection
            styles={styles}
            onSkip={() => setStep((step) => step + 1)}
          />
        )}
      </Transition>

      <Transition mounted={step === Steps.REVIEW} transition="fade">
        {(styles) => <ReviewOptions styles={styles} setStep={setStep} />}
      </Transition>

      <Transition mounted={step === Steps.FINAL} transition="fade">
        {(styles) => (
          <Stack style={styles} spacing="md">
            <Box>
              <Title size="h4">Seu personagem foi gerado!</Title>
              <Text size="sm">
                O que está esperando, grandes aventuras esperam por você.
              </Text>
            </Box>
            <Card radius="md" w={280} h={275} p={0}>
              <BackgroundImage
                src={
                  avatarPreviewUrl || `/images/fantasy/races/${form.race}.png`
                }
                radius="md"
                h="100%"
              >
                <div
                  css={css`
                    background: linear-gradient(
                      180deg,
                      rgba(0, 0, 0, 0.2) 0%,
                      rgba(0, 0, 0, 0) 100%
                    );
                    padding: 16px;
                    height: 100%;
                  `}
                >
                  <Text weight={500} color="var(--do_text_color_300)" size="sm">
                    {races[form.race!].name},{classes[form.classes[0]].name}.
                  </Text>

                  <Text size="lg" color="var(--do_text_color_600)">
                    {form.name}
                  </Text>
                </div>
              </BackgroundImage>
            </Card>
            <Space h="2rem" />
          </Stack>
        )}
      </Transition>

      <Box>
        <Button
          fullWidth
          size="lg"
          disabled={isInvalidFormStep()}
          onClick={handleNext}
        >
          {step === Steps.REVIEW
            ? "Criar personagem"
            : step === Steps.FINAL
            ? "Iniciar aventura"
            : "Próximo"}
        </Button>
        <Space h="md" />
        <Button variant="subtle" size="md" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </Stack>
  )
}

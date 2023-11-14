/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
  Paper,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import races from "@/assets/dnd/5e/races";
import classes from "@/assets/dnd/5e/classes";
import { useAtom } from "jotai";
import {
  attrMethodAtom,
  avatarPreviewUrlAton,
  characterFormAton,
  pointBuyAtom,
} from "./state";
import CharacterDescription from "./components/5e/character-description";
import RaceSelection from "./components/5e/race-selection";
import ClassSelection from "./components/5e/class-selection";
import AttributeMethod from "./components/5e/attribute-method";
import AttributeSelection from "./components/5e/attribute-selection";
import ReviewOptions from "./components/5e/review-options";
import FeaturesSelection from "./components/5e/features-selection";
import ItemsSelection from "./components/5e/item-selection";
import SpellSelection from "./components/5e/spell-selection";
import { notifications } from "@mantine/notifications";
import { captureException } from "@sentry/nextjs";
import getModifier from "@/assets/dnd/5e/utils/getModifier";
import type { CharacterSheetProps } from "@/assets/dnd/5e/utils/CharacterSheet";
import { nanoid } from "lib/nanoid";
import { useRouter } from "next/navigation";
import useCharacter from "@/hooks/useCharacter";

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
  const [form, setForm] = useAtom(characterFormAton);
  const [attrMethod] = useAtom(attrMethodAtom);
  const [availablePoints] = useAtom(pointBuyAtom);
  const [avatarPreviewUrl] = useAtom(avatarPreviewUrlAton);
  const router = useRouter();
  const { addCharacter } = useCharacter();

  const [step, setStep] = useState(Steps.DESCRIPTION);
  const id = useMemo(nanoid, []);

  const { spellsKnown, cantripKnown } = classes[form.classes[0]?.name] ?? {};
  const hasCantrips = cantripKnown?.length;
  const hasSpells =
    !!spellsKnown &&
    ((typeof spellsKnown === "number" && spellsKnown !== Infinity) ||
      (Array.isArray(spellsKnown) && !!spellsKnown[0]));
  const shouldSkipSpellStep = !(hasCantrips || hasSpells);

  const resetForm = () => setForm(characterFormAton.init);

  const handledPrev = () => {
    const prevStep = step - 1;
    if (prevStep === Steps.UNSET) {
      resetForm();
    }

    if (step === Steps.REVIEW && shouldSkipSpellStep) {
      setStep((step) => step - 2);
    } else {
      setStep(prevStep);
    }
  };
  const handleNext = () => {
    if (step + 1 === Steps.FINAL) {
      try {
        const initialHp =
          classes[form.classes[0].name].hp.average +
          getModifier(form.constitution.base + form.constitution.bonus);

        const newCharacter: CharacterSheetProps<"name"> = {
          ...form,
          id,
          hp: initialHp,
          currentHp: initialHp,
          tempHp: 0,
          initiative: getModifier(form.dexterity.base + form.dexterity.bonus),
          picture: avatarPreviewUrl || `/images/fantasy/races/${form.race}.png`,
          race: form.race!,
          classes: form.classes,
          strength: form.strength.base + form.strength.bonus,
          dexterity: form.dexterity.base + form.dexterity.bonus,
          constitution: form.constitution.base + form.constitution.bonus,
          intelligence: form.intelligence.base + form.intelligence.bonus,
          wisdom: form.wisdom.base + form.wisdom.bonus,
          charisma: form.charisma.base + form.charisma.bonus,
        };
        addCharacter(newCharacter);
      } catch (e) {
        captureException(e);
        notifications.show({
          title: "Erro",
          message: "Não foi possível salvar seu personagem! Tente novamente.",
        });
      }
    }

    if (step + 1 === Steps.CLOSE) {
      /**
       * @todo Go to character sheet on linked adventure or empty board
       */
      resetForm();

      router.push(`/character/${id}`);
    }

    if (step === Steps.ITEMS && shouldSkipSpellStep) {
      setStep((step) => step + 2);
    } else {
      setStep((step) => step + 1);
    }
  };

  const isInvalidFormStep = () => {
    switch (step) {
      case Steps.DESCRIPTION: {
        return !form.name;
      }
      case Steps.RACE: {
        return !form.race;
      }
      case Steps.CLASS: {
        return !form.classes.length;
      }
      case Steps.ATTRIBUTE_METHOD: {
        return !attrMethod;
      }
      case Steps.ATTRIBUTE: {
        return (
          (attrMethod !== "pointbuy" &&
            !(
              form.strength.base &&
              form.dexterity.base &&
              form.constitution.base &&
              form.intelligence.base &&
              form.wisdom.base &&
              form.charisma.base
            )) ||
          (attrMethod === "pointbuy" && availablePoints > 0)
        );
      }
      default: {
        return false;
      }
    }
  };

  return (
    <Paper className="m-6 mx-auto max-w-[550px] md:p-4" shadow="xs">
      <Stack className="w-full p-4" gap="md">
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
          {(styles) => <SpellSelection styles={styles} />}
        </Transition>

        <Transition mounted={step === Steps.REVIEW} transition="fade">
          {(styles) => <ReviewOptions styles={styles} setStep={setStep} />}
        </Transition>

        <Transition mounted={step === Steps.FINAL} transition="fade">
          {(styles) => (
            <Stack style={styles} gap="md">
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
                    <Text fw={500} c="var(--do_text_color_300)" size="sm">
                      {races[form.race!]?.name},
                      {classes[form.classes[0]?.name]?.name}.
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

        <Stack gap="xs">
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

          {step > Steps.DESCRIPTION && (
            <Button variant="outline" fullWidth size="lg" onClick={handledPrev}>
              Voltar
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Card,
  Modal,
  TextInput,
  Title,
  Text,
  ActionIcon,
  Transition,
} from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
//import CardCampaign from "./card-campaign"
import CardCharacter from "./card-character";
import SideScrollingBox from "./side-scrolling-box";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import CharacterBuilder from "./character-builder/character-builder";
import { type ChangeEventHandler, useEffect, useState } from "react";
import { removeDiacritics } from "@/utils/removeDiacritics";
import type { CharacterSheetProps } from "@/assets/dnd/5e/utils/CharacterSheet";

interface HomeComponentProps {
  campaigns: any[];
  characters: any[];
  setCharacters: (newCharacter: CharacterSheetProps<"name">) => void;
}

export default function HomeComponent({
  //  campaigns,
  characters,
  setCharacters,
}: HomeComponentProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useDebouncedState("", 200);
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!characters.length) return;
    setSearch(removeDiacritics(e.currentTarget.value.toLocaleLowerCase()));
  };

  useEffect(() => {
    if (!search) return setFilteredCharacters(characters);

    setFilteredCharacters(
      characters.filter(
        (char) =>
          removeDiacritics(char.name.toLowerCase()).includes(search) ||
          removeDiacritics(char.campaignName.toLowerCase()).includes(search),
      ),
    );
  }, [search, characters]);

  return (
    <>
      <main
        css={css`
          margin-block: 16px;
        `}
      >
        <TextInput
          type="search"
          mr={16}
          ml={16}
          size="lg"
          placeholder="O que está procurando?"
          rightSection={
            <IconSearch color="var(--do_color_primary_light_50)" size={24} />
          }
          onChange={handleFilter}
        />

        {/* <div>
          <Title size="h3" mt="xl" mb="md" mr={16} ml={16}>
            Minhas campanhas
          </Title>

          <SideScrollingBox>
            <Card
              css={css`
                background-color: var(--do_color_primary_light_50);
                border: 1px dashed rgba(0, 0, 0, 0.25);
                border-radius: var(--do_border_radius_md);
                display: flex;
                align-content: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 8px;
              `}
              w={223}
              h={351}
            >
              <Text weight={600} align="center">
                Criar uma mesa
              </Text>

              <Text size="sm" align="center">
                Crie uma mesa e viva novas aventuras!
              </Text>

              <ActionIcon
                mt="sm"
                size="xl"
                color="brand"
                variant="filled"
                onClick={handleNewBoard}
              >
                <IconPlus size="1.5rem" />
              </ActionIcon>
            </Card>
            {campaigns.map((campaign, i) => (
              <CardCampaign
                key={i}
                id={campaign.id}
                imgSrc={campaign.imgSrc}
                title={campaign.title}
                description={campaign.description}
                players={campaign.players}
                limit={campaign.limit}
                onJoin={open}
              />
            ))}
          </SideScrollingBox>
        </div> */}

        <div>
          <div className="mx-4 mb-4 mt-8">
            <Title className="text-white" size="h3">
              Meus personagens
            </Title>
            <Text>Os heróis das minhas histórias...</Text>
          </div>

          <SideScrollingBox>
            {!search && (
              <Card
                className="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-dashed border-[#2a2f37]"
                bg="transparent"
                w={240}
                h={345}
              >
                <Text className="text-white" fw={600} ta="center">
                  Criar um personagem
                </Text>

                <Text size="sm" ta="center">
                  Crie um personagem para utilizar onde quiser!
                </Text>

                <ActionIcon
                  mt="sm"
                  size="xl"
                  variant="transparent"
                  onClick={open}
                >
                  <IconPlus color="white" size="1.5rem" />
                </ActionIcon>
              </Card>
            )}
            {filteredCharacters.map((character, i) => {
              return (
                <Transition key={i} mounted={true} transition="fade">
                  {(styles) => (
                    <CardCharacter
                      style={styles}
                      imgSrc={character.imgSrc}
                      name={character.name}
                      detail={character.detail}
                      extra={character.extra}
                      id={character.id ?? i}
                    />
                  )}
                </Transition>
              );
            })}
          </SideScrollingBox>
        </div>
      </main>

      <Modal
        css={css`
          .mantine-ScrollArea-viewport > div {
            display: block !important;
            width: 0;
          }
        `}
        size="xs"
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
      >
        <CharacterBuilder onCancel={close} setCharacters={setCharacters} />
      </Modal>
    </>
  );
}

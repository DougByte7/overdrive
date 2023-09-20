import { css } from "@emotion/react"
import {
  Card,
  Modal,
  TextInput,
  Title,
  Text,
  ActionIcon,
  Transition,
} from "@mantine/core"
import { useDebouncedState, useDisclosure } from "@mantine/hooks"
//import CardCampaign from "./card-campaign"
import CardCharacter from "./card-character"
import SideScrollingBox from "./side-scrolling-box"
import { IconPlus, IconSearch } from "@tabler/icons-react"
import CharacterBuilder from "./character-builder/character-builder"
import { ChangeEventHandler, useEffect, useState } from "react"
import { removeDiacritics } from "@/utils/removeDiacritics"

interface HomeComponentProps {
  campaigns: any[]
  characters: any[]
}

export default function HomeComponent({
  //  campaigns,
  characters,
}: HomeComponentProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [search, setSearch] = useDebouncedState("", 200)
  const [filteredCharacters, setFilteredCharacters] = useState(characters)

  // const handleNewBoard = () => {
  //   notifications.show({
  //     title: "Vish :/",
  //     message: "Desculpe, mas essa função ainda está em desenvolvimento.",
  //     color: "red",
  //   })
  // }

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!characters.length) return
    setSearch(removeDiacritics(e.currentTarget.value.toLocaleLowerCase()))
  }

  useEffect(() => {
    if (!search) return setFilteredCharacters(characters)

    setFilteredCharacters(
      characters.filter(
        (char) =>
          removeDiacritics(char.name.toLowerCase()).includes(search) ||
          removeDiacritics(char.campaignName.toLowerCase()).includes(search)
      )
    )
  }, [search])

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
          sx={{
            ".mantine-TextInput-input": {
              background: "var(--do_color_primary_light_50)",
              border: 0,
              borderRadius: 6,
            },
            ".mantine-TextInput-input::placeholder": {
              color: "var(--do_text_color_300)",
            },
          }}
          size="lg"
          placeholder="O que está procurando?"
          icon={<IconSearch color="var(--do_color_primary_base)" size={24} />}
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
          <Title size="h3" mt="xl" mb="md" mr={16} ml={16}>
            Meus personagens
          </Title>

          <SideScrollingBox>
            {!search && (
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
                h={275}
              >
                <Text weight={600} align="center">
                  Criar um personagem
                </Text>

                <Text size="sm" align="center">
                  Crie um personagem para utilizar onde quiser!
                </Text>

                <ActionIcon
                  mt="sm"
                  size="xl"
                  color="brand"
                  variant="filled"
                  onClick={open}
                >
                  <IconPlus size="1.5rem" />
                </ActionIcon>
              </Card>
            )}
            {filteredCharacters.map((character, i) => (
              <Transition key={i} mounted={true} transition="fade">
                {(styles) => (
                  <CardCharacter
                    style={styles}
                    imgSrc={character.imgSrc}
                    name={character.name}
                    campaignName={character.campaignName}
                    campaignId={character.campaignId}
                    id={character.id ?? i}
                  />
                )}
              </Transition>
            ))}
          </SideScrollingBox>
        </div>
      </main>

      <Modal
        size="xs"
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        styles={{
          inner: {
            "& .mantine-ScrollArea-viewport > div": {
              display: "block !important",
              width: 0,
            },
          },
        }}
      >
        <CharacterBuilder onCancel={close} />
      </Modal>
    </>
  )
}

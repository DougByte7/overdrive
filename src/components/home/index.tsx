/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Modal, TextInput, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import CardCampaign from "./card-campaign"
import CardCharacter from "./card-character"
import SideScrollingBox from "./side-scrolling-box"
import { IconSearch } from "@tabler/icons"
import CharacterBuilder from "./character-builder/character-builder"

interface HomeComponentProps {
  campaigns: any[]
  characters: any[]
}

export default function HomeComponent({
  campaigns,
  characters,
}: HomeComponentProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <main
        css={css`
          padding: 16px;
        `}
      >
        <TextInput
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
        />

        <div>
          <Title size="h3" mt="xl" mb="md">
            Minhas campanhas
          </Title>

          <SideScrollingBox>
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
        </div>

        <div>
          <Title size="h3" mt="xl" mb="md">
            Meus personagens
          </Title>

          <SideScrollingBox>
            {characters.map((character, i) => (
              <CardCharacter
                key={i}
                imgSrc={character.imgSrc}
                name={character.name}
                campaignName={character.campaignName}
                campaignId={character.campaignId}
                id={character.id}
              />
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

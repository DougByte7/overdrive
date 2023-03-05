/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import useRouteGuard from "@/hooks/routeGuard"
import {
  Box,
  Flex,
  LoadingOverlay,
  ScrollArea,
  TextInput,
  Title,
} from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import CardCampaign from "@/components/home/card-campaign"
import { ReactNode, WheelEventHandler } from "react"
import CardCharacter from "@/components/home/card-character"

export default function Home() {
  const authStatus = useRouteGuard()

  if (authStatus !== "authenticated") return <LoadingOverlay visible />

  const campaigns = [
    {
      id: "1",
      limit: 4,
      imgSrc:
        "https://images.ctfassets.net/swt2dsco9mfe/5ufckdRJoL1Nh1XJv6clTt/1e8faa90bb0cfef53e3e5dbefc54b661/cos-rp.jpg",
      title: "Maldição de Strahd",
      description: "Estamos utilizando o D&D 5e, venha participar!",
      players: [
        { imgSrc: "", name: "test1" },
        { imgSrc: "", name: "test2" },
        { imgSrc: "", name: "test3" },
      ],
    },
  ]

  const characters = [
    {
      id: "1",
      campaignName: "Maldição de Strahd",
      campaignId: "1",
      name: "Anóriel Heinhardt",
      imgSrc:
        "https://i.pinimg.com/564x/fa/73/88/fa7388b1240d66cb712e15f7533d34cd.jpg",
    },
  ]

  return (
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
          {[
            ...campaigns,
            ...campaigns,
            ...campaigns,
            ...campaigns,
            ...campaigns,
            ...campaigns,
            ...campaigns,
            ...campaigns,
            ...campaigns,
          ].map((campaign, i) => (
            <CardCampaign
              key={i}
              id={campaign.id}
              imgSrc={campaign.imgSrc}
              title={campaign.title}
              description={campaign.description}
              players={campaign.players}
              limit={campaign.limit}
            />
          ))}
        </SideScrollingBox>
      </div>

      <div>
        <Title size="h3" mt="xl" mb="md">
          Meus personagens
        </Title>

        <SideScrollingBox>
          {[
            ...characters,
            ...characters,
            ...characters,
            ...characters,
            ...characters,
            ...characters,
            ...characters,
            ...characters,
            ...characters,
          ].map((character, i) => (
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
  )
}

function SideScrollingBox({ children }: { children: ReactNode }) {
  return (
    <Box
      css={css`
        overflow: auto;
        ::-webkit-scrollbar {
          height: 0px;
        }
      `}
    >
      <Flex
        gap="sm"
        css={css`
          width: max-content;

          @media screen and (min-width: 1360px) {
            flex-wrap: wrap;
            max-width: 100%;
          }
        `}
      >
        {children}
      </Flex>
    </Box>
  )
}

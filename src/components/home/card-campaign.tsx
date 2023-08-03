import { css } from "@emotion/react"
import { Card, Image, Button, Text, Avatar, Flex } from "@mantine/core"

interface Player {
  imgSrc: string
  name: string
}

interface CardCampaignProps {
  imgSrc: string
  title: string
  description: string
  players: Player[]
  limit: number
  id: string
  onJoin: VoidFunction
}

export default function CardCampaign({
  imgSrc,
  title,
  description,
  players,
  limit,
  id,
  onJoin,
}: CardCampaignProps) {
  const fallbackImg =
    "https://img.freepik.com/vetores-gratis/cavaleiro-e-portal-magico-em-moldura-de-pedra-na-paisagem-montanhosa-a-noite-ilustracao-em-vetor-desenho-animado-fantasia-com-homem-em-trajes-medievais-com-lanca-e-arco-antigo-com-brilho-azul-mistico_107791-5203.jpg?w=1800&t=st=1687126050~exp=1687126650~hmac=cc998a2842574a75a219239b192a720ac4bdd2a6050cc565969d4260cebe7c49"

  const slots = limit - players.length
  const slotsText =
    slots === 1 ? `${slots} vaga disponível` : `${slots} vagas disponíveis`

  function handleJoinRoom() {
    console.log(id)
    onJoin()
  }

  return (
    <>
      <Card p="md" radius="md" bg="var(--do_text_color_500)" w={223}>
        <Card.Section>
          <Image src={imgSrc ?? fallbackImg} height={140} width={223} alt="" />
        </Card.Section>

        <Text weight={700} mt="md">
          {title}
        </Text>

        <Text css={descriptionStyle} size="sm">
          {description}
        </Text>

        <Flex pos="absolute" bottom={74} align="center">
          {players.slice(0, 3).map((player) => (
            <Avatar
              css={css`
                :not(:first-of-type) {
                  margin-left: -16px;
                }
              `}
              key={player.imgSrc + player.name}
              src={player.imgSrc}
              alt={player.name}
              radius="xl"
              size={32}
            />
          ))}
          <Text size="sm" weight={600} ml="xs">
            {slots ? slotsText : "Não há vagas"}
          </Text>
        </Flex>

        <Button
          pos="absolute"
          right={16}
          bottom={16}
          left={16}
          size="md"
          onClick={handleJoinRoom}
        >
          Entrar
        </Button>
      </Card>
    </>
  )
}

const descriptionStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 3lh;
`

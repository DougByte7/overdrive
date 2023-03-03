/** @jsxImportSource @emotion/react */
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
}

export default function CardCampaign({
  imgSrc,
  title,
  description,
  players,
  limit,
  id,
}: CardCampaignProps) {
  const slots = limit - players.length
  const slotsText =
    slots === 1 ? `${slots} vaga disponível` : `${slots} vagas disponíveis`

  return (
    <Card p="md" radius="md" bg="var(--do_text_color_500)" w={223}>
      <Card.Section>
        <Image src={imgSrc} height={140} width={223} alt="" />
      </Card.Section>

      <Text weight={700} mt="md">
        {title}
      </Text>

      <Text size="sm">{description}</Text>

      <Flex>
        {players.slice(0, 3).map((player) => (
          <Avatar
            css={css`
              :not(:first-child) {
                margin-left: -16px;
              }
            `}
            key={player.imgSrc + player.imgSrc}
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

      <Button size="md" mt="md" fullWidth>
        Entrar
      </Button>
    </Card>
  )
}

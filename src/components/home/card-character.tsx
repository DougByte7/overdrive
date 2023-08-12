/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Card, Button, Text, BackgroundImage } from "@mantine/core"
import { notifications } from "@mantine/notifications"

interface CardCharacterProps {
  imgSrc: string
  name: string
  campaignName: string
  campaignId: string
  id: string
}

export default function CardCharacter({
  imgSrc,
  name,
  campaignName,
  campaignId,
  id,
}: CardCharacterProps) {
  const fallbackImg =
    "https://img.freepik.com/vetores-gratis/guerreiro-escandinavo-de-personagem-viking-no-capacete_107791-15005.jpg?w=1380&t=st=1687125692~exp=1687126292~hmac=608bcc92a79a2fd9ae1a6b449b8537c476bdd3165c0c00c9f6ceaffa751d253d"

  return (
    <Card radius="md" w={223} h={275} p={0}>
      <BackgroundImage src={imgSrc ?? fallbackImg} radius="md" h="100%">
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
            {campaignName}
          </Text>

          <Text size="lg" color="var(--do_text_color_600)">
            {name}
          </Text>

          <Button
            size="md"
            pos="absolute"
            bottom={16}
            component="a"
            href={`/character/${id}`}
          >
            Visualizar
          </Button>
        </div>
      </BackgroundImage>
    </Card>
  )
}

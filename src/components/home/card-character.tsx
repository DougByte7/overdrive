/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Card, Button, Text, BackgroundImage } from "@mantine/core"

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
  function handleJoinRoom() {
    console.log(campaignId, id)
  }

  return (
    <Card radius="md" w={223} h={275} p={0}>
      <BackgroundImage src={imgSrc} radius="md" h="100%">
        <div
          className="aaaaaa"
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

          <Button size="md" pos="absolute" bottom={16} onClick={handleJoinRoom}>
            Entrar
          </Button>
        </div>
      </BackgroundImage>
    </Card>
  )
}

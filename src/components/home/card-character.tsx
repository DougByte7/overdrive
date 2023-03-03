/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
  Card,
  Image,
  Button,
  Text,
  Avatar,
  Flex,
  BackgroundImage,
} from "@mantine/core"

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
  return (
    <Card radius="md" w={223} h={275} p={0}>
      <BackgroundImage src={imgSrc} radius="md" h="100%" p="md">
        <Text weight={500} color="var(--do_text_color_300)" size="sm">
          {campaignName}
        </Text>

        <Text size="lg" color="var(--do_text_color_600)">
          {name}
        </Text>

        <Button size="md" pos="absolute" bottom={16}>
          Entrar
        </Button>
      </BackgroundImage>
    </Card>
  )
}

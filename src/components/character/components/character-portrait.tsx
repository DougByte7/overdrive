import { css } from "@emotion/react"
import { Stack, Text } from "@mantine/core"
import Image from "next/image"

interface CharacterPortraitProps {
  imgSrc: string
  name: string
  label: string
}
export default function CharacterPortrait({
  imgSrc,
  name,
  label,
}: CharacterPortraitProps) {
  return (
    <Stack spacing="xs">
      <picture css={characterPortraitStyles}>
        <Image
          src={imgSrc}
          width={343}
          height={431}
          alt="Retrato do personagem"
        />
      </picture>
      <div>
        <Text size="xl" fw="bold">
          {name}
        </Text>
        <Text size="sm" color="var(--do_text_color_300)">
          {label}
        </Text>
      </div>
    </Stack>
  )
}

const characterPortraitStyles = css`
  align-self: center;
  border-radius: var(--do_border_radius_md);
`

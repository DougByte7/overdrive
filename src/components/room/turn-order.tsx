/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Avatar, Group, Stack, Text } from "@mantine/core"

export default function TurnOrder() {
  const characters = Array(12).fill(null)

  return (
    <Stack align="center" gap="sm">
      <Text color="white" size={"12px"}>
        INICIATIVA
      </Text>
      <div css={mask}>
        <Group css={avatarGroup} wrap="nowrap">
          {characters.map((_, i) => {
            return <Avatar key={i} radius="xl" />
          })}
        </Group>
      </div>
      <Text css={turnOf} size={"14px"} color="var(--do_text_color_300)">
        <Text component="span" color="var(--do_color_info)">
          Turno
        </Text>{" "}
        de{" "}
        <Text component="span" color="white">
          {"{Char}"}.
        </Text>
      </Text>
    </Stack>
  )
}

const mask = css`
  overflow: hidden;
  height: 38px;
  width: 318px;
`

const avatarGroup = css`
  overflow: auto hidden;
  height: 38px;
  width: 318px;
  padding-bottom: 17px;
  box-sizing: content-box;
`

const turnOf = css`
  align-self: flex-start;
  width: 100%;
  border-radius: var(--do_border_radius_sm);
  padding: 8px 10px;
  background: var(--do_color_support_dark_30);
`

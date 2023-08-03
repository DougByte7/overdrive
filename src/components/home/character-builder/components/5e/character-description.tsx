import {
  Stack,
  Box,
  Title,
  FileInput,
  TextInput,
  Paper,
  Group,
  Avatar,
  Textarea,
  Text,
} from "@mantine/core"
import { useAtom } from "jotai"
import { avatarPreviewUrlAton, characterFormAton } from "../../state"
import type { CSSProperties, ChangeEventHandler } from "react"

interface CharacterDescriptionProps {
  styles: CSSProperties
}

export default function CharacterDescription({
  styles,
}: CharacterDescriptionProps) {
  const [form, setForm] = useAtom(characterFormAton)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useAtom(avatarPreviewUrlAton)

  const handleSetName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((form) => ({ ...form, name: e.currentTarget.value }))
  }

  const handleSetBackstory: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setForm((form) => ({ ...form, backstory: e.currentTarget.value }))
  }

  const handleSetPicture = (picture: File) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      e.target && setAvatarPreviewUrl(e.target.result as string)
      const pictureUrl = (e.target?.result as string) ?? ""
      setForm((form) => ({ ...form, picture: pictureUrl }))
    }

    if (picture) reader.readAsDataURL(picture)
    else setAvatarPreviewUrl("")
  }

  return (
    <Stack style={styles} spacing="md" h="100%">
      <Box>
        <Title size="h4">Como o seu personagem é?</Title>
        <Text size="sm">Escolha um nome e uma foto.</Text>
      </Box>

      <Stack
        sx={{
          maxWidth: "288px",
        }}
        spacing="xs"
      >
        <FileInput
          name="character-picture"
          label="Foto do personagem"
          placeholder="Selecione uma foto..."
          accept="image/png,image/jpeg,image/avif"
          sx={{
            ".mantine-InputWrapper-label": {
              fontSize: "var(--do_text_size_sm)",
              fontWeight: 700,
            },
          }}
          onChange={handleSetPicture}
        />
        <TextInput
          name="name"
          label="Nome do Personagem"
          autoComplete="false"
          withAsterisk
          placeholder="Anóriel Heinhardt"
          sx={{
            ".mantine-InputWrapper-label": {
              fontSize: "var(--do_text_size_sm)",
              fontWeight: 700,
            },
          }}
          value={form.name}
          onChange={handleSetName}
        />
      </Stack>

      <Paper withBorder p="md">
        <Group>
          <Avatar size={40} alt="" src={avatarPreviewUrl} />
          <Text weight={600}>{form.name || "Nome"}</Text>
        </Group>
      </Paper>

      <Textarea
        name="backstory"
        label="História do personagem"
        placeholder="Órfão em busca de vingança..."
        minRows={4}
        sx={{
          ".mantine-Textarea-label": {
            fontSize: "var(--do_text_size_sm)",
            fontWeight: 700,
          },
        }}
        onChange={handleSetBackstory}
      />
    </Stack>
  )
}
import {
    Avatar,
    Box,
    FileInput,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useAtom } from 'jotai'
import type { CSSProperties, ChangeEventHandler } from 'react'

import { avatarPreviewUrlAton, characterFormAton } from '../../state'

interface CharacterDescriptionProps {
    styles: CSSProperties
}

export default function CharacterDescription({
    styles,
}: CharacterDescriptionProps) {
    const [form, setForm] = useAtom(characterFormAton)
    const [avatarPreviewUrl, setAvatarPreviewUrl] =
        useAtom(avatarPreviewUrlAton)

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
            const pictureUrl = (e.target?.result as string) ?? ''
            setForm((form) => ({ ...form, picture: pictureUrl }))
        }

        if (picture) {
            // Menor que 10mb
            if (picture.size < 10 * 1024 ** 2) reader.readAsDataURL(picture)
            else
                notifications.show({
                    color: 'red',
                    title: 'Falha crítica!',
                    message: 'Imagem maior que 10Mb',
                })
        } else {
            setAvatarPreviewUrl('')
        }
    }

    return (
        <Stack style={styles} gap="md" h="100%">
            <Box>
                <Title size="h4">Como o seu personagem é?</Title>
                <Text size="sm">Escolha um nome e uma foto.</Text>
            </Box>

            <Stack gap="xs">
                <FileInput
                    name="character-picture"
                    label="Foto do personagem"
                    placeholder="Selecione uma foto..."
                    accept="image/png,image/jpeg"
                    styles={{
                        label: {
                            fontSize: 'var(--do_text_size_sm)',
                            fontWeight: 700,
                        },
                    }}
                    onChange={handleSetPicture as any}
                />
                <TextInput
                    name="name"
                    label="Nome do Personagem"
                    autoComplete="off"
                    withAsterisk
                    placeholder="Anóriel Heinhardt"
                    styles={{
                        label: {
                            fontSize: 'var(--do_text_size_sm)',
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
                    <Text fw={600}>{form.name || 'Nome'}</Text>
                </Group>
            </Paper>

            <Textarea
                autosize
                name="backstory"
                label="História do personagem"
                placeholder="Órfão em busca de vingança..."
                minRows={4}
                styles={{
                    label: {
                        fontSize: 'var(--do_text_size_sm)',
                        fontWeight: 700,
                    },
                }}
                onChange={handleSetBackstory}
            />
        </Stack>
    )
}

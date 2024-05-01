'use client'

import { List, Space, Stack, Text, Title } from '@mantine/core'

import TopBar from '@/components/top-bar/top-bar'

export default function PatchNotes() {
    const notes = [
        {
            version: 'Versão Pre-alpha 1.1.0',
            date: '2024-01-05T00:00',
            news: [
                'Adicionado barra e menu de navegação.',
                'Adicionado página de gerenciador de combate.',
                'Adicionado seletor de itens no inventário.',
                'Correção do criador de personagem: O botão de continuar agora fica bloqueado se nenhum item for selecionado.',
            ],
        },
    ]

    return (
        <>
            <TopBar title="Novidades" />
            <main className="p-4">
                <Stack gap="xl" align="center">
                    {notes.map((note) => {
                        return (
                            <Stack key={note.version} gap="xs">
                                <Title
                                    className="font-mono"
                                    order={2}
                                    size="h3"
                                >
                                    {note.version}
                                </Title>
                                <List className="list-disc">
                                    {note.news.map((n) => {
                                        return (
                                            <List.Item key={n}>{n}</List.Item>
                                        )
                                    })}
                                </List>
                                <Text className="opacity-75" size="xs">
                                    {new Date(note.date).toLocaleDateString()}
                                </Text>
                            </Stack>
                        )
                    })}
                </Stack>
            </main>
        </>
    )
}

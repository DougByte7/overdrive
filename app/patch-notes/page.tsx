'use client'

import { List, Stack, Text, Title } from '@mantine/core'

import TopBar from '@/components/top-bar/top-bar'

export default function PatchNotes() {
    const notes = [
        // {
        //     version: 'Versão Pre-alpha 1.2.0 🎉',
        //     date: '2024-05-03T00:00',
        //     news: [
        //         //'✅ Adicionado página de gerenciador de combate.', // @todo
        //         //'✅ Adicionado seletor de itens no inventário.', // @todo
        //         //'🦋 Ainda mais bugs!',
        //     ],
        // },
        {
            version: 'Versão Pre-alpha 1.1.0 🎉',
            date: '2024-06-08T00:00',
            news: [
                '✅ Adicionado esta página.',
                '✅ Adicionado barra e menu de navegação.',
                '✅ Adicionado páginas de "Politica de Privacidade" e "Termos de Serviço".',
                '✅ Adicionado suporte básico a conteúdo homebrew de classes Marciais pelo construtor de personagem SRD5.',
                '✅ Adicionado suporte a preenchimento customizado de atributos no construtor de personagem SRD5.',
                '🔧 Correção de problema em que o banco de dados se encontrava indisponível.',
                '🔧 Correção de diversos bugs na etapa de seleção de items do criador de personagem.',
                '⚡ Pequenas melhorias de performance gerais do sistema.',
                '✨ Pequenas melhorias na disposição alguns elementos da ficha de personagem.',
                '✨ No desktop agora as magias são exibidas no lugar do inventário para personagens conjuradores.',
                '🦋 Novos bugs para corrigir depois!',
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

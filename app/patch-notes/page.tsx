'use client'

import { List, Text, Title } from '@mantine/core'

import TopBar from '@/components/top-bar/top-bar'

import { notes } from './notes'

export default function PatchNotes() {
    return (
        <>
            <TopBar title="Novidades" />
            <main className="prose lg:prose-xl prose-invert mx-auto mt-4">
                {notes.map((note) => {
                    return (
                        <article key={note.version}>
                            <Title className="font-mono" order={2}>
                                Versão {note.version} 🎉
                            </Title>
                            <List className="list-disc">
                                {note.news.map((n) => {
                                    return <List.Item key={n}>{n}</List.Item>
                                })}
                            </List>
                            <Text className="opacity-75" size="xs">
                                {new Date(note.date).toLocaleDateString()}
                            </Text>
                        </article>
                    )
                })}
            </main>
        </>
    )
}

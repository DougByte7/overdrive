import { Avatar, Group, Text, Textarea } from '@mantine/core'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { KeyboardEventHandler, useEffect, useState } from 'react'

import { socketAton } from './state'

interface Message {
    from: string
    content: string
    time: number
}
export default function Chat() {
    const [socket] = useAtom(socketAton)
    const [messages, setMessages] = useState<Message[]>([])
    // Use clerk
    const { data: sessionData, status: sessionStatus } = {
        status: {},
        data: { user: { name: '' } },
    }
    const router = useRouter()
    const currentTime = new Date().getTime()

    const formatTime = (elapsed: number) => {
        const msPerMinute = 60 * 1000
        const msPerHour = msPerMinute * 60
        const msPerDay = msPerHour * 24
        const msPerMonth = msPerDay * 30
        const msPerYear = msPerDay * 365

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + 's'
        }

        if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + 'min'
        }

        if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + 'h'
        }

        if (elapsed < msPerMonth) {
            const time = Math.round(elapsed / msPerDay)
            return time > 1 ? time + ' dias' : time + ' dia'
        }

        if (elapsed < msPerYear) {
            const time = Math.round(elapsed / msPerMonth)
            return time > 1 ? time + ' meses' : time + ' mes'
        }

        const time = Math.round(elapsed / msPerYear)
        return time > 1 ? time + ' anos' : time + ' ano'
    }

    useEffect(() => {
        if (sessionStatus === 'loading' || !router.query.roomId) return

        socket.on('user:joined', (user) => {
            setMessages((messages) => [
                ...messages,
                {
                    from: 'system',
                    content:
                        user.id === (sessionData?.user as any)?.id
                            ? 'You joined the chat'
                            : `User ${user.name} joined the chat`,
                    time: new Date().getTime(),
                },
            ])
        })

        socket.on('chat:get', (message) => {
            setMessages((messages) => [...messages, message])
        })
    }, [sessionStatus, router.query.roomId])

    const sendMessage: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (
            event.shiftKey ||
            event.key !== 'Enter' ||
            !event.currentTarget.value
        )
            return
        event.preventDefault()

        console.log('post')

        const message: Message = {
            from: sessionData?.user?.name ?? 'guest',
            content: event.currentTarget.value,
            time: new Date().getTime(),
        }
        setMessages((messages) => [...messages, message])
        socket.emit('chat:post', message)

        event.currentTarget.value = ''
    }

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.from + message.time}>
                        <Group gap={8}>
                            <Avatar size="sm" radius="xl" />
                            <Text color="white" size="14px">
                                {message.from}
                            </Text>
                            <Text size={'12px'}>
                                {formatTime(currentTime - message.time)}
                            </Text>
                        </Group>
                        <Text color="white" size="14px">
                            {message.content}
                        </Text>
                    </div>
                ))}
                <SystemMessage
                    type="warn"
                    message={{
                        from: '🎲  Rolagem de dados',
                        content:
                            '{Char} rolou 3d6 e tirou 4, 2, 6... Somando 12.',
                        time: 1,
                    }}
                />
                <SystemMessage
                    type="danger"
                    message={{
                        from: '🎲  Ataque',
                        content:
                            'Goblin Feiticeiro sofreu 12 de dano mágico de {Char}...',
                        time: 2,
                    }}
                />
            </div>

            <Textarea
                placeholder="Envie uma mensagem..."
                onKeyDown={sendMessage}
            />
        </div>
    )
}

type SystemMsgPalette = 'warn' | 'danger'
interface SystemMessageProps {
    type: SystemMsgPalette
    message: Message
}
function SystemMessage({ message, type }: SystemMessageProps) {
    console.log(type)

    return (
        <div>
            <Text className="title" color="white" size="14px">
                {message.from}
            </Text>
            <Text color="white" size="14px">
                {message.content}
            </Text>
        </div>
    )
}

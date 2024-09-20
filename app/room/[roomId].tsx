import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useId } from 'react'

import Canvas from '@/components/room/canvas'
import Chat from '@/components/room/chat'
import { socketAton } from '@/components/room/state'
import TurnOrder from '@/components/room/turn-order'
import WebRTCStream from '@/components/room/web-rtc-stream'

export default function Room() {
    const [socket] = useAtom(socketAton)
    const guestId = 'guest' + useId()
    // Use clerk
    const { data: sessionData, status: sessionStatus } = {
        status: {},
        data: { user: { name: '' } },
    }
    const router = useRouter()

    useEffect(() => {
        if (sessionStatus === 'loading' || !router.query.roomId) return

        socket.connect()

        socket.emit('room:join', {
            room: router.query.roomId,
            user: {
                id: (sessionData?.user as any)?.id ?? guestId,
                name: sessionData?.user?.name ?? 'guest',
            },
        })

        return () => {
            socket.close()
        }
    }, [sessionStatus, router.query.roomId])

    return (
        <main>
            <section>
                <Canvas />
            </section>

            <section>
                <WebRTCStream />
            </section>

            <section>
                <TurnOrder />
                <Chat />
            </section>
        </main>
    )
}

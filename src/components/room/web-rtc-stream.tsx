import { Select, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'

import { socketAton } from './state'

export default function WebRTCStream() {
    const [socket] = useAtom(socketAton)
    const [localStream, setLocalStream] = useState<MediaStream>()
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([])
    // Use clerk
    const { data: sessionData, status: sessionStatus } = {
        status: {},
        data: { user: { name: '' } },
    }
    const router = useRouter()
    const peer = useRef<Peer.Instance>()
    const [preferredVideoSource, setPreferredVideoSource] = useLocalStorage<
        string | null
    >({
        key: 'preferredVideoSource',
    })
    const [preferredAudioSource, setPreferredAudioSource] = useLocalStorage<
        string | null
    >({
        key: 'preferredAudioSource',
    })

    useEffect(() => {
        if (sessionStatus === 'loading' || !router.query.roomId) return

        const tryConnectRTC = async () => {
            const devices = await navigator.mediaDevices?.enumerateDevices()
            if (!devices?.length) return

            const [videoDevices, audioDevices]: [
                MediaDeviceInfo[],
                MediaDeviceInfo[],
            ] = devices.reduce(
                (acc, device) => {
                    if (device.kind === 'videoinput')
                        return [[...acc[0], device], acc[1]]
                    if (device.kind === 'audioinput')
                        return [acc[0], [...acc[1], device]]

                    return acc
                },
                [[], []] as any
            )

            if (!(videoDevices.length || audioDevices.length)) return

            let videoSourceId = preferredVideoSource ?? ''
            let audioSourceId = preferredAudioSource ?? ''

            const onConfirm = async () => {
                modals.closeAll()

                const stream = await navigator.mediaDevices?.getUserMedia({
                    video: { deviceId: videoSourceId },
                    audio: { deviceId: audioSourceId },
                })

                setLocalStream(stream)
                peer.current = new Peer({
                    initiator: true,
                    stream,
                    trickle: false,
                    config: {
                        iceServers: [
                            {
                                urls: 'stun:stun.l.google.com:19302',
                            },
                            {
                                urls: 'stun:stun1.l.google.com:19302',
                            },
                            {
                                urls: 'stun:stun2.l.google.com:19302',
                            },
                        ],
                    },
                })

                peer.current?.on('signal', (signal) => {
                    console.log('signal')

                    socket.emit(
                        'user:join-video',
                        signal,
                        sessionData?.user?.name ?? 'guest'
                    )

                    socket.on('user:joined-video', (signal, from) => {
                        console.log('signal from: ' + from)
                        peer.current?.signal(signal)
                    })
                })

                peer.current?.on('stream', (stream) => {
                    setRemoteStreams((streams) => [...streams, stream])
                })
            }

            modals.openConfirmModal({
                size: 'lg',
                title: 'Selecione sua camera e/ou microfone',
                styles: { content: { overflow: 'visible' } },
                labels: { cancel: 'Cancelar', confirm: 'Confirmar' },
                onConfirm,
                children: (
                    <Stack>
                        {!!videoDevices.length && (
                            <Select
                                label="Camera"
                                placeholder="Escolha um"
                                value={preferredVideoSource}
                                data={videoDevices.map((device) => {
                                    return {
                                        value: device.deviceId,
                                        label: device.label,
                                    }
                                })}
                                onChange={(value) => {
                                    setPreferredVideoSource(value)
                                    videoSourceId = value as string
                                }}
                            />
                        )}
                        {!!audioDevices.length && (
                            <Select
                                label="Microfone"
                                placeholder="Escolha um"
                                value={preferredAudioSource}
                                data={audioDevices.map((device) => {
                                    return {
                                        value: device.deviceId,
                                        label: device.label,
                                    }
                                })}
                                onChange={(value) => {
                                    setPreferredAudioSource(value)
                                    audioSourceId = value as string
                                }}
                            />
                        )}
                    </Stack>
                ),
            })
        }

        tryConnectRTC()

        return () => {
            peer.current?.destroy()
            modals.closeAll()
        }
    }, [sessionStatus, router.query.roomId])

    return (
        <main>
            {localStream && <Video stream={localStream} />}{' '}
            {remoteStreams.map((stream, i) => {
                return <Video key={i} stream={stream} />
            })}
        </main>
    )
}

function Video({ stream }: { stream: MediaStream }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.srcObject = stream
    }, [videoRef.current])

    return <video ref={videoRef} playsInline autoPlay></video>
}

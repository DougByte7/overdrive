'use client'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'
import Link from 'next/link'
import { useEffect } from 'react'

import storageKeys from '@/constants/storageKeys'

export function useIsSignedOutNotification() {
    const { isLoaded, isSignedIn } = useAuth()

    useEffect(() => {
        const isGuest = localStorage.getItem(storageKeys.user.isGuest)
        if (isGuest === 'true' || (isLoaded && isSignedIn)) return

        const id = notifications.show({
            title: 'Sua sessão expirou!',
            message: (
                <Link className="underline" href="/">
                    Clique aqui para realizar seu Login
                </Link>
            ),
            autoClose: false,
            color: 'red',
        })

        return () => {
            notifications.hide(id)
        }
    }, [isLoaded, isSignedIn])
}

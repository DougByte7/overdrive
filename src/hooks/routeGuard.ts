'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import storageKeys from '@/constants/storageKeys'

export default function useRouteGuard(guestAccess = true) {
    const { isLoaded, isSignedIn } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (
            isLoaded &&
            !isSignedIn &&
            guestAccess &&
            window?.localStorage.getItem(storageKeys.user.isGuest) !== 'true'
        ) {
            router.push('/')
        }
    })
}

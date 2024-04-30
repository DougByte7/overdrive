import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useRouteGuard(guestAccess = true) {
    const { isLoaded, isSignedIn } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (
            isLoaded &&
            !isSignedIn &&
            guestAccess &&
            window?.localStorage.getItem('user:isGuest') !== 'true'
        ) {
            router.push('/')
        }
    })
}

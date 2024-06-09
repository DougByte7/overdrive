import { AuthenticateWithRedirectCallback, ClerkProvider } from '@clerk/nextjs'

export default function SSOCallBack() {
    return (
        <ClerkProvider>
            <AuthenticateWithRedirectCallback />
        </ClerkProvider>
    )
}

import { ClerkProvider } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { Provider as JotaiProvider } from 'jotai'
import type { Metadata, Viewport } from 'next'
import { Germania_One, Manrope } from 'next/font/google'
import 'src/styles/global.css'
import 'src/styles/variables.css'

import TRPCProvider from '@/providers/trpc-provider'
import theme from '@/theme'

const germaniaOne = Germania_One({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="shortcut icon" href="/d10-electric.svg" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <ClerkProvider>
                    <JotaiProvider>
                        <MantineProvider
                            theme={{ ...theme }}
                            defaultColorScheme="dark"
                        >
                            <TRPCProvider>
                                <ModalsProvider>
                                    <Notifications />
                                    {children}
                                </ModalsProvider>
                            </TRPCProvider>
                        </MantineProvider>
                    </JotaiProvider>
                </ClerkProvider>
                <Analytics />
            </body>
        </html>
    )
}

export const metadata: Metadata = {
    openGraph: {
        url: 'https://diceoverdrive.com',
        siteName: 'Dice Overdrive',
        locale: 'pt_BR',
        alternateLocale: 'en_US',
        description:
            'Dice Overdrive, sua plataforma definitiva para jogar RPG. Pegue os dados e vamos jogar!',
    },
    keywords: [
        'dice',
        'overdrive',
        'vtt',
        'virtual',
        'tabletop',
        'jogar',
        'rpg',
        'online',
        'ferramentas',
        'mestre',
    ],
    title: 'Dice Overdrive',
}

export const viewport: Viewport = {
    minimumScale: 1,
    initialScale: 1,
    width: 'device-width',
}

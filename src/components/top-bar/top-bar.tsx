'use client'

import { useAuth } from '@clerk/nextjs'
import {
    Burger,
    Button,
    Drawer,
    Group,
    NavLink,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBellRinging, IconHome, IconSkull } from '@tabler/icons-react'
import { latestVersion } from 'app/patch-notes/notes'
import Image from 'next/image'
import Link from 'next/link'

interface TopBarProps {
    title?: string
}
export default function TopBar({ title }: TopBarProps) {
    const [opened, { toggle, close }] = useDisclosure()
    const { isSignedIn, signOut } = useAuth()

    return (
        <header className="relative flex items-center justify-center bg-support-600 px-20 py-2">
            <Title
                className="absolute left-4 w-2/5 overflow-hidden text-ellipsis"
                size="sm"
                title={title}
            >
                {title}
            </Title>

            <Link href="/home">
                <Image
                    src="/images/icon-logo.svg"
                    alt="d10 Logo: Dice Overdrive. Charge your rolls"
                    width={44}
                    height={44}
                />
            </Link>

            <Burger
                className="absolute right-4"
                opened={opened}
                onClick={toggle}
                aria-label="Alternar menu"
            />

            <Drawer opened={opened} onClose={close} position="right">
                <Stack className="h-[calc(100svh-60px)]">
                    <NavLink
                        href="/home"
                        label="Início"
                        leftSection={<IconHome />}
                    />
                    <NavLink
                        href="/monsters"
                        label="Monstros"
                        leftSection={<IconSkull />}
                    />
                    {/* <NavLink
                        href="/combat-manager"
                        label="Gerenciador de combate"
                        leftSection={<IconSwords />}
                    /> */}

                    <NavLink
                        href="/patch-notes"
                        label={
                            <Group>
                                Novidades
                                <Text className="font-mono text-xs opacity-75">
                                    {latestVersion}
                                </Text>
                            </Group>
                        }
                        leftSection={<IconBellRinging />}
                    />

                    <div className="mt-auto mb-8 px-4">
                        <NavLink
                            href="/privacy"
                            label="Politica de Privacidade"
                        />
                        <NavLink href="/tos" label="Termos de Serviço" />
                        <NavLink href="/licenses" label="Licenças" />

                        {isSignedIn ? (
                            <Button
                                className="w-full mt-4"
                                onClick={() => signOut({ redirectUrl: '/' })}
                            >
                                Sair
                            </Button>
                        ) : (
                            <Button
                                className="w-full mt-4"
                                component={Link}
                                href="/"
                            >
                                Entrar ou Cadastrar
                            </Button>
                        )}
                    </div>
                </Stack>
            </Drawer>
        </header>
    )
}

import { SignOutButton } from '@clerk/nextjs'
import {
    Box,
    Burger,
    Button,
    Group,
    NavLink,
    Stack,
    Text,
    Title,
    Transition,
} from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import {
    IconBellRinging,
    IconHome,
    IconSkull,
    IconSwords,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

interface TopBarProps {
    title?: string
}
export default function TopBar({ title }: TopBarProps) {
    const [opened, { toggle, close }] = useDisclosure()
    const ref = useClickOutside(close)

    return (
        <header
            ref={ref}
            className="relative flex items-center justify-center bg-support-600 px-20 py-2"
        >
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
                className="absolute  right-4"
                opened={opened}
                onClick={toggle}
                aria-label="Alternar menu"
            />

            <Transition
                mounted={opened}
                transition="slide-left"
                duration={300}
                timingFunction="ease"
            >
                {(styles) => (
                    <Stack
                        className="absolute right-0 top-16 z-50 h-[calc(100vh-60px)] w-96 max-w-full bg-inherit"
                        style={styles}
                    >
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
                        <NavLink
                            href="/combat-manager"
                            label="Gerenciador de combate"
                            leftSection={<IconSwords />}
                        />

                        <NavLink
                            href="/patch-notes"
                            label={
                                <Group>
                                    Novidades
                                    <Text className="font-mono text-xs opacity-75">
                                        {process.env.NEXT_PUBLIC_APP_VERSION}
                                    </Text>
                                </Group>
                            }
                            leftSection={<IconBellRinging />}
                        />
                        <Button className="mt-auto mb-8" component={Box}>
                            <SignOutButton redirectUrl="/" />
                        </Button>
                    </Stack>
                )}
            </Transition>
        </header>
    )
}

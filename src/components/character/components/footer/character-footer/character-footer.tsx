'use client'

import { Divider, Flex, Stack, Text, UnstyledButton } from '@mantine/core'
import { IconCrystalBall } from '@tabler/icons-react'
import { useAtom } from 'jotai'

import { activeTabAtom } from '@/components/character/state'

export default function CharacterFooter() {
    const [activeTab, setActiveTab] = useAtom(activeTabAtom)

    const handleSetActiveTab = (tab: typeof activeTab) => () => {
        setActiveTab(tab)
    }

    return (
        <footer className="fixed bottom-0 w-full h-[72px] bg-[var(--mantine-color-body)] border-t border-support-400 z-10">
            <Flex justify="space-evenly" align="center" h={56} mt={8}>
                <UnstyledButton onClick={handleSetActiveTab('basic')}>
                    <Stack align="center" gap={0}>
                        <i
                            aria-hidden={true}
                            style={customIconStyles(
                                `/icons/${
                                    activeTab === 'basic' ? 'bold' : 'linear'
                                }/user-octagon.svg`,
                                activeTab === 'basic'
                            )}
                        />
                        <Text size={'10px'}>Básico</Text>
                    </Stack>
                </UnstyledButton>

                <Divider orientation="vertical" />

                <UnstyledButton onClick={handleSetActiveTab('inventory')}>
                    <Stack align="center" gap={0}>
                        <i
                            aria-hidden={true}
                            style={customIconStyles(
                                `/icons/${
                                    activeTab === 'inventory'
                                        ? 'bold'
                                        : 'linear'
                                }/archive.svg`,
                                activeTab === 'inventory'
                            )}
                        />
                        <Text size={'10px'}>Inventário</Text>
                    </Stack>
                </UnstyledButton>

                <Divider orientation="vertical" />

                <UnstyledButton onClick={handleSetActiveTab('skills')}>
                    <Stack align="center" gap={0}>
                        <i
                            aria-hidden={true}
                            style={customIconStyles(
                                `/icons/${activeTab === 'skills' ? 'bold' : 'linear'}/book.svg`,
                                activeTab === 'skills'
                            )}
                        />
                        <Text size={'10px'}>Habilidades</Text>
                    </Stack>
                </UnstyledButton>

                <Divider orientation="vertical" />

                <UnstyledButton onClick={handleSetActiveTab('magic')}>
                    <Stack align="center" gap={0}>
                        <IconCrystalBall
                            fill={
                                activeTab === 'magic'
                                    ? 'var(--do_color_primary_base)'
                                    : 'none'
                            }
                            color={
                                activeTab === 'magic'
                                    ? 'var(--mantine-color-body)'
                                    : 'var(--do_color_support_dark_30)'
                            }
                            size={28}
                            stroke={1.5}
                        />
                        <Text size={'10px'}>Magias</Text>
                    </Stack>
                </UnstyledButton>
            </Flex>
        </footer>
    )
}

const customIconStyles = (path: string, isActive: boolean) => ({
    display: 'flex',
    width: '32px',
    height: '32px',
    'background-color': isActive
        ? 'var(--do_color_primary_base)'
        : 'var(--do_color_support_dark_30)',
    mask: `url(${path}) no-repeat center`,
    'mask-size': '28px',
})

import { Avatar, Badge, Group, Text, UnstyledButton } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useAtom } from 'jotai'

import type { DnD5eMonster } from '@/assets/dnd/5e/interfaces'

import { selectedMonsterAtom } from '../state'

interface MonsterCardProps {
    monster: DnD5eMonster
}
export function MonsterCard({ monster }: MonsterCardProps) {
    const [showXp] = useLocalStorage({
        key: 'monster:showXp',
        defaultValue: false,
    })
    const [, setSelectedMonster] = useAtom(selectedMonsterAtom)
    const handleSetSelectedMonster = (monster: DnD5eMonster) => () => {
        setSelectedMonster(monster)
    }

    const getFraction = (cr: number) => {
        switch (cr) {
            case 0.125:
                return '1/8'
            case 0.25:
                return '1/4'
            case 0.5:
                return '1/2'
            default:
                return cr
        }
    }

    return (
        <UnstyledButton onClick={handleSetSelectedMonster(monster)}>
            <Group
                style={{
                    'border-radius': 'var(--do_border_radius_md)',
                    border: '1px solid var(--do_border_color)',
                    padding: '8px',
                    height: '80px',
                }}
            >
                <Avatar
                    src={`https://www.dnd5eapi.co${monster.image}`}
                    size={64}
                />

                <Group w="calc(100% - 80px)" gap={4}>
                    <Text w="100%" fw="bold">
                        {monster.name}
                    </Text>

                    <Group w="100%" justify="space-between" gap={0}>
                        <Text size="sm">
                            {monster.size} {monster.type}
                        </Text>

                        <Badge variant="filled" size="xs">
                            {showXp
                                ? `${monster.xp} XP`
                                : `CR ${getFraction(monster.challenge_rating)}`}
                        </Badge>
                    </Group>
                </Group>
            </Group>
        </UnstyledButton>
    )
}

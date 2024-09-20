import { Avatar, Group, Stack, Text } from '@mantine/core'

export default function TurnOrder() {
    const characters = Array(12).fill(null)

    return (
        <Stack align="center" gap="sm">
            <Text color="white" size={'12px'}>
                INICIATIVA
            </Text>
            <div>
                <Group wrap="nowrap">
                    {characters.map((_, i) => {
                        return <Avatar key={i} radius="xl" />
                    })}
                </Group>
            </div>
            <Text size={'14px'} color="var(--do_text_color_300)">
                <Text component="span" color="var(--do_color_info)">
                    Turno
                </Text>{' '}
                de{' '}
                <Text component="span" color="white">
                    {'{Char}'}.
                </Text>
            </Text>
        </Stack>
    )
}

import { Tooltip, UnstyledButton } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { MouseEventHandler, ReactNode, useState } from 'react'

interface ToggleTipProps {
    className?: string
    label: string | string[]
    children: ReactNode
}
export default function ToggleTip({
    className,
    label,
    children,
}: ToggleTipProps) {
    const [opened, setOpened] = useState(false)
    const ref = useClickOutside(() => setOpened(false))

    const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        setOpened((o) => !o)
    }

    return (
        <Tooltip
            className="relative z-10"
            w={320}
            label={label}
            multiline
            opened={opened}
        >
            <UnstyledButton
                ref={ref}
                className={className}
                onClick={handleToggle}
            >
                {children}
            </UnstyledButton>
        </Tooltip>
    )
}

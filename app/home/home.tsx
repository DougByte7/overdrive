'use client'

import {
    ActionIcon,
    Box,
    Button,
    Card,
    Flex,
    Group,
    Image,
    LoadingOverlay,
    Modal,
    Text,
    TextInput,
    Title,
    Transition,
    UnstyledButton,
} from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import {
    IconCrown,
    IconPlus,
    IconPuzzle,
    IconSearch,
    IconTrash,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type {
    CSSProperties,
    ChangeEventHandler,
    PropsWithChildren,
    ReactNode,
} from 'react'

import classes from '@/assets/dnd/5e/classes'
import races from '@/assets/dnd/5e/races'
import TopBar from '@/components/top-bar'
import useRouteGuard from '@/hooks/routeGuard'
import useCharacter from '@/hooks/useCharacter'
import { api } from '@/utils/api'
import { removeDiacritics } from '@/utils/removeDiacritics'

export default function Home() {
    const { characters } = useCharacter()
    useRouteGuard()

    const normalizedCharacters = useMemo(() => {
        return characters.map((character) => {
            return {
                id: character.id,
                name: character.name,
                detail: races[character.race!].name,
                extra: (
                    <Group gap={0} justify="space-between">
                        <Group gap="xs">
                            <IconCrown />
                            <Text
                                size={
                                    character.classes.length > 1 ? 'xs' : 'md'
                                }
                            >
                                {character.classes?.map((c) => (
                                    <>
                                        {classes[c.name].name} <br />
                                    </>
                                ))}
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <IconPuzzle />
                            <Text>
                                Nv{' '}
                                {character.classes.reduce(
                                    (acc, c) => acc + c.level,
                                    0
                                )}
                            </Text>
                        </Group>
                    </Group>
                ),
                imgSrc: character.picture,
            }
        })
    }, [characters])

    const [search, setSearch] = useDebouncedState('', 200)
    const [filteredCharacters, setFilteredCharacters] =
        useState(normalizedCharacters)
    const [visible, { toggle }] = useDisclosure(false)

    const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!normalizedCharacters.length) return
        setSearch(removeDiacritics(e.currentTarget.value.toLocaleLowerCase()))
    }

    useEffect(() => {
        if (!search) return setFilteredCharacters(normalizedCharacters)

        setFilteredCharacters(
            normalizedCharacters.filter((char) =>
                removeDiacritics(char.name.toLowerCase()).includes(search)
            )
        )
    }, [search, normalizedCharacters])

    return (
        <>
            <TopBar />
            <main className="relative mx-4 h-screen py-4">
                <LoadingOverlay
                    visible={visible}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ type: 'bars' }}
                />

                <TextInput
                    type="search"
                    mr={16}
                    ml={16}
                    size="lg"
                    placeholder="O que está procurando?"
                    rightSection={
                        <IconSearch
                            color="var(--do_color_primary_light_50)"
                            size={24}
                        />
                    }
                    onChange={handleFilter}
                />

                <div>
                    <div className="mx-4 mb-4 mt-8">
                        <Title className="text-white" size="h3">
                            Meus personagens
                        </Title>
                        <Text>Os heróis das minhas histórias...</Text>
                    </div>

                    <SideScrollingBox>
                        {!search && (
                            <UnstyledButton
                                component={Link}
                                href="/character/new"
                                onClick={toggle}
                            >
                                <Card
                                    className="flex flex-wrap items-center justify-center rounded-lg border border-dashed border-[#2a2f37] hover:border-brand-500"
                                    bg="transparent"
                                    w={240}
                                    h={345}
                                >
                                    <IconPlus
                                        className="mb-2"
                                        color="white"
                                        size="2rem"
                                    />

                                    <Text
                                        className="text-white"
                                        fw={600}
                                        ta="center"
                                    >
                                        Criar um personagem
                                    </Text>

                                    <Text size="sm" ta="center">
                                        Crie um personagem para utilizar onde
                                        quiser!
                                    </Text>
                                </Card>
                            </UnstyledButton>
                        )}
                        {filteredCharacters.map((character, i) => {
                            return (
                                <Transition
                                    key={i}
                                    mounted={true}
                                    transition="fade"
                                >
                                    {(styles) => (
                                        <CardCharacter
                                            style={styles}
                                            imgSrc={character.imgSrc}
                                            name={character.name}
                                            detail={character.detail}
                                            extra={character.extra}
                                            id={character.id ?? i}
                                            onClick={toggle}
                                        />
                                    )}
                                </Transition>
                            )
                        })}
                    </SideScrollingBox>
                </div>
            </main>
        </>
    )
}

interface CardCharacterProps {
    style: CSSProperties
    id: string
    imgSrc: string
    name: string
    detail: string
    extra?: ReactNode
    onClick: VoidFunction
}

function CardCharacter({
    style,
    imgSrc,
    name,
    detail,
    extra,
    id,
    onClick,
}: CardCharacterProps) {
    const fallbackImg =
        'https://img.freepik.com/vetores-gratis/guerreiro-escandinavo-de-personagem-viking-no-capacete_107791-15005.jpg?w=1380&t=st=1687125692~exp=1687126292~hmac=608bcc92a79a2fd9ae1a6b449b8537c476bdd3165c0c00c9f6ceaffa751d253d'

    const [opened, { open, close }] = useDisclosure(false)
    const { removeCharacter } = useCharacter()
    const { isLoading: isDeleteCharacterLoading } =
        api.characters.delete.useMutation()

    const handleRemove = () => {
        close()
        removeCharacter(id)
    }

    return (
        <>
            <Card
                className="bg-[var(--do\_color\_support\_dark\_50)]"
                style={style}
                radius={4}
                w={240}
                h={345}
                p={0}
            >
                <UnstyledButton
                    component="a"
                    href={`/character/${id}`}
                    onClick={onClick}
                >
                    <Image
                        src={imgSrc ?? fallbackImg}
                        radius="4px 0 0 4px"
                        h={240}
                        w={240}
                        alt="Retrato do personagem"
                    />

                    <div className="grid h-[105px] px-4 py-3">
                        <Text className="leading-none text-white" fw="bold">
                            {name}
                        </Text>
                        <Text size="sm">{detail}</Text>
                        {extra}
                    </div>
                </UnstyledButton>
                <ActionIcon
                    className="absolute right-2 top-2"
                    color="red"
                    title={`Excluir ${name}`}
                    onClick={open}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </Card>
            <Modal
                opened={opened}
                onClose={close}
                title={`Deseja apagar ${name} da existência?`}
                centered
                size="lg"
            >
                <Group justify="center">
                    <Button
                        className="w-full sm:w-auto"
                        variant="outline"
                        onClick={close}
                    >
                        NÃO!! EU CLIQUEI ERRADOOO!!!!
                    </Button>
                    <Button
                        className="w-full sm:w-auto"
                        onClick={handleRemove}
                        disabled={isDeleteCharacterLoading}
                        loading={isDeleteCharacterLoading}
                    >
                        Adeus velho amigo ;-;
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

function SideScrollingBox({ children }: PropsWithChildren) {
    return (
        <Box className="overflow-auto scrollbar-h-0" pr={16} pl={16}>
            <Flex className="w-max md:flex-wrap md:max-w-[100%]" gap="sm">
                {children}
            </Flex>
        </Box>
    )
}

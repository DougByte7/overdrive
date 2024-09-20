'use-client'

import { useUser } from '@clerk/nextjs'
import { useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { Input, parse } from 'valibot'

import { CharacterSheetSchema } from '@/assets/dnd/5e/utils/schemas/charater'
import storageKeys from '@/constants/storageKeys'
import { SupportedSystems } from '@/server/api/routers/characters'
import { api } from '@/utils/api'

export type Character = Input<typeof CharacterSheetSchema>
export default function useCharacter() {
    const utils = api.useUtils()

    const [localCharacters, setLocalCharacters, clearCharacters] =
        useLocalStorage<Character[]>({
            key: 'characters',
            defaultValue: [],
        })

    const { isLoaded, isSignedIn } = useUser()
    const isLoggedIn = isLoaded && isSignedIn

    const { data: remoteCharacters, isSuccess } =
        api.characters.getAll.useQuery()
    const {
        mutate: createCharacter,
        status: createCharacterStatus,
        error: createCharacterError,
    } = api.characters.create.useMutation()
    const { mutate: createManyCharacters } =
        api.characters.createMany.useMutation()
    const { mutate: updateCharacter } = api.characters.update.useMutation({
        onSuccess() {
            utils.characters.getAll.invalidate()
        },
    })
    const { mutate: deleteCharacter } = api.characters.delete.useMutation()

    // Validate local characters
    useEffect(() => {
        if (!localCharacters?.length) return

        try {
            localCharacters.forEach((data) => {
                parse(CharacterSheetSchema, data)
            })
        } catch (e) {
            console.error(e)
            clearCharacters()
        }
    }, [localCharacters])

    useEffect(() => {
        if (!isSuccess) return

        // Save characters of previously guest user now with new account
        if (
            window?.localStorage.getItem(storageKeys.user.isGuest) === 'true' &&
            isSignedIn &&
            localCharacters.length
        ) {
            addManyCharacters(localCharacters)

            window.localStorage.removeItem(storageKeys.user.isGuest)
            return
        }

        // Override local with remote to sync deleted characters from other devices
        setLocalCharacters(remoteCharacters?.map((c) => c.data as Character))
    }, [isSuccess])

    useEffect(() => {
        switch (createCharacterStatus) {
            case 'error': {
                notifications.show({
                    color: 'red',
                    title: 'Falha crítica ao salvar seu personagem!',
                    message:
                        createCharacterError.message ??
                        'Você precisará voltar a página inicial e recria-lo :/',
                })
            }
        }
    }, [createCharacterStatus])

    const addCharacter = (
        newCharacter: Character,
        system: SupportedSystems = 'SRD5'
    ) => {
        setLocalCharacters((prev) => [...prev, newCharacter])

        if (!isLoggedIn) return

        createCharacter({
            data: newCharacter,
            system,
        })
    }

    const addManyCharacters = (
        newCharacters: Character[],
        system: SupportedSystems = 'SRD5'
    ) => {
        setLocalCharacters((prev) => [...prev, ...newCharacters])

        if (!isLoggedIn) return

        createManyCharacters(
            newCharacters.map((c) => ({
                data: c,
                system,
            }))
        )
    }

    const getCharacter = (id: string) => {
        return localCharacters.find((char) => char.id === id)
    }

    const removeCharacter = (id: string) => {
        const filteredChars = localCharacters.filter((char) => char.id !== id)
        setLocalCharacters(filteredChars)
        deleteCharacter(id)
    }

    const handleUpdateCharacter = (id: string, newCharacter: Character) => {
        const index = localCharacters.findIndex((char) => char.id === id)
        if (index > -1) {
            setLocalCharacters((prev) => {
                prev[index] = newCharacter
                return prev
            })

            updateCharacter(newCharacter)
        }
    }

    return {
        characters: localCharacters,
        getCharacter,
        addCharacter,
        addManyCharacters,
        removeCharacter,
        updateCharacter: handleUpdateCharacter,
        clearCharacters,
    }
}

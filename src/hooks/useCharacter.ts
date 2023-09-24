import { CharacterForm } from "@/components/home/character-builder/interfaces"
import { useLocalStorage } from "@mantine/hooks"

export default function useCharacter() {
  const [characters, setCharacters] = useLocalStorage<CharacterForm[]>({
    key: "characters",
    defaultValue: [],
  })

  const addCharacter = (newCharacter: CharacterForm) => {
    setCharacters((prev) => [...prev, newCharacter])
  }

  const getCharacter = (id: string) => {
    return characters!.find((char) => char.id === id)
  }

  const removeCharacter = (id: string) => {
    const index = characters!.findIndex((char) => char.id === id)
    if (index > -1) {
      setCharacters((prev) => {
        prev.splice(index, 1)
        return prev
      })
    }
  }

  const updateCharacter = (
    id: string | number,
    newCharacter: CharacterForm
  ) => {
    const index = characters!.findIndex((char) => char.id === id)
    if (index > -1) {
      setCharacters((prev) => {
        prev[index] = newCharacter
        return prev
      })
    } else {
      /**
       * @todo remove this else when the id is properly defined
       */
      setCharacters((prev) => {
        prev[id as number] = newCharacter
        return prev
      })
    }
  }

  return {
    characters,
    getCharacter,
    addCharacter,
    removeCharacter,
    updateCharacter,
  }
}

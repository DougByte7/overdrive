"use-client";
import type { CharacterSheetProps } from "@/assets/dnd/5e/utils/CharacterSheet";

import { useLocalStorage } from "@mantine/hooks";

export default function useCharacter() {
  const [characters, setCharacters, clearCharacters] = useLocalStorage<
    CharacterSheetProps<"name">[]
  >({
    key: "characters",
    defaultValue: [],
  });

  const addCharacter = (newCharacter: CharacterSheetProps<"name">) => {
    setCharacters((prev) => [...prev, newCharacter]);
  };

  const getCharacter = (id: string) => {
    return characters.find((char) => char.id === id);
  };

  const removeCharacter = (id: string) => {
    const filteredChars = characters.filter((char) => char.id !== id);
    setCharacters(filteredChars);
  };

  const updateCharacter = (
    id: string,
    newCharacter: CharacterSheetProps<"name">,
  ) => {
    const index = characters.findIndex((char) => char.id === id);
    if (index > -1) {
      setCharacters((prev) => {
        prev[index] = newCharacter;
        return prev;
      });
    }
  };

  return {
    characters,
    getCharacter,
    addCharacter,
    removeCharacter,
    updateCharacter,
    clearCharacters,
  };
}

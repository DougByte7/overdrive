"use-client";
import type { CharacterSheetProps } from "@/assets/dnd/5e/utils/CharacterSheet";
import { CharacterSheetSchema } from "@/assets/dnd/5e/utils/schema";
import { SupportedSystems } from "@/server/api/routers/characters";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { parse } from "valibot";

// function merge<T>(a: T[], b: T[], predicate = (a: T, b: T) => a === b) {
//   const c = [...a];
//   b.forEach((bItem) =>
//     c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem),
//   );
//   return c;
// }

export default function useCharacter() {
  const [localCharacters, setLocalCharacters, clearCharacters] =
    useLocalStorage<CharacterSheetProps<"name">[]>({
      key: "characters",
      defaultValue: [],
    });

  const { isLoaded, isSignedIn } = useUser();
  const isLoggedIn = isLoaded && isSignedIn;

  const { data: remoteCharacters, isSuccess } =
    api.characters.getAll.useQuery();
  const { mutate: createCharacter, status: createCharacterStatus } =
    api.characters.create.useMutation();
  const { mutate: createManyCharacters } =
    api.characters.createMany.useMutation();
  const { mutate: deleteCharacter } = api.characters.delete.useMutation();

  // Validate local characters
  useEffect(() => {
    if (!localCharacters?.length) return;

    try {
      localCharacters.forEach((data) => {
        parse(CharacterSheetSchema, data);
      });
    } catch (e) {
      console.error(e);
      clearCharacters();
    }
  }, [localCharacters]);

  useEffect(() => {
    if (!isSuccess) return;

    // Save characters of previously guest user now with new account
    if (
      (window?.localStorage.getItem("user:isGuest") === "true" ||
        window?.localStorage.getItem("isLegacySync") !== "true") &&
      isSignedIn
    ) {
      addManyCharacters(localCharacters);
      window.localStorage.setItem("isLegacySync", "true");
      window.localStorage.removeItem("user:isGuest");
      return;
    }

    // Override local with remote to sync deleted characters from other devices
    setLocalCharacters(
      remoteCharacters?.map(
        (c) => c.data as unknown as CharacterSheetProps<"name">,
      ),
    );
  }, [isSuccess]);

  useEffect(() => {
    switch (createCharacterStatus) {
      case "error": {
        notifications.show({
          color: "red",
          title: "Falha crítica ao salvar seu personagem!",
          message: "Você precisará voltar a página inicial e recria-lo :/",
        });
      }
    }
  }, [createCharacterStatus]);

  const addCharacter = (
    newCharacter: CharacterSheetProps<"name">,
    system: SupportedSystems = "SRD5",
  ) => {
    setLocalCharacters((prev) => [...prev, newCharacter]);

    if (!isLoggedIn) return;

    createCharacter({
      data: newCharacter,
      system,
    });
  };

  const addManyCharacters = (
    newCharacters: CharacterSheetProps<"name">[],
    system: SupportedSystems = "SRD5",
  ) => {
    setLocalCharacters((prev) => [...prev, ...newCharacters]);

    if (!isLoggedIn) return;

    createManyCharacters(
      newCharacters.map((c) => ({
        data: c,
        system,
      })),
    );
  };

  const getCharacter = (id: string) => {
    return localCharacters.find((char) => char.id === id);
  };

  const removeCharacter = (id: string) => {
    const filteredChars = localCharacters.filter((char) => char.id !== id);
    setLocalCharacters(filteredChars);
    deleteCharacter(id);
  };

  const updateCharacter = (
    id: string,
    newCharacter: CharacterSheetProps<"name">,
  ) => {
    const index = localCharacters.findIndex((char) => char.id === id);
    if (index > -1) {
      setLocalCharacters((prev) => {
        prev[index] = newCharacter;
        return prev;
      });
    }
  };

  return {
    characters: localCharacters,
    getCharacter,
    addCharacter,
    addManyCharacters,
    removeCharacter,
    updateCharacter,
    clearCharacters,
  };
}

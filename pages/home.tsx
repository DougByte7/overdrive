import HomeComponent from "@/components/home";
import races from "@/assets/dnd/5e/races";
import useCharacter from "@/hooks/useCharacter";
import { useEffect } from "react";
import { CharacterSheetSchema } from "@/assets/dnd/5e/utils/schema";
import { parse } from "valibot";

export default function Home() {
  const campaigns: unknown[] = [];

  const {
    characters: storedCharacters,
    addCharacter,
    clearCharacters,
  } = useCharacter();

  useEffect(() => {
    if (!storedCharacters?.length) return;

    try {
      storedCharacters.forEach((data) => {
        parse(CharacterSheetSchema, data);
      });
    } catch (e) {
      console.error(e);
      clearCharacters();
    }
  }, [storedCharacters]);

  /**
   * @todo Create a generic interface for every system
   */
  const characters =
    storedCharacters?.map((character) => {
      return {
        id: character.id,
        campaignName: `${races[character.race!].name}, ${character.classes
          ?.map((c) => c.name)
          .join(" / ")}.`,
        campaignId: "1",
        name: character.name,
        imgSrc: character.picture,
      };
    }) ?? [];

  return (
    <HomeComponent
      campaigns={campaigns}
      characters={characters}
      setCharacters={addCharacter}
    />
  );
}

// import useRouteGuard from "@/hooks/routeGuard"
// import { LoadingOverlay } from "@mantine/core"
import HomeComponent from "@/components/home";
import races from "@/assets/dnd/5e/races";
import classes from "@/assets/dnd/5e/classes";
import { useLocalStorage } from "@mantine/hooks";
import type { CharacterForm } from "@/components/home/character-builder/interfaces";

export default function Home() {
  // const authStatus = useRouteGuard()
  // if (authStatus !== "authenticated") return <LoadingOverlay visible />

  const campaigns: unknown[] = [];
  // [
  //   {
  //     id: "1",
  //     limit: 4,
  //     imgSrc:
  //       "https://images.ctfassets.net/swt2dsco9mfe/5ufckdRJoL1Nh1XJv6clTt/1e8faa90bb0cfef53e3e5dbefc54b661/cos-rp.jpg",
  //     title: "Maldição de Strahd",
  //     description: "Estamos utilizando o D&D 5e, venha participar!",
  //     players: [
  //       { imgSrc: "", name: "test1" },
  //       { imgSrc: "", name: "test2" },
  //       { imgSrc: "", name: "test3" },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     limit: 4,
  //     imgSrc:
  //       "https://images.ctfassets.net/swt2dsco9mfe/2vBTubJNP0ZXwhKVZBHG9g/31300a00a34dd561c2e9e67da6a69476/1920x1342-ebberon.jpg?q=70",
  //     title: "Rising from the Last War",
  //     description:
  //       "Explore Sharn, uma cidade de arranha-céus, aeronaves e intrigas noir",
  //     players: [
  //       { imgSrc: "", name: "test4" },
  //       { imgSrc: "", name: "test5" },
  //       { imgSrc: "", name: "test6" },
  //     ],
  //   },
  // ]

  const [storedCharacters] = useLocalStorage<CharacterForm[]>({
    key: "characters",
    defaultValue: [],
  });

  /**
   * @todo Create a generic interface for every system
   */
  const characters =
    storedCharacters?.map((character: CharacterForm, i: number) => {
      return {
        id: i,
        campaignName: `${races[character.race!].name}, ${character.classes
          ?.map((c) => classes[c?.name].name)
          .join(" / ")}.`,
        campaignId: "1",
        name: character.name,
        imgSrc: character.picture,
      };
    }) ?? [];

  return <HomeComponent campaigns={campaigns} characters={characters} />;
}

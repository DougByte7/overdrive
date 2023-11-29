import {
  Card,
  TextInput,
  Title,
  Text,
  ActionIcon,
  Transition,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import CardCharacter from "./card-character";
import SideScrollingBox from "./side-scrolling-box";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { type ChangeEventHandler, useEffect, useState } from "react";
import { removeDiacritics } from "@/utils/removeDiacritics";
import Link from "next/link";

interface HomeComponentProps {
  campaigns: any[];
  characters: any[];
}

export default function HomeComponent({
  //  campaigns,
  characters,
}: HomeComponentProps) {
  const [search, setSearch] = useDebouncedState("", 200);
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!characters.length) return;
    setSearch(removeDiacritics(e.currentTarget.value.toLocaleLowerCase()));
  };

  useEffect(() => {
    if (!search) return setFilteredCharacters(characters);

    setFilteredCharacters(
      characters.filter(
        (char) =>
          removeDiacritics(char.name.toLowerCase()).includes(search) ||
          removeDiacritics(char.campaignName.toLowerCase()).includes(search),
      ),
    );
  }, [search, characters]);

  return (
    <>
      <main className="mx-4 py-4">
        <TextInput
          type="search"
          mr={16}
          ml={16}
          size="lg"
          placeholder="O que está procurando?"
          rightSection={
            <IconSearch color="var(--do_color_primary_light_50)" size={24} />
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
              <Card
                className="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-dashed border-[#2a2f37]"
                bg="transparent"
                w={240}
                h={345}
              >
                <Text className="text-white" fw={600} ta="center">
                  Criar um personagem
                </Text>

                <Text size="sm" ta="center">
                  Crie um personagem para utilizar onde quiser!
                </Text>

                <ActionIcon
                  mt="sm"
                  size="xl"
                  variant="transparent"
                  component={Link}
                  href="/character/new"
                  aria-label="Criar um personagem"
                >
                  <IconPlus color="white" size="1.5rem" />
                </ActionIcon>
              </Card>
            )}
            {filteredCharacters.map((character, i) => {
              return (
                <Transition key={i} mounted={true} transition="fade">
                  {(styles) => (
                    <CardCharacter
                      style={styles}
                      imgSrc={character.imgSrc}
                      name={character.name}
                      detail={character.detail}
                      extra={character.extra}
                      id={character.id ?? i}
                    />
                  )}
                </Transition>
              );
            })}
          </SideScrollingBox>
        </div>
      </main>
    </>
  );
}

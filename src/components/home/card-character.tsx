import { Card, Text, Image, UnstyledButton } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";

interface CardCharacterProps {
  style: CSSProperties;
  id: string;
  imgSrc: string;
  name: string;
  detail: string;
  extra?: ReactNode;
}

export default function CardCharacter({
  style,
  imgSrc,
  name,
  detail,
  extra,
  id,
}: CardCharacterProps) {
  const fallbackImg =
    "https://img.freepik.com/vetores-gratis/guerreiro-escandinavo-de-personagem-viking-no-capacete_107791-15005.jpg?w=1380&t=st=1687125692~exp=1687126292~hmac=608bcc92a79a2fd9ae1a6b449b8537c476bdd3165c0c00c9f6ceaffa751d253d";

  return (
    <Card
      className="bg-[var(--do\_color\_support\_dark\_50)]"
      style={style}
      radius={4}
      w={240}
      h={345}
      p={0}
    >
      <UnstyledButton component="a" href={`/character/${id}`}>
        <Image
          src={imgSrc ?? fallbackImg}
          radius="4px 0 0 4px"
          h={240}
          w={240}
          alt=""
        />

        <div className="grid h-[105px] px-4 py-3">
          <Text className="text-white leading-none" fw="bold">
            {name}
          </Text>
          <Text size="sm">{detail}</Text>
          {extra}
        </div>
      </UnstyledButton>
    </Card>
  );
}

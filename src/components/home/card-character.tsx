import useCharacter from "@/hooks/useCharacter";
import {
  Card,
  Text,
  Image,
  UnstyledButton,
  Paper,
  Button,
  Transition,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
  useState,
} from "react";

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

  const [showMenu, setShowMenu] = useState(false);
  const [pos, setPos] = useState({ x: 16, y: 16 });
  const ref = useClickOutside(() => setShowMenu(false));
  const { removeCharacter } = useCharacter();

  const handleOpenContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setShowMenu(true);
    setPos({
      x: e.clientX - 50,
      y: e.clientY,
    });
  };

  const handleRemove = () => {
    setShowMenu(false);
    removeCharacter(id);
  };

  return (
    <>
      <Card
        className="bg-[var(--do\_color\_support\_dark\_50)]"
        style={style}
        radius={4}
        w={240}
        h={345}
        p={0}
        onContextMenu={handleOpenContextMenu}
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

      <Transition mounted={showMenu} transition="pop" duration={200}>
        {(styles) => (
          <Paper
            ref={ref}
            shadow="xs"
            p="sm"
            className="fixed z-10"
            style={{
              ...styles,
              top: pos.y,
              left: pos.x,
            }}
          >
            <Button color="red" onClick={handleRemove}>
              Delete
            </Button>
          </Paper>
        )}
      </Transition>
    </>
  );
}

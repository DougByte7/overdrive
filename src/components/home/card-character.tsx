import useCharacter from "@/hooks/useCharacter";
import { api } from "@/utils/api";
import {
  Card,
  Text,
  Image,
  UnstyledButton,
  Button,
  ActionIcon,
  Modal,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { type CSSProperties, type ReactNode } from "react";

interface CardCharacterProps {
  style: CSSProperties;
  id: string;
  imgSrc: string;
  name: string;
  detail: string;
  extra?: ReactNode;
  onClick: VoidFunction;
}

export default function CardCharacter({
  style,
  imgSrc,
  name,
  detail,
  extra,
  id,
  onClick,
}: CardCharacterProps) {
  const fallbackImg =
    "https://img.freepik.com/vetores-gratis/guerreiro-escandinavo-de-personagem-viking-no-capacete_107791-15005.jpg?w=1380&t=st=1687125692~exp=1687126292~hmac=608bcc92a79a2fd9ae1a6b449b8537c476bdd3165c0c00c9f6ceaffa751d253d";

  const [opened, { open, close }] = useDisclosure(false);
  const { removeCharacter } = useCharacter();
  const { isLoading: isDeleteCharacterLoading } =
    api.characters.delete.useMutation();

  const handleRemove = () => {
    close();
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
  );
}

import { SignUp } from "@clerk/nextjs";
import { Stack, Title, Text, Button, Badge } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const { width } = useViewportSize();

  return (
    <main className="flex w-screen justify-center">
      <Stack className="h-screen max-w-[550px] p-4 md:p-20" align="center">
        <Image
          src="/images/icon-logo.svg"
          alt="d10 Logo: Dice Overdrive. Charge your rolls"
          width={100}
          height={100}
        />
        <div className="-mb-6">
          <Title className="leading-normal" ta="center">
            Dice Overdrive
          </Title>
          <Text ta="center">
            Sua primeira vez aqui? Crie uma conta ou faça login com uma
            existente.
          </Text>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: {
                marginBottom: "64px",
                width: "calc(100% - 32px)",
              },
              card: {
                boxShadow: "none",
                border: "none",
                padding: 0,
                width: "100%",
                backgroundColor: "transparent",
              },
              header: { display: "none" },
              socialButtonsIconButton: {
                marginTop: "3.7rem",
                height: "58px",
                backgroundColor: "var(--do_color_primary_base)",
                "&:hover": {
                  backgroundColor: "var(--do_color_primary_dark_10)",
                },
              },
              footer: { display: "none" },
            },
          }}
        />
        <Stack className="mt-14" gap="xs">
          <Button
            className="w-full"
            variant="outline"
            component={Link}
            href="/home"
            onClick={() => localStorage.setItem("user:name", "guest")}
          >
            Entrar sem usuário
          </Button>
          <Text size="xs" c="var(--do_text_color_300)">
            Seus dados serão armazenados em cache apenas neste dispositivo.
          </Text>
        </Stack>
        <Image
          className="mt-auto opacity-10"
          src="/images/FULL-LOGO.svg"
          alt="d10 Logo: Dice Overdrive. Charge your rolls"
          width={146}
          height={60}
        />
      </Stack>
      {width >= 768 && <Cover />}
    </main>
  );
}

function Cover() {
  const sources = [
    {
      imgUrl:
        "https://cdnb.artstation.com/p/assets/images/images/039/578/335/4k/roman-kuteynikov-magia-lunare-particular.jpg?1626301007",
      artist: "Roman Kuteynikov",
      portfolio: "https://www.artstation.com/rroland",
    },
    {
      imgUrl:
        "https://cdnb.artstation.com/p/assets/images/images/024/991/071/4k/graey-erb-dm-screen-sprex.jpg?1584212551",
      artist: "Graey Erb",
      portfolio: "https://www.artstation.com/graeyerb",
    },
  ];

  const src = useMemo(
    () => sources[Math.floor(Math.random() * sources.length)],
    [],
  );

  return (
    <>
      <div
        aria-hidden="true"
        style={{ backgroundImage: `url(${src.imgUrl})` }}
        className="h-screen w-full bg-cover bg-center"
      />
      <a
        className="fixed bottom-8 right-8 flex items-center gap-3 rounded-s border border-[#202123] bg-[#17151C] px-3 py-2 text-sm text-[#f2f2f2]"
        href={src.portfolio}
        target="_blank"
      >
        <IconExternalLink color="#13AFF0" size={20} />
        {src.artist}
      </a>
    </>
  );
}

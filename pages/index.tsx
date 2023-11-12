import {  SignUp } from "@clerk/nextjs";
import { Stack, Title, Text, Button,  } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const { width } = useViewportSize();

  return (
    <main className="flex w-screen justify-center">
      <Stack className="h-screen max-w-[550px] px-6 py-12 md:p-20" align="center">
        <Image
          src="/images/icon-logo.svg"
          alt="d10 Logo: Dice Overdrive. Charge your rolls"
          width={100}
          height={100}
        />
        <div className="mb-12">
          <Title className="leading-normal" ta="center" c="#F2F2F2" size="24px">
            Dice Overdrive
          </Title>
          <Text  className="leading-normal" ta="center">
            Sua primeira vez aqui? Crie uma conta ou faça login com uma
            existente.
          </Text>
          
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
              },
              card: {
                boxShadow: "none",
                border: "none",
                padding: 0,
                width: "100%",
                backgroundColor: "transparent",
              },
              header: { display: "none" },
              socialButtons:{
                display:"flex", justifyContent:"space-between", gap: "12px"
              },
              socialButtonsIconButton: {                
                borderRadius:4,
                height: "56px",
                width: "100%",
                backgroundColor: "white",

                "&:hover": {
                  backgroundColor: "white",
                  opacity: .80,
                },
              },
              footer: { display: "none" },
            },
          }}
        />
        
          <Button
            className="mt-3 w-full h-12 text-[#c8c8c8] bg-[#2A2F37] font-normal text-base"            
            component={Link}
            href="/home"
            onClick={() => localStorage.setItem("user:name", "guest")}
          >
            Entrar sem usuário
          </Button>
          
        
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

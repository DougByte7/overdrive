import { FunctionComponent } from "react";
import Head from "next/head";
import theme from "@/theme";
import { Analytics } from "@vercel/analytics/react";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Provider as JotaiProvider } from "jotai";
import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";

import "@mantine/core/styles.css";
import "src/styles/global.css";
import "src/styles/variables.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: FunctionComponent;
  pageProps: Record<string, any>;
}) {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diceoverdrive.com" />
        <meta property="og:site_name" content="Dice Overdrive" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta
          property="og:description"
          content="Dice Overdrive, sua plataforma definitiva para jogar RPG. Pegue os dados e vamos jogar!"
        />
        <meta
          name="keywords"
          content="dice, overdrive, vtt, virtual, tabletop, jogar, rpg, online"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Dice Overdrive</title>
      </Head>
      <ClerkProvider>
        <JotaiProvider>
          <MantineProvider theme={{ ...theme }} defaultColorScheme="dark">
            <Notifications />
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </MantineProvider>
        </JotaiProvider>
      </ClerkProvider>
      <Analytics />
    </>
  );
}

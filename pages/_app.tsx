import { FunctionComponent, useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import theme from "@/theme"
import { Analytics } from "@vercel/analytics/react"
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { ModalsProvider } from "@mantine/modals"
import { SessionProvider } from "next-auth/react"
import { Provider as JotaiProvider } from "jotai"
import "src/variables.css"

const IndexedDBContextProvider = dynamic(
  () => import("@/indexed-db/indexed-db-context"),
  {
    ssr: false,
  }
) as FunctionComponent<{ [k: string]: any }>

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: FunctionComponent
  pageProps: Record<string, any>
}) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

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
      <SessionProvider session={session}>
        <JotaiProvider>
          <IndexedDBContextProvider>
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <MantineProvider
                theme={{ colorScheme, ...theme }}
                withGlobalStyles
                withNormalizeCSS
              >
                <Notifications />
                <ModalsProvider>
                  <Component {...pageProps} />
                </ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </IndexedDBContextProvider>
        </JotaiProvider>
      </SessionProvider>
      <Analytics />
    </>
  )
}

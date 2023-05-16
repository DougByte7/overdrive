import { FunctionComponent } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import theme from "@/theme"
import { Analytics } from "@vercel/analytics/react"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { ModalsProvider } from "@mantine/modals"
import { SessionProvider } from "next-auth/react"
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
  return (
    <>
      <Head>
        <title>Dice Overdrive</title>
      </Head>
      <SessionProvider session={session}>
        <IndexedDBContextProvider>
          <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <Notifications />
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </MantineProvider>
        </IndexedDBContextProvider>
      </SessionProvider>
      <Analytics />
    </>
  )
}

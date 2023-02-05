import { FunctionComponent } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import theme from "@/theme"
import { SharedSheetInfoProvider } from "@/shared-states/shared-sheet-info"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Analytics } from "@vercel/analytics/react"

const IndexedDBContextProvider = dynamic(
  () => import("@/indexed-db/indexed-db-context"),
  {
    ssr: false,
  }
) as FunctionComponent<{ [k: string]: any }>

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: FunctionComponent
  pageProps: Record<string, any>
}) {
  return (
    <>
      <Head>
        <title>Dice Overdrive</title>
      </Head>
      <IndexedDBContextProvider>
        <SharedSheetInfoProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Component {...pageProps} />
          </ThemeProvider>
        </SharedSheetInfoProvider>
      </IndexedDBContextProvider>
      <Analytics />
    </>
  )
}

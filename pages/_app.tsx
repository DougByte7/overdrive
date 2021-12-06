import React, { FunctionComponent } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import theme from "@/theme"
import { SharedSheetInfoProvider } from "@/shared-states/shared-sheet-info"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';

const IndexedDBContextProvider = dynamic(
  () => import("@/indexed-db/indexed-db-context"),
  {
    ssr: false,
  }
)

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <IndexedDBContextProvider>
        <SharedSheetInfoProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SharedSheetInfoProvider>
      </IndexedDBContextProvider>
    </>
  )
}

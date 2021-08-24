import React, { FunctionComponent } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "@/theme"
import CssBaseline from "@material-ui/core/CssBaseline"
import { SharedSheetInfoProvider } from "@/shared-states/shared-sheet-info"

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

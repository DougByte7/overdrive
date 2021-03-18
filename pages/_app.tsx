import React, { FunctionComponent } from "react"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "@/theme"
import CssBaseline from "@material-ui/core/CssBaseline"

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
        <title>Virtual Tabletop</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

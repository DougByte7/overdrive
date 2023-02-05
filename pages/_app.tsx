import { FunctionComponent } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import theme from "@/theme"
import { SharedSheetInfoProvider } from "@/shared-states/shared-sheet-info"
import { ThemeProvider } from "@mui/material/styles"
import { Analytics } from "@vercel/analytics/react"
import { MantineProvider } from "@mantine/core"

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
            <MantineProvider
              theme={{
                fontFamily: "Manrope",
                primaryColor: "brand",
                colors: {
                  brand: [
                    "#b366d8",
                    "#a74dd2",
                    "#9a33cb",
                    "#8e1ac5",
                    "#8100be",
                    "#7400ab",
                    "#670098",
                    "#5a0085",
                    "#4d0072",
                    "#41005f",
                  ],
                },
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </ThemeProvider>
        </SharedSheetInfoProvider>
      </IndexedDBContextProvider>
      <Analytics />
    </>
  )
}

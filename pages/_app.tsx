import { FunctionComponent } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import theme from "@/theme"
import { SharedSheetInfoProvider } from "@/shared-states/shared-sheet-info"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

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
      </Head>
      <IndexedDBContextProvider>
        <SharedSheetInfoProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <style jsx global>{`
              body {
                /* width */
                ::-webkit-scrollbar {
                  width: 5px;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                  background: #f1f1f1;
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                  background: #ff6f00;
                }

                /* Handle on hover */
                ::-webkit-scrollbar-thumb:hover {
                  background: rgb(178, 77, 0);
                }

                /* Remove Arrows/Spinners */
                & input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button,
                input[type="number"] {
                  /* Chrome, Safari, Edge, Opera */
                  -webkit-appearance: none;
                  /* Firefox */
                  -moz-appearance: textfield;
                }
              }
            `}</style>
          </ThemeProvider>
        </SharedSheetInfoProvider>
      </IndexedDBContextProvider>
    </>
  )
}

import Head from "next/head"
import { FunctionComponent } from "react"

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
        <link rel="shortcut icon" href="/d10-electric.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="page-layout">
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
      </div>
    </>
  )
}

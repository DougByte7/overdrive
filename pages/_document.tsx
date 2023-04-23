/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/d10-electric.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body css={styles}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

const styles = css`
  &,
  * {
    /* width */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: var(--do_color_primary_base);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: var(--do_color_primary_dark_10);
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
`

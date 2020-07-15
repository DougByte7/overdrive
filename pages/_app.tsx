import "normalize.css";
import { FunctionComponent } from "react";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: FunctionComponent;
  pageProps: Record<string, any>;
}) {
  return <Component {...pageProps} />;
}

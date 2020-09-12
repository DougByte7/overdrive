import { FunctionComponent } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "@/theme";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: FunctionComponent;
  pageProps: Record<string, any>;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

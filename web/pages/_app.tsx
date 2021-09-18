import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;

import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

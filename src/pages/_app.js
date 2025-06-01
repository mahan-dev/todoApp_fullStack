import Layout from "@/components/layout/Layout";
import { defaultOptions } from "@/helper/reactQueryOptions";
import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({defaultOptions});

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
              

              <Component {...pageProps} />
              <ReactQueryDevtools  />
            </QueryClientProvider>
          </SessionProvider>
        </Layout>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

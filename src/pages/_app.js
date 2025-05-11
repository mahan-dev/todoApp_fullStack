import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

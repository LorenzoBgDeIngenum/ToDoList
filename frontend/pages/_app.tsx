import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { RequestEngineProvider } from "@/contexts/requestEngineContext"; // Assure-toi que le chemin est correct

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RequestEngineProvider> {/* Ajout du Provider ici */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RequestEngineProvider>
  );
}

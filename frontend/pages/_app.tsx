import "@/styles/globals.css";
import "@/styles/lists.css"
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { RequestEngineProvider } from "@/contexts/requestEngineContext"; 
import { Provider } from "@/components/ui/provider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
    <RequestEngineProvider> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RequestEngineProvider>
    </Provider>
  );
}

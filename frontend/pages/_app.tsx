import "@/styles/globals.css";
import "@/styles/lists.css"
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { RequestEngineProvider } from "@/contexts/requestEngineContext"; 
import { Provider } from "@/components/ui/provider"
import { UserProvider } from "@/contexts/userContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
    <RequestEngineProvider> 
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
    </RequestEngineProvider>
    </Provider>
  );
}

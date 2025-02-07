import { MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import Head from 'next/head';

import { RequestEngineProvider } from "@/contexts/requestEngineContext"; 
import { Provider } from "@/components/ui/provider";
import { UserProvider } from "@/contexts/userContext";
import Layout from "@/components/layout";

import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/lists.css";


export default function App({ Component, pageProps }: AppProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const sensors = useSensors(mouseSensor);

  return (
    <>
    <Head>
        <title>Your Page Title Here</title>
        <link rel="icon" href="/ingenum.jpeg" />
      </Head>
    <DndContext sensors={sensors}>
      <Provider>
        <RequestEngineProvider> 
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </RequestEngineProvider>
      </Provider>
    </DndContext>
    </>
  );
}

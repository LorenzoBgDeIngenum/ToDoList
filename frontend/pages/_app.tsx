import "@/styles/globals.css";
import "@/styles/lists.css"
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { RequestEngineProvider } from "@/contexts/requestEngineContext"; 
import { Provider } from "@/components/ui/provider"
import { UserProvider } from "@/contexts/userContext";
import {MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import React from 'react';
import {DndContext} from '@dnd-kit/core';

export default function App({ Component, pageProps }: AppProps) {
  //const requestEngine = useRequestEngine();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(
    mouseSensor
  );


  return (
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
  );
}

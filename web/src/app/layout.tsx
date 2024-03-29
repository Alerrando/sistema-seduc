"use client";
import Aside from "@/Components/Aside";
import Header from "@/Components/Header";
import { Roboto } from "next/font/google";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../configureStore";
import "./globals.css";
import Home from "./page";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export type RootLayoutProps = {
  children: React.ReactNode;
  showHeaderAside?: boolean;
};

export default function RootLayout({ children, showHeaderAside }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {showHeaderAside ? (
              <>
                <Aside />
                <Header />
              </>
            ) : null}
            <Home>{children}</Home>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

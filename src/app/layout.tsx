"use client";
import { Roboto } from "next/font/google";
import React from "react";
import { StateContextLogin, initialState } from "../../slice/LoginSlice";
import "./globals.css";
import Home from "./page";
import Aside from "../Components/Aside";
import Header from "../Components/Header";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export type RootLayoutProps = {
  children: React.ReactNode;
  showHeaderAside?: boolean;
};

export default function RootLayout({ children, showHeaderAside }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <StateContextLogin.Provider value={initialState}>
          {showHeaderAside && (
            <>
              <Aside />
              <Header />
            </>
          )}
          <Home>{children}</Home>
        </StateContextLogin.Provider>
      </body>
    </html>
  );
}

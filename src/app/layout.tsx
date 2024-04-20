"use client";
import { Roboto } from "next/font/google";
import React from "react";
import Aside from "../Components/Aside";
import Header from "../Components/Header";
import "./globals.css";
import Home from "./page";
import { StateProvider } from "../../slice";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export type RootLayoutProps = {
  children: React.ReactNode;
  showHeaderAside?: boolean;
};

export default function RootLayout({ children, showHeaderAside }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <StateProvider>
          {showHeaderAside && (
            <>
              <Aside />
              <Header />
            </>
          )}
          <Home>{children}</Home>
        </StateProvider>
      </body>
    </html>
  );
}

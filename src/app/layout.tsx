"use client";
import { Roboto } from "next/font/google";
import React from "react";
import Aside from "../Components/Aside";
import Header from "../Components/Header";
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
        {showHeaderAside && (
          <>
            <Aside />
            <Header />
          </>
        )}
        <Home>{children}</Home>
      </body>
    </html>
  );
}

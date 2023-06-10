"use client";
import React from "react";
import "./globals.css";
import { Roboto } from "next/font/google";
import Aside from "@/Components/Aside";
import { Provider } from "react-redux";
import { store } from "../../system";
import Header from "@/Components/Header";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata = {
	title: "sistema-gerenciamento-escolar",
	description: "Um sistema de gerenciamento de escolas, usando NextJS, Spring Boot, Typescript",
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="pt-br">
			<body className={roboto.className}>
				<Provider store={store}>
					<Aside />
					<Header />
					{children}
				</Provider>
			</body>
		</html>
	);
}

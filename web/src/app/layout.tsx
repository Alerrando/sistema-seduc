"use client";
import Aside from "@/Components/Aside";
import Header from "@/Components/Header";
import { Roboto } from "next/font/google";
import React from "react";
import { Provider } from "react-redux";
import "./globals.css";
import Home from "./page";
import { store } from "../../configureStore";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export type RootLayoutProps = {
	children: React.ReactNode,
	showHeaderAside?: boolean,
}

export default function RootLayout({ children, showHeaderAside }: RootLayoutProps) {
	return (
		<html lang="pt-br">
			<body className={roboto.className}>
				<Provider store={store}>
					{showHeaderAside ? (
						<>
							<Aside />
							<Header />
						</>
					) : null}
					<Home>
						{children}
					</Home>
				</Provider>
			</body>
		</html>
	);
}
"use client";
import React, { Fragment } from "react";
import "./globals.css";
import { Roboto } from "next/font/google";
import Aside from "@/Components/Aside";
import { Provider } from "react-redux";
import { store } from "../../system";
import Header from "@/Components/Header";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

type RootLayoutProps = {
	children: React.ReactNode,
	showHeaderAside: boolean,
}

export default function RootLayout({ children, showHeaderAside }: RootLayoutProps) {
	return (
		<html lang="pt-br" >
			<body className={roboto.className}>
				<Provider store={store}>
					{showHeaderAside ? (
						<>
							<Aside />
							<Header />
						</>
					) : null}
					{children}
				</Provider>
			</body>
		</html>
	);
}

import { Roboto_Flex } from 'next/font/google'

import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import {AVAILABLE_LOCALES, t} from "@/i18n/i18n"

import 'maplibre-gl/dist/maplibre-gl.css';
import "@/globals.css";
import React from "react";
import {LangProvider} from "@/contexts/LangContext";

const roboto = Roboto_Flex({
	subsets: ["latin"],
	display: "swap"
});


export default function RootLayout({children, params: {lang}}) {
	return (
		<html lang={lang} className={roboto.className}>
			<head>
				<meta name="description" content={t(lang, 'web.description')}/>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<link rel="canonical" href="https://cbbdb.uib.eu/"/>
				<link rel="alternate" hrefLang="en" href="https://cbbdb.uib.eu"/>
				<link rel="alternate" hrefLang="es" href="https://cbbdb.uib.es"/>
				<link rel="alternate" hrefLang="ca" href="https://cbbdb.uib.ca"/>
				<link rel="alternate" hrefLang="x-default" href="https://cbbdb.uib.eu"/>
				<link rel="icon" type="image/png" href="/images/favicon/favicon-96x96.png" sizes="96x96"/>
				<link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg"/>
				<link rel="shortcut icon" href="/images/favicon/favicon.ico"/>
				<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
				<meta name="apple-mobile-web-app-title" content="CBBDB"/>
				<link rel="manifest" href="/images/favicon/site.webmanifest"/>
			</head>
			<body className="w-full min-h-screen m-0">
				<Header lang={lang} className="min-h-[64px]" locales={AVAILABLE_LOCALES}/>
				<main className="min-h-[90vh] w-full">
					<LangProvider initialState={lang}>
						{children}
					</LangProvider>
				</main>
				<Footer lang={lang}/>
			</body>
		</html>
	);
}

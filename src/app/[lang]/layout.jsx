import { Roboto_Flex } from 'next/font/google'

import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import {AVAILABLE_LOCALES, t} from "@/i18n/i18n"

import 'maplibre-gl/dist/maplibre-gl.css';
import "@/globals.css";
import React, {use} from "react";
import { GoogleAnalytics } from '@next/third-parties/google'
import WIPToast from "@/components/common/WIPToast";
import {Providers} from "@/app/providers";
import {CanonicalHead} from "@/components/CanonicalHead";
import Maintenance from "@/components/Maintenance";
import FooterSeparator from "@/components/FooterSeparator";

const roboto = Roboto_Flex({
	subsets: ["latin"],
	display: "swap"
});


export default function RootLayout({children, params}) {
	const {lang} = use(params);

	return (
		<html lang={lang} className={roboto.className} suppressHydrationWarning>
			<head>
				<meta name="description" content={t(lang, 'web.description')}/>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>

				<meta name="language" content={lang}/>
				<CanonicalHead lang={lang}/>
				{/*<link rel="canonical" href="https://balearica.uib.eu"/>*/}
				{/*<link rel="alternate" hrefLang="en" href="https://balearica.uib.eu"/>*/}
				{/*<link rel="alternate" hrefLang="es" href="https://balearica.uib.es"/>*/}
				{/*<link rel="alternate" hrefLang="ca" href="https://balearica.uib.ca"/>*/}
				{/*<link rel="alternate" hrefLang="x-default" href="https://balearica.uib.eu"/>*/}

				<link rel="icon" type="image/png" href="/images/favicon/favicon-96x96.png" sizes="96x96"/>
				<link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg"/>
				<link rel="shortcut icon" href="/images/favicon/favicon.ico"/>
				<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
				<meta name="apple-mobile-web-app-title" content="Balearica"/>
				<link rel="manifest" href="/images/favicon/site.webmanifest"/>

				<meta property="og:title" content={t(lang, 'web.title')}/>
				<meta property="og:description" content={t(lang, 'web.description')}/>
				<meta property="og:image" content="images/pages/home/home.jpg"/>
				<meta property="og:url" content="https://balearica.uib.eu"/>
				<meta property="og:type" content="website"/>
			</head>
			<body className="w-full min-h-screen m-0">
				<Header lang={lang} className="min-h-[64px] py-[12px]" locales={AVAILABLE_LOCALES}/>
				<main className="min-h-[calc(100vh-64px-12px*2)] w-full">
					<Providers lang={lang}>
						<Maintenance>
							{children}
							<WIPToast/>
						</Maintenance>
					</Providers>
				</main>
				<FooterSeparator lang={lang}/>
				<Footer lang={lang}/>
			</body>
			<GoogleAnalytics gaId="G-5T5J9YQ15G"/>
		</html>
	);
}

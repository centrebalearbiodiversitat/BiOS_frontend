import {Inter} from "next/font/google";

import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import Providers from "@/app/providers";
import {AVAILABLE_LOCALES, t} from "@/i18n/i18n"

import "@/globals.css";
import 'maplibre-gl/dist/maplibre-gl.css';

const inter = Inter({subsets: ["latin"]});


export default function RootLayout({children, params: {lang}}) {
	return (
		<html>
			<head>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<link rel="icon" type="image/svg+xml" href="/images/favicon.svg"/>
				{/*<meta name="generator" content={Astro.generator}/>*/}
				<title>{t(lang,  'web.title')}</title>
				<meta name="description" content={t(lang,  'web.description')}/>
			</head>
			<body>
				<Providers className="flex flex-col min-h-screen m-0">
					<Header lang={lang} locales={AVAILABLE_LOCALES}/>
					<main className="flex flex-1 flex-col">
						{children}
					</main>
				</Providers>
				<Footer/>
			</body>
		</html>
	);
}

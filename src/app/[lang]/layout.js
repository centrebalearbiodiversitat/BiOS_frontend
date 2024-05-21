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
				<meta name="viewport" content="width=device-width"/>
				<link rel="icon" type="image/svg+xml" href="/images/favicon.svg"/>
				{/*<meta name="generator" content={Astro.generator}/>*/}
				<title>{t(lang,  'web.title')}</title>
				<meta name="description" content={t(lang,  'web.description')}/>
			</head>
			<body className="h-full">
				<Providers>
					<main className="h-screen">
						<Header lang={lang} locales={AVAILABLE_LOCALES}/>
						{children}
					</main>
					<Footer/>
				</Providers>
			</body>
		</html>
	);
}

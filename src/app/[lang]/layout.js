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
		<html lang={lang}>
			<head>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<link rel="icon" type="image/svg+xml" href="/images/favicon.svg"/>
				<title>{t(lang, 'web.title')}</title>
				<meta name="description" content={t(lang, 'web.description')}/>
			</head>
			<body className="h-screen m-0">
				<Header lang={lang} className="h-[10%]" locales={AVAILABLE_LOCALES}/>
				<main className="h-[90%]">
					{children}
					<Footer/>
				</main>
			</body>
		</html>
	);
}

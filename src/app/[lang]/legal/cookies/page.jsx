import React from "react";
import {t} from "@/i18n/i18n";
import {Body, Section, Title} from "@/components/common/Article";
import {generatePageTitle} from "@/utils/utils";


const LAST_UPDATE = "2024-10-30"


export async function generateMetadata({params: {lang}}) {
	return {
		title: generatePageTitle(lang, t(lang, 'cookies.title')),
	}
}

export default function Privacy({params: {lang}}) {

	return (
		<>
			<header>
				<h1 className="font-light text-3xl md:text-5xl text-center text-accent">{t(lang, 'cookies.title')}</h1>
				<h2 className="font-light mx-12 leading-5 text-medium md:text-lg text-center mt-2">{t(lang, 'cookies.subtitle').replace("{update}", LAST_UPDATE)}</h2>
			</header>
			<div className="font-light flex flex-col gap-8">
				<Section>
					<Title lang={lang} textKey="cookies.usage.title"/>
					<Body lang={lang} textKey="cookies.usage.p"/>
				</Section>
			</div>
		</>
	);
}

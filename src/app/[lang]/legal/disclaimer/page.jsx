import React from "react";
import {t} from "@/i18n/i18n";
import {Body, Section, Title} from "@/components/common/Article";


const LAST_UPDATE = "2024-10-30"

export default function Privacy({params: {lang}}) {

	return (
		<>
			<header>
				<h1 className="font-light text-3xl md:text-5xl text-center text-accent">{t(lang, 'disclaimer.title')}</h1>
				<h2 className="font-light mx-12 leading-5 text-medium md:text-lg text-center mt-2">{t(lang, 'disclaimer.subtitle').replace("{update}", LAST_UPDATE)}</h2>
			</header>
			<div className="font-light flex flex-col gap-8">
				<Section>
					<Title lang={lang} textKey="disclaimer.usage.title"/>
					<Body lang={lang} textKey="disclaimer.usage.p"/>
				</Section>
				<Section>
					<Title lang={lang} textKey="disclaimer.contractual.title"/>
					<Body lang={lang} textKey="disclaimer.contractual.p"/>
				</Section>
				<Section>
					<Title lang={lang} textKey="disclaimer.content.title"/>
					<Body lang={lang} textKey="disclaimer.content.p"/>
				</Section>
				<Section>
					<Title lang={lang} textKey="disclaimer.downtime.title"/>
					<Body lang={lang} textKey="disclaimer.downtime.p"/>
				</Section>
			</div>
		</>
	);
}

import React, {use} from "react";
import {t} from "@/i18n/i18n";
import {Body, Section, Title} from "@/components/common/Article";
import {generatePageTitle} from "@/utils/utils";


const LAST_UPDATE = "2024-10-30"


export async function generateMetadata({params}) {
	const {lang} = await params;
	const title = generatePageTitle(lang, t(lang, 'privacy.title'));

	return {
		title,
		openGraph: {
			title
		}
	}
}

export default function Privacy({params}) {
	const {lang} = use(params);

	return (
		<>
			<header>
				<h1 className="font-light text-3xl md:text-5xl text-center text-accent">{t(lang, 'privacy.title')}</h1>
				<h2 className="font-light mx-12 leading-5 text-medium md:text-lg text-center mt-2">{t(lang, 'privacy.subtitle').replace("{update}", LAST_UPDATE)}</h2>
			</header>
			<div className="font-light flex flex-col gap-8">
				<Section>
					<Title lang={lang} textKey="privacy.info_lssi.title"/>
					<Body lang={lang} textKey="privacy.info_lssi.p"/>
				</Section>
				<Section>
					<Title lang={lang} textKey="privacy.intelectual_property.title"/>
					<Body lang={lang} textKey="privacy.intelectual_property.p"/>
				</Section>
				<Section>
					<Title lang={lang} textKey="privacy.policy.title"/>
					<Body lang={lang} textKey="privacy.policy.p"/>
				</Section>
				<Section>
					<Title lang={lang} textKey="privacy.forms.title"/>
					<Body lang={lang} textKey="privacy.forms.p"/>
				</Section>
			</div>
		</>
	);
}

import React from "react";
import {generatePageTitle} from "@/utils/utils";
import {t} from "@/i18n/i18n";
import ArticleHeader from "@/app/[lang]/(sources)/components/ArticleHeader";
import versioning from "@/API/versioning"
import SourceCard from "@/app/[lang]/(sources)/components/SourceCard";
import {Tab, Tabs} from "@/components/common/Tabs";

export async function generateMetadata({params}) {
	const {lang} = await params;

	return {
		title: generatePageTitle(lang, t(lang, 'components.header.button.about')),
		"og:title": generatePageTitle(lang, t(lang, 'components.header.button.about')),
	}
}

export default async function About({params}) {
	const {lang} = await params;
	const sources = await versioning.aList();

	return (
		<>
			<Tabs variant="underlined">
				<Tab key="photos" title="Photos">
					Test
				</Tab>
				<Tab key="music" title="Music">
					Test
				</Tab>
				<Tab key="Code" title="Code">
					Test
				</Tab>
			</Tabs>
			<ArticleHeader header="sources.title" subheader="sources.subtitle"
			               image={{
							   title: "Wikipedia | Albert Masats, public domain (PD)",
							   src: "/images/pages/sources/podarcis.png",
							   alt: "Sargantana de Formentera Podarcis pityusensis",
			               }}
			               redirect={`/${lang}/taxon/search?q=Podarcis pityusensis`}/>
			<div className="grid grid-cols-3 gap-2">
				{
					sources.filter(s => s.sourceType === "database").map(
						s => (
							<SourceCard key={s.id} source={s}/>
						)
					)
				}
			</div>
		</>
	);
}

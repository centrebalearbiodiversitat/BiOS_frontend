import React from "react";
import {generatePageTitle} from "@/utils/utils";
import {t} from "@/i18n/i18n";
import versioning from "@/API/versioning"
import {SourceTab} from "@/app/[lang]/(sources)/components/SourceTab";
import Link from "next/link";
import CBBButton from "@/components/common/CBBButton";
import Empty from "@/components/Empty";

export async function generateMetadata({params}) {
	const {lang} = await params;

	return {
		title: generatePageTitle(lang, t(lang, 'components.header.button.sources')),
		"og:title": generatePageTitle(lang, t(lang, 'components.header.button.sources')),
	}
}

const SOURCE_TYPES = [
	"expert",
	"database",
	"museum",
	"journal_article",
	"book",
	"web_page",
	"document",
]

export default async function About({params, searchParams}) {
	const {lang} = await params;
	let {type} = await searchParams;

	if (type === undefined) {
		type = "expert";
	}

	const sources = await versioning.basisList(type);

	return (
		<>
			<div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
				{
					SOURCE_TYPES.map(
						t => <TabLink key={t} lang={lang} type={t} selected={type === t}/>
					)
				}
			</div>
			<article className="px-6 flex justify-center">
				<Empty className="w-full" lang={lang} isEmpty={sources.length === 0}>
					<SourceTab lang={lang} title={t(lang, `sources.types.${type}`)}
					           data={sources}/>
				</Empty>
			</article>
		</>
	);
}

function TabLink({lang, type, selected}) {
	return (
		<CBBButton color={selected ? "primary" : "default"} as={Link} href={`?type=${type}`}>
			{t(lang, `sources.types.${type}`)}
		</CBBButton>
	)
}
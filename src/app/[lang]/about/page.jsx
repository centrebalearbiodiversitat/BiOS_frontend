import React, {use} from "react";
import AboutApp from "@/sections/AboutApp";
import AboutBulletPoints from "@/sections/AboutBulletPoints";
import {generatePageTitle} from "@/utils/utils";
import {t} from "@/i18n/i18n";

export async function generateMetadata({params}) {
	const {lang} = await params;
	const title = generatePageTitle(lang, t(lang, 'components.header.button.about'));

	return {
		title,
		openGraph: {
			title
		}
	}
}

export default function About({params}) {
	const {lang} = use(params);

	return (
		<>
			<article className="min-h-full flex justify-center items-center">
				<AboutApp lang={lang}/>
			</article>
			<article className="min-h-full">
				<AboutBulletPoints lang={lang}/>
			</article>
		</>
	);
}

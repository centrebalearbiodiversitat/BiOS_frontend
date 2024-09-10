import React from "react";
import {t} from "@/i18n/i18n";


function TextBlock({number, numberColor, titleKey, textKey, lang}) {
	return (
		<div className="space-y-6 font-extralight">
			<h3 className={`text-5xl ${numberColor}`}>/ {number}</h3>
			<h2 className="text-black text-4xl">{t(lang, titleKey)}</h2>
			<p className="text-pretty text-black leading-7">{t(lang, textKey)}</p>
		</div>
	)
}


export default function AboutBulletPoints({lang}) {

	return (
		<section className="px-10 mt-8 md:gap-16 md:px-[10vw] m-auto">
			<h1 className="text-center text-6xl font-extralight">{t(lang, "about.our_methodology")}</h1>
			<div className="my-[10vh] grid grid-cols-1 md:grid-cols-2 gap-20 max-w-[1100px] m-auto">
				<TextBlock lang={lang} number={1} numberColor="text-secondary"
				           titleKey={"about.block.taxonomy"}
				           textKey={"about.block.taxonomy.text"}/>
				<TextBlock lang={lang} number={2} numberColor="text-primary"
				           titleKey={"about.block.distribution"}
				           textKey={"about.block.distribution.text"}/>
				<TextBlock lang={lang} number={3} numberColor="text-accent"
				           titleKey={"about.block.genetic"}
				           textKey={"about.block.genetic.text"}/>
				<TextBlock lang={lang} number={4} numberColor="text-amber-500"
				           titleKey={"about.block.traits"}
				           textKey={"about.block.traits.text"}/>
			</div>
		</section>
	);
}
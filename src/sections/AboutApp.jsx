import React from "react";
import {
	Link,
} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {t} from "@/i18n/i18n";

export default function AboutApp({lang}) {

	return (
		<section className="h-full grid grid-cols-2  px-10 md:gap-16 md:px-[10vw] m-auto">
			<div className="col-span-full md:col-span-1 m-auto">
				<h1 className="text-5xl font-extralight">
					{t(lang, "about.question")}
				</h1>
				<section className="text-gray-500 font-normal text-sm leading-6">
					<br/>
					<p className="text-pretty">{t(lang, "about.answer_1")}</p>
					<br/>
					<br/>
					<p className="text-pretty">{t(lang, "about.answer_2")}</p>
				</section>
			</div>
			<div className="mx-auto flex w-full h-full col-span-full md:col-span-1 max-w-[500px]">
				<div className="m-auto grid grid-cols-2 gap-4">
					<Link href={`/${lang}/taxon/search?q=Upupa epops`} className="mb-20">
						<Image alt="Upupa epops" removeWrapper={true} src="/images/about/upupa.png"
						       className="object-cover w-full h-full"/>
					</Link>
					<Link href={`/${lang}/taxon/search?q=Alytes muletensis`} className="mt-20">
						<Image alt="Alytes muletensis" removeWrapper={true} src="/images/about/ferreret.jpg"
						       className="object-cover w-full h-full"/>
					</Link>
				</div>
			</div>
		</section>
	);
}
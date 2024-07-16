"use client"

import {t} from "@/i18n/i18n";
import ChecklistNavigator from "@/components/ChecklistNavigator";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import {Image} from "@nextui-org/react";
import React from "react";
import Statistics from "@/components/Statistics";
import taxonomy from "@/API/taxonomy"
import occurrences from "@/API/occurrences";
import genetics from "@/API/genetics";
import {PiButterflyFill, PiDna, PiMagnifyingGlassBold} from "react-icons/pi";

const CBB_STATISTICS = [
	{
		title: "home.statistics.species",
		icon: <PiButterflyFill/>,
		fetchData: () => taxonomy.childrenCount(1, 'species'),
	},
	{
		title: "home.statistics.observations",
		icon: <PiMagnifyingGlassBold/>,
		fetchData: () => occurrences.listCount(1),
	},
	{
		title: "home.statistics.sequences",
		icon: <PiDna/>,
		fetchData: () => genetics.listCountSequences(1),
	},
]

export default function Home({params: {lang}}) {

	return (
		<>
			<div className="absolute flex-grow top-0 min-h-full grid grid-cols-12"
			     style={{
				     backgroundRepeat: 'no-repeat',
				     backgroundSize: 'cover',
				     backgroundPosition: 'center',
				     backgroundImage: "url('https://img.freepik.com/free-photo/beautiful-selective-shot-black-swallowtail-butterfly-pollinating-purple-thistle-flower_181624-46796.jpg?t=st=1720104249~exp=1720107849~hmac=8ad245ee29007156feb90c1ddc2eb5a00a340385610f828d72668a5ead2869a8&w=900')"
			     }}>
				<div className="col-start-6 col-span-5 2xl:col-start-6 2xl:col-span-5 flex flex-col justify-center items-center">
					<header className="flex flex-col justify-center items-center mb-5 space-y-2">
						<h3 className="w-full font-light text-xl text-white-drop-shadow">
							{t(lang, "home.subtitle")}
						</h3>
						<h2 className="w-full font-light text-pretty text-5xl text-white-drop-shadow">
							{t(lang, "home.title")}
						</h2>
					</header>
					<FullCBBSearchBar lang={lang} showFilters={false} rounded={false}/>
					<Statistics lang={lang} className="my-6" data={CBB_STATISTICS}/>
					<div className="flex flex-row space-x-4">
						<Image src="/images/partners/eu_next_gen.png" alt={"Partners logos"} className="" radius={null}/>
						<Image src="/images/partners/gob_es.png" alt={"Partners logos"} className="" radius={null}/>
						<Image src="/images/partners/plan-recuperacion.png" alt={"Partners logos"} className="" radius={null}/>
						<Image src="/images/partners/goib.png" alt={"Partners logos"} className="" radius={null}/>
					</div>
				</div>
			</div>
			<div className="h-full min-h-full"/>
			<div className="m-4 grid grid-cols-1 md:grid-cols-3">
				<div className="col-span-1 md:col-start-2">
					<h3 className="text-2xl">
						Checklist
					</h3>
					<ChecklistNavigator lang={lang}/>
				</div>
			</div>
		</>
	)
}
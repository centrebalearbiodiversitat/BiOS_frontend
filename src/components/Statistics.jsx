"use client"

import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import Loading from "@/components/common/Loading";
import taxonomy from "@/API/taxonomy"
import occurrences from "@/API/occurrences";
import genetics from "@/API/genetics";
import {PiButterflyFill, PiDna, PiMagnifyingGlassBold} from "react-icons/pi";
import clsx from "clsx";

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


function DataCard({lang, title, icon, fetchData}) {
	const [data, setData] = useState(undefined);


	useEffect(() => {
		fetchData().then(payload => setData(payload))
	}, [fetchData]);

	return (
		<div className="flex-1 w-full h-full py-1">
			<div className="flex flex-col md:flex-row justify-center flex-wrap overflow-hidden m-auto">
				<div className="hidden md:block my-auto me-4 text-5xl text-black justify-center items-center">
					{icon}
				</div>
				<div className="flex flex-col justify-center">
					<div className="flex justify-center">
						<Loading loading={data} className="" width="60px" height="40px">
							<h3 className="font-semibold text-2xl text-center">
								{data}
							</h3>
						</Loading>
					</div>
					<h4 className="font-light text-center">{t(lang, title)}</h4>
				</div>
			</div>
		</div>
	)
}


export default function Statistics({lang, className}) {

	return (
		<div className={clsx("bg-white/100 py-2 divide-x container flex flex-col md:flex-row rounded-md", className)}>
			{
				CBB_STATISTICS.map((item, index) => <DataCard {...item} key={index} lang={lang}/>)
			}
		</div>
	);
}
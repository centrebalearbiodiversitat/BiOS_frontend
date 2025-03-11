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
		fetchData().then(payload => setData(payload.toLocaleString()))
	}, [fetchData]);

	return (
		<div className="flex-1 w-full h-full px-2">
			<div className="flex flex-col gap-2 sm:gap-3 sm:flex-row justify-center items-center overflow-hidden m-auto">
				<div className="my-auto text-4xl md:text-3xl xl:text-5xl text-black justify-center items-center">
					<Loading loading={data} width="48px" height="48px">
						{icon}
					</Loading>
				</div>
				<div className="flex flex-col justify-center align-middle">
					<div className="flex justify-center">
						<Loading loading={data} className="mb-1" width="95px" height="28px">
							<span className="font-semibold text-base sm:text-xl xl:text-2xl text-center leading-4">
								{data}
							</span>
						</Loading>
					</div>
					<Loading loading={data} className="mx-auto" width="65px" height="20px">
						<span className="font-light text-sm sm:text-base text-center">
							{t(lang, title)}
						</span>
					</Loading>
				</div>
			</div>
		</div>
	)
}


export default function Statistics({lang, className}) {

	return (
		<div className={clsx("bg-white/100 py-3 sm:py-5 divide-x grid grid-cols-3 rounded-2xl", className)}>
			{
				CBB_STATISTICS.map((item, index) => (
					<DataCard {...item} key={index} lang={lang}/>
				))
			}
		</div>
	);
}
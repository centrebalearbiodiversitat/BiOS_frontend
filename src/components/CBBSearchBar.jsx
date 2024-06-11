"use client"

import React, {useState} from "react";
import taxonomy from "@/API/taxonomy"
import SearchBar from "@/components/SearchBar";
import {useRouter} from "next/navigation";
import CBBButton from "@/components/CBBButton";
import {t} from "@/i18n/i18n";


const FILTER_BUTTONS = [
	{textKey: "components.searchbar.filter.map"},
	{textKey: "components.searchbar.filter.taxonomy"},
	{textKey: "components.searchbar.filter.authors"},
	{textKey: "components.searchbar.filter.genetics"},
]


export default function CBBSearchBar({lang, disableFilters, defaultFilter}) {
	const [query, setQuery] = useState([0]);
	const [filter, setFilter] = useState(defaultFilter === true | 0);
	const router = useRouter();

	function onSelected(payload) {
		router.push(`/${lang}/taxon/${payload}`)
	}

	function parseResults(payload) {
		setQuery(payload);
	}

	return (
		<>
			{ !disableFilters &&
			<div className="w-full flex flex-row space-x-2 mb-2">
				{
					FILTER_BUTTONS.map((fbutton, idx) => (
						<CBBButton key={idx} onPress={() => setFilter(idx)}
						           className={`${idx === filter ? "bg-white text-black" : "text-white bg-black/20 backdrop-blur-sm"} font-medium !opacity-100 hover:bg-white px-8 hover:text-black border-0`}>
							{t(lang, fbutton.textKey)}
						</CBBButton>

					))
				}
			</div>
			}
			<SearchBar data={query} onSelected={onSelected} className="rounded-full w-[100%]"
			           label={t(lang, "components.searchbar.label")}
			           onInput={input => taxonomy.search(input).then(parseResults)}/>
		</>
	)
		;
}

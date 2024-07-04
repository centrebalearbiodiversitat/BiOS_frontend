"use client"

import React, {useState} from "react";

import SearchBar from "@/components/SearchBar";
import CBBButton from "@/components/CBBButton";
import {t} from "@/i18n/i18n";


export default function CBBSearchBar({lang, filters, showFilters = true, border = true, rounded = true}) {
	const [query, setQuery] = useState([0]);
	const [filter, setFilter] = useState(0);

	function onSelected(payload) {
		filters[filter].onSelected(payload)
	}

	function onInput(input) {
		filters[filter].onInput(input).then(q => setQuery(q))
	}

	return (
		<>
			{showFilters &&
			<div className="w-full flex flex-row space-x-2 mb-2">
				{
					filters.map((fbutton, idx) => (
						<CBBButton key={idx} onPress={() => setFilter(idx)}
						           className={`${idx === filter ? "bg-white text-black" : "text-white bg-black/20 backdrop-blur-sm"} font-medium !opacity-100 hover:bg-white px-8 hover:text-black border-0`}>
							{t(lang, fbutton.textKey)}
						</CBBButton>

					))
				}
			</div>
			}
			<SearchBar data={query} onSelected={onSelected} rounded={rounded} className="w-[100%]"
			           label={t(lang, "components.searchbar.label")}
			           onInput={onInput} border={border}/>
		</>
	)
}

"use client"

import React, {useState} from "react";
import taxonomy from "@/API/taxonomy"
import SearchBar from "@/components/SearchBar";
import { useRouter } from 'next/navigation'


function SearchBarIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
		     className="w-6 h-6">
			<path strokeLinecap="round" strokeLinejoin="round"
			      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
		</svg>
	)
}

export default function CBBSearchBar({className, label = 'Search...'}) {
	const [query, setQuery] = useState([0])
	const router = useRouter()

	function onSelected(payload) {
		router.push(`/es/taxon/${payload}`)
	}

	function parseResults(payload) {
		setQuery(payload);
	}

	return (
		<SearchBar data={query} onInput={input => taxonomy.search(input).then(parseResults)}
		           onSelected={onSelected} className={className} label={label}/>
	);
}

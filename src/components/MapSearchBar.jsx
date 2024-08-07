"use client"

import React, {useState} from "react";
import taxonomy from "@/API/taxonomy"
import SearchBar from "@/components/common/SearchBar";
import {redirect} from "next/navigation";


export default function MapSearchBar({className, label = 'Search...', onSelected}) {
	const [query, setQuery] = useState([])

	function parseResults(payload) {
		setQuery(payload);
	}

	return (
		<SearchBar data={query} onSelected={onSelected} className={className} label={label}
		           onInput={input => taxonomy.search(input).then(parseResults)} border={true}/>
	);
}

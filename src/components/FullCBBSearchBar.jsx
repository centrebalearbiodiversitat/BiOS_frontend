"use client"

import React, {useState} from "react";

import {useRouter} from "next/navigation";
import taxonomy from "@/API/taxonomy";
import CBBSearchBar from "@/components/CBBSearchBar";


export default function FullCBBSearchBar({lang, rounded = true}) {
	const router = useRouter();

	const FILTER_BUTTONS = [
		{
			textKey: "components.searchbar.filter.map",
			onSelected: taxonId => router.push(`/${lang}/map?taxon=${taxonId}`),
			onInput: e => taxonomy.search(e)
		},
		{
			textKey: "components.searchbar.filter.taxonomy",
			onSelected: taxonId => router.push(`/${lang}/taxon/${taxonId}`),
			onInput: e => taxonomy.search(e)
		},
		{
			textKey: "components.searchbar.filter.authors",
			onSelected: () => {},
			onInput: e => console.log(e)
		},
		{
			textKey: "components.searchbar.filter.genetics",
			onSelected: taxonId => router.push(`/${lang}/genetics/${taxonId}`),
			onInput: e => taxonomy.search(e)
		},
	]


	return (
		<CBBSearchBar filters={FILTER_BUTTONS} lang={lang} rounded={true}/>
	)
}

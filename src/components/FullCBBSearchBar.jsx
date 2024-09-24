"use client"

import React, {useMemo, useState} from "react";

import {usePathname, useRouter} from "next/navigation";
import taxonomy from "@/API/taxonomy";
import CBBSearchBar from "@/components/common/CBBSearchBar";


export default function FullCBBSearchBar({lang, showFilters = true, border = true, rounded = true}) {
	const router = useRouter();
	const pathname = usePathname()

	const FILTER_BUTTONS = useMemo(() => {
		return [
			{
				textKey: "components.searchbar.filter.taxonomy",
				onSelected: taxonId => router.push(
					`/${lang}/taxon/${taxonId}${pathname.endsWith('genetics') ? '/genetics' : ''}`
				),
				onInput: e => taxonomy.search(e)
			}
		]
	}, [lang, pathname, router])

	return (
		<CBBSearchBar filters={FILTER_BUTTONS} lang={lang} redirect={true}
		              label="components.searchbar.label.taxonomy"
		              placeholder="components.searchbar.placeholder.taxonomy"
		              showFilters={showFilters} rounded={rounded}/>
	)
}

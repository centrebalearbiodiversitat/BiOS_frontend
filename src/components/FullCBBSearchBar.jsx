"use client"

import React, {useMemo} from "react";

import {usePathname, useRouter} from "next/navigation";
import taxonomy from "@/API/taxonomy";
import CBBSearchBar from "@/components/common/CBBSearchBar";


export default function FullCBBSearchBar({lang, showFilters = true, rounded = true, filters = null}) {
	const router = useRouter();
	const pathname = usePathname();

	const FILTER_BUTTONS = useMemo(() => {
		if (filters) {
			return filters
		}

		return [
			{
				textKey: "components.searchbar.filter.taxonomy",
				onSelected: taxonId => router.push(
					`/${lang}/taxon/${taxonId}${pathname.endsWith('genetics') ? '/genetics' : ''}`,
					{scroll: true},
				),
				onSubmit: q => router.push(
					`/${lang}/taxon/list?q=${q}`,
					{scroll: true},
				),
				onInput: e => taxonomy.search(e)
			}
		]
	}, [lang, filters, pathname, router])

	return (
		<CBBSearchBar filters={FILTER_BUTTONS} lang={lang}
		              label="components.searchbar.label.taxonomy" border={true}
		              placeholder="components.searchbar.placeholder.taxonomy"
		              showFilters={showFilters} rounded={rounded}/>
	)
}

"use client"

import React, {useMemo} from "react";

import {usePathname, useRouter} from "next/navigation";
import taxonomy from "@/API/taxonomy";
import CBBSearchBar from "@/components/common/CBBSearchBar";
import {handleScrollTop} from "@/utils/utils";
import {useLang} from "@/contexts/LangContext";


export default function FullCBBSearchBar({showFilters = true, rounded = true, filters = null}) {
	const [lang] = useLang();
	const router = useRouter();
	const pathname = usePathname();

	const FILTER_BUTTONS = useMemo(() => {
		if (filters) {
			return filters
		}

		return [
			{
				textKey: "components.searchbar.filter.taxonomy",
				onSelected: taxonId => {
					handleScrollTop();
					router.push(
						`/${lang}/taxon/${taxonId}${pathname.endsWith('genetics') ? '/genetics' : ''}`,
						{scroll: false},
					)
				},
				onSubmit: q => router.push(
					`/${lang}/taxon/list?q=${q}`,
					{scroll: false},
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

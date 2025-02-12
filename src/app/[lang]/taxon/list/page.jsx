"use client"

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import taxonomy from "@/API/taxonomy";
import {useRouter, useSearchParams} from "next/navigation";
import {Pagination} from "@nextui-org/react";
import {t} from "@/i18n/i18n";
import {generatePageTitle, handleScrollTop} from "@/utils/utils";
import DownloadModal from "@/components/DownloadModal";
import Hidden from "@/components/common/Hidden";
import TaxaList from "@/components/TaxaList";
import TaxonFilters from "@/components/TaxonFilters";

function removeNullKeys(obj) {
	for (let key in obj) {
		if (obj[key] === null) {
			delete obj[key];
		}
	}

	return obj;
}

const API_TRANSLATION_PARAMS = {
	'q': 'name',
	'ancestor': 'ancestorId'
}

function translateParamToAPI(param) {
	return API_TRANSLATION_PARAMS[param] || param;
}

const TAXA_DEFAULT_VALUE = Array(15).fill({});

export default function List({params: {lang}}) {
	const router = useRouter();
	const [taxa, setTaxa] = useState(TAXA_DEFAULT_VALUE);
	const [exportHref, setExportHref] = useState('');
	const [totalTaxa, setTotalTaxa] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const searchParams = useSearchParams();

	useEffect(() => {
		document.title = generatePageTitle(lang, t(lang, 'components.header.button.advancedSearch'))
	}, [lang]);

	useEffect(() => {
		setTaxa(TAXA_DEFAULT_VALUE);
		setTotalTaxa(undefined);
		setTotalPages(1);

		let params = {}
		searchParams.forEach((value, key) => {
			params[translateParamToAPI(key)] = value;
		})

		params = removeNullKeys(params)

		taxonomy.list(params)
			.then(r => {
				if (r) {
					setTaxa(r.taxa);
					setTotalTaxa(r.total);
					setTotalPages(r.pages);
				} else {
					setTaxa(TAXA_DEFAULT_VALUE);
					setTotalTaxa(undefined);
					setTotalPages(1);
				}
			})
		taxonomy.listExport(params).then(r => setExportHref(r))
	}, [lang, router, searchParams]);

	const availableDownloads = useMemo(() => {
		return [
			{
				title: t(lang, "taxon.list.modal.list"),
				description: t(lang, "taxon.list.modal.list.help"),
				link: exportHref,
			},
		]
	}, [lang, exportHref]);

	const pageSwap = useCallback((page) => {
		if (!isNaN(page)) {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", page)
			router.push(`?${params.toString()}`);
			handleScrollTop()
		}
	}, [router, searchParams]);

	return (
		<div className="p-4 md:px-6 md:py-8">
			<h1 className="text-4xl font-extralight mb-6 ms-1">
				{t(lang, "taxon.list.title")}
			</h1>
			<div className="mx-auto grid grid-cols-12 gap-6">
				<aside className="col-span-full lg:col-span-4 xl:col-span-3">
					<TaxonFilters/>
				</aside>
				<article className="flex flex-col col-span-full lg:col-span-8 xl:col-span-9 gap-6">
					<div className="flex flex-col-reverse gap-4 sm:flex-row">
						<h2 className="text-2xl font-extralight text-start leading-10">
							{t(lang, "taxon.list.results")} {totalTaxa !== undefined ? `(${totalTaxa.toLocaleString()})` : ''}
						</h2>
						<div className="ms-auto">
							<DownloadModal lang={lang} availableDownloads={availableDownloads}/>
						</div>
					</div>
					<TaxaList taxa={taxa}/>
					<Hidden hide={totalPages <= 1}>
						<Pagination className="mx-auto" total={totalPages}
						            page={parseInt(searchParams.get('page')) || 1}
						            initialPage={parseInt(searchParams.get('page')) || 1}
						            onChange={pageSwap}/>
					</Hidden>
				</article>
			</div>
		</div>
	)
}

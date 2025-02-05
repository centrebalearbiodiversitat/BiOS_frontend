"use client"

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import taxonomy from "@/API/taxonomy";
import {useRouter, useSearchParams} from "next/navigation";
import {Chip, Input, Pagination} from "@nextui-org/react";
import KeySelector from "@/components/common/KeySelector";
import {t} from "@/i18n/i18n";
import TaxonListBlockCard from "@/app/[lang]/taxon/list/TaxonListBlockCard";
import CBBButton from "@/components/common/CBBButton";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import {generatePageTitle, handleScrollTop} from "@/utils/utils";
import TaxonName from "@/components/common/TaxonName";
import {FaCamera, FaCheck, FaHighlighter} from "react-icons/fa";
import {RiParentFill} from "react-icons/ri";
import {TbHierarchy3} from "react-icons/tb";
import DownloadModal from "@/components/DownloadModal";
import Hidden from "@/components/common/Hidden";


const TAXON_RANKS = [
	{key: "kingdom", label: 'general.taxon_rank.kingdom'},
	{key: "phylum", label: 'general.taxon_rank.phylum'},
	{key: "class", label: 'general.taxon_rank.class'},
	{key: "order", label: 'general.taxon_rank.order'},
	{key: "family", label: 'general.taxon_rank.family'},
	{key: "genus", label: 'general.taxon_rank.genus'},
	{key: "species", label: 'general.taxon_rank.species'},
	{key: "subspecies", label: 'general.taxon_rank.subspecies'},
	{key: "variety", label: 'general.taxon_rank.variety'},
]

const TAXON_STATUS = [
	{key: true, label: 'general.taxonStatus.accepted'},
	{key: false, label: 'general.taxonStatus.synonym'},
]

const HAS_IMAGE = [
	{key: true, label: 'taxon.list.aside.hasImage.value.withImages'},
	{key: false, label: 'taxon.list.aside.hasImage.value.noImages'},
]

function removeNullKeys(obj) {
	for (let key in obj) {
		if (obj[key] === null) {
			delete obj[key];
		}
	}

	return obj;
}

function FilterLabel({lang, icon, label}) {
	const Icon = icon;

	return (
		<label className="font-extralight text-sm inline-flex text-center gap-2 ps-1">
			<Icon className="text-gray-500 my-auto"/>
			{t(lang, label)}
		</label>
	)
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
	const [ancestor, setAncestor] = useState();
	const [taxa, setTaxa] = useState(TAXA_DEFAULT_VALUE);
	const [exportHref, setExportHref] = useState('');
	const [totalTaxa, setTotalTaxa] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const searchParams = useSearchParams();
	const qRef = useRef(null);

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
				setTaxa(r.taxa);
				setTotalTaxa(r.total);
				setTotalPages(r.pages);
			})
		const ancestorId = searchParams.get('ancestor')
		ancestorId ? taxonomy.get(ancestorId).then(r => {setAncestor(r)}) : setAncestor(null)
		taxonomy.listExport(params).then(r => setExportHref(r))
	}, [lang, router, searchParams]);

	const generateSearchPath = useCallback((param= null, value = null) => {
		const params = new URLSearchParams(searchParams.toString());

		if (qRef.current.value)
			params.set('q', qRef.current.value);
		else
			params.delete('q');

		if (param !== "page") {
			params.delete('page');
		}

		if (param) {
			if (value === "" || value === undefined || value === null)
				params.delete(param);
			else
				params.set(param, value);
		}

		router.push(`?${params.toString()}`, undefined, { shallow: true })
		if (param !== 'ancestor')
			handleScrollTop()
	}, [router, qRef, searchParams]);

	const ancestorSearch = useMemo(() => {
		return [
			{
				textKey: "components.searchbar.filter.taxonomy",
				onSelected: taxonId => generateSearchPath('ancestor', taxonId),
				onInput: e => taxonomy.search(e)
			}
		]
	}, [generateSearchPath])

	const availableDownloads = useMemo(() => {
		return [
			{
				title: t(lang, "taxon.list.modal.list"),
				description: t(lang, "taxon.list.modal.list.help"),
				link: exportHref,
			},
		]
	}, [lang, exportHref]);

	return (
		<div className="p-4 md:px-6 md:py-8">
			<h1 className="text-4xl lg:text-3xl font-extralight text-center lg:text-start mb-6 ms-1">
				{t(lang, "taxon.list.title")}
			</h1>
			<div className="mx-auto grid grid-cols-12 gap-6">
				<aside className="col-span-full lg:col-span-3 ">
					<div className="sticky top-[128px] space-y-4 bg-gray-50 rounded-2xl p-4 flex flex-col gap-2 border border-gray-200">
						<h3 className="text-xl font-extralight text-start">
							{t(lang, "taxon.list.aside.title")}
						</h3>
						<form className="px-2 grid grid-cols-2 lg:grid-cols-1 gap-4"
						      action={() => generateSearchPath()}>
							<div className="col-span-full">
								<FilterLabel lang={lang} label="taxon.list.aside.ancestor" icon={RiParentFill}/>
								{ancestor &&
									<div className="my-2 w-full">
										<Chip className="w-full max-w-none" onClose={() => generateSearchPath('ancestor', null)}>
											<TaxonName lang={lang} taxon={ancestor} redirect={false}/>
										</Chip>
									</div>
								}
								<div className="!rounded-full">
									<FullCBBSearchBar lang={lang} rounded={false} filters={ancestorSearch}
									                  showFilters={false}/>
								</div>
							</div>
							<div className="col-span-full">
								<FilterLabel lang={lang} label="taxon.list.search.term" icon={FaHighlighter}/>
								<Input ref={qRef} variant="bordered" type="text" autoComplete="off"
								       isClearable={true}
								       classNames={{label: "font-extralight", inputWrapper: "border border-gray-200"}}
								       labelPlacement="outside" onSubmit={() => generateSearchPath()}
								       placeholder={t(lang, "taxon.list.search.term.placeholder")}
								       defaultValue={searchParams.get('q')}/>
							</div>
							<hr className="col-span-full my-2 hidden lg:block"/>
							<div>
								<FilterLabel lang={lang} label="taxon.list.aside.rankSelector" icon={TbHierarchy3}/>
								<KeySelector items={TAXON_RANKS} onSelected={r => generateSearchPath('rank', r)}
								             lang={lang} defaultValue={searchParams.get('rank')}
								             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}/>
							</div>
							<div>
								<FilterLabel lang={lang} label="taxon.list.aside.statusSelector" icon={FaCheck}/>
								<KeySelector items={TAXON_STATUS} lang={lang}
								             onSelected={s => generateSearchPath('accepted', s)}
								             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}
								             defaultValue={searchParams.get('accepted')}/>
							</div>
							<div>
								<FilterLabel lang={lang} label="taxon.list.aside.hasImage" icon={FaCamera}/>
								<KeySelector items={HAS_IMAGE} lang={lang}
								             onSelected={s => generateSearchPath('hasImage', s)}
								             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}
								             defaultValue={searchParams.get('hasImage')}/>
							</div>
							<CBBButton color="primary" onPress={() => generateSearchPath()} variant="solid"
							           type="submit" className="w-full mt-6">
								{t(lang, 'taxon.list.aside.search')}
							</CBBButton>
						</form>
					</div>
				</aside>
				<article className="flex flex-col col-span-full lg:col-span-9 gap-6">
					<div className="flex flex-row">
						<h2 className="text-2xl font-extralight text-center lg:text-start leading-10">
							{t(lang, "taxon.list.results")} {totalTaxa !== undefined ? `(${totalTaxa.toLocaleString()})` : ''}
						</h2>
						<div className="ms-auto">
							<DownloadModal lang={lang} availableDownloads={availableDownloads}/>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
						{taxa?.map(taxon => <TaxonListBlockCard key={taxon.id} lang={lang} taxon={taxon}/>)}
					</div>
					{typeof taxa === 'object' && taxa.length === 0 &&
						<p className="text-center w-full font-extralight flex flex-wrap gap-1 justify-center my-auto">
							{t(lang, "taxon.list.notFound")}
						</p>
					}
					<Hidden hide={totalPages <= 1}>
						<Pagination className="mx-auto" total={totalPages}
						                           page={parseInt(searchParams.get('page')) || 1}
						                           initialPage={parseInt(searchParams.get('page')) || 1}
						                           onChange={p => generateSearchPath('page', p)}/>
					</Hidden>
				</article>
			</div>
		</div>
	)
}

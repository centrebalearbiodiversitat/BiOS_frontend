"use client"

import React, {use, useEffect, useMemo, useRef, useState} from "react";
import versioning from "@/API/versioning"
import {t} from "@/i18n/i18n";
import {Image} from "@heroui/image";
import Link from "next/link";
import StatsChart from "@/components/StatsChart";
import {VscGraph} from "react-icons/vsc";
import LoadMore from "@/components/LoadMore";
import TabButtonGroup from "@/components/common/TabButtonGroup";
import {FaDna, FaImages, FaInfo} from "react-icons/fa";
import {GiDragonfly} from "react-icons/gi";
import {PiMagnifyingGlassBold} from "react-icons/pi";
import Loading from "@/components/common/Loading";
import {generatePageTitle} from "@/utils/utils";

const SOURCE_DATA_TYPES = {
	"taxon": {icon: <GiDragonfly/>, graphDescription: "partners.list.taxon.graph"},
	"occurrence": {icon: <PiMagnifyingGlassBold/>, graphDescription: "partners.list.occurrence.graph"},
	"taxon_data": {icon: <FaInfo/>, graphDescription: "partners.list.taxon_data.graph"},
	"image": {icon: <FaImages/>, graphDescription: "partners.list.image.graph"},
	"sequence": {icon: <FaDna/>, graphDescription: "partners.list.sequence.graph"},
}

function groupByDataType(sources) {
	const groups = Object.keys(SOURCE_DATA_TYPES).reduce((acc, dataType) => {
		acc[dataType] = [];

		return acc;
	}, {});

	sources?.forEach(source => {
		if (groups.hasOwnProperty(source.dataType))
			groups[source.dataType].push(source);
	});

	return groups;
}

function initDataTypeGroups() {
	return Object.keys(SOURCE_DATA_TYPES).reduce((acc, dataType) => {
		acc[dataType] = undefined;

		return acc;
	}, {});
}

export default function Page({params}) {
	const {lang} = use(params);

	const [sources, setSources] = useState(initDataTypeGroups());
	const sectionRefs = useRef({});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						history.replaceState(null, '', `#${entry.target.id}`);
					}
				});
			},
			{threshold: 0.6}
		);

		Object.values(sectionRefs.current).forEach(
			section => observer.observe(section)
		);

		return () => observer.disconnect();
	}, [sources]);

	useEffect(() => {
		versioning.list().then(r => setSources(groupByDataType(r)));
	}, []);

	useEffect(() => {
		document.title = generatePageTitle(lang, t(lang, 'components.header.button.sources'))
	}, [lang]);

	const BUTTON_GROUP = useMemo(() => {
		return Object.entries(SOURCE_DATA_TYPES).map(([dataType, meta]) => {
			return {
				href: `/${lang}/sources#${dataType}`,
				text: null,
				icon: meta.icon
			}
		})
	}, [lang]);

	return (
		<article className="w-full text-pretty break-words max-w-[900px] mx-auto space-y-6">
			<header className="w-full px-4 pt-8 mx-auto">
				<h1 className="text-4xl font-extralight">{t(lang, `partners.title`)}</h1>
				<h2 className="text-lg font-extralight">{t(lang, `partners.subtitle`)}</h2>
			</header>
			<div className="w-full mx-auto">
				<Link href={`/${lang}/taxon/search?q=Sympetrum fonscolombii`}>
					<Image alt="Female Red-veined darter dragonfly (Sympetrum fonscolombii)" removeWrapper={true}
					       src="/images/pages/sources/odonata.jpg"
					       title="Wikipedia | Alvesgaspar, Edited by Fir0002, some rights reserved (CC BY-2.5)"
					       className="object-cover w-full h-full max-h-[400px] rounded-none saturate-[120%] brightness-110"/>
				</Link>
			</div>
			<nav className="flex justify-center sticky top-[110px] z-10 w-full px-6">
				<div className="max-w-full px-3 py-2 shadow-small rounded-full border border-slate-100 bg-white gap-4 ">
					<div className="w-full h-auto overflow-x-auto">
						<div className="inline-flex pb-1 sm:pb-0">
							<TabButtonGroup small buttons={BUTTON_GROUP}/>
						</div>
					</div>
				</div>
			</nav>
			<main className="w-full px-6 md:px-0 mx-auto">
				{sources &&
					<div className="mx-auto flex flex-col gap-y-12">
						{
							Object.entries(sources).map(
								([dataType, dtSources]) => (
									<DataType id={dataType} key={dataType} dataType={dataType}
									          dtSources={dtSources} lang={lang}
									          refs={el => {sectionRefs.current[dataType] = el}}/>
								)
							)
						}
					</div>
				}
			</main>
		</article>
	);
}

function DataType({id, lang, refs, dtSources, dataType}) {
	return (
		<div id={id} ref={refs} className="w-full space-y-6 min-h-[400px]">
			<h3 className="text-3xl font-extralight">{t(lang, `partners.list.${dataType}`)}</h3>
			<div className="w-full aspect-video rounded-xl border-1 border-slate-200">
				<p className="font-extralight text-gray-600 bg-slate-100 px-4 py-3 rounded-t-xl">
					<VscGraph className="inline-block me-2"/>
					{t(lang, `partners.list.${dataType}.graph`)}
				</p>
				<Loading loading={dtSources} width="100%" height="100%" className="min-h-[400px]">
					<div className="px-4 w-full h-full">
						<StatsChart data={dtSources?.slice(0, Math.min(dtSources.length, 4))}
						            yLabel="name" type="bar" hideLegend/>
					</div>
				</Loading>
			</div>
			<Loading loading={dtSources} width="100%" height="100%" className="min-h-[200px]">
				<div className="rounded-xl border border-slate-200 p-6">
					<div className="overflow-y-auto w-full max-h-[600px] custom-scrollbar">
						<LoadMore items={dtSources} overflow={true}>
							{
								source => (
									<SourceList key={source.id} lang={lang} source={source}/>
								)
							}
						</LoadMore>
					</div>
				</div>
			</Loading>
		</div>
	)
}

function SourceList({source}) {
	return (
		<div className="flex flex-row px-6 py-3 items-center hover:bg-slate-100">
			<div className="block flex-grow">
				<p className="font-light text-xl">{source.name}</p>
				<p className="font-light text-gray-500">{source.origin}</p>
			</div>
			<p className="p-4 text-center text-3xl md:text-4xl"><span>{source.count.toLocaleString()}</span></p>
		</div>
	)
}
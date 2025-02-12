"use client"

import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import Link from "next/link";
import taxonomy from "@/API/taxonomy";
import Hidden from "@/components/common/Hidden";
import Section from "@/components/common/Section";
import Loading from "@/components/common/Loading";
import {useLang} from "@/contexts/LangContext";
import clsx from "clsx";


const DESCENDANTS = [
	"kingdom",
	"phylum",
	"class",
	"order",
	"family",
	"genus",
	"species",
	"subspecies",
	"variety"
]

function BlockWrapper({isClickable, href, className, ...extra}) {
	return isClickable ? (
		<Link href={href} className={clsx("hover:border-primary", className)} {...extra}/>
	) : (
		<div className={clsx("backdrop-blur-2xl bg-gray-50", className)} {...extra}/>
	)
}

function ClickableLevelBlock({taxonId, level, count}) {
	const [lang, _] = useLang();

	return (
		<li key={level} className="w-full aspect-square">
			<BlockWrapper className="w-full h-full font-extralight text-sm p-3.5 bg-white rounded-xl transition-all border-1 flex flex-col"
			      href={`/${lang}/taxon/list?ancestor=${taxonId}&rank=${level}`} isClickable={count !== undefined}>
				<p className="capitalize">
					{t(lang, `general.taxon_rank.${level}`)}
				</p>
				<div className="flex-grow flex">
					<p className="mt-auto font-extralight text-xl sm:text-2xl">
						{count}
					</p>
				</div>
			</BlockWrapper>
		</li>
	)
}

export default function TaxonDescendants({taxonId}) {
	const [descendants, setDescendants] = useState(undefined);

	useEffect(() => {
		taxonomy.descendantCount(taxonId)
			.then(r => setDescendants(r));
	}, [taxonId]);

	return (
		<Hidden hide={descendants === null || descendants !== undefined && Object.keys(descendants).length === 0}>
			<Section title="taxon.overview.statistics">
				<Loading className="mb-4 aspect-video" loading={descendants} width="100%" height="300px">
					<ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 justify-items-center gap-2">
						{descendants &&
							DESCENDANTS.map((level) => (
								<ClickableLevelBlock key={level} taxonId={taxonId} level={level} count={descendants[level]}/>
							))
						}
					</ul>
				</Loading>
			</Section>
		</Hidden>
	)
}
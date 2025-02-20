"use client"

import React, {useEffect, useMemo, useState} from "react";
import {t} from "@/i18n/i18n";
import Link from "next/link";
import taxonomy from "@/API/taxonomy";
import Hidden from "@/components/common/Hidden";
import Section from "@/components/common/Section";
import Loading from "@/components/common/Loading";
import {useLang} from "@/contexts/LangContext";
import clsx from "clsx";
import NoData from "@/components/common/NoData";


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
		<NoData isDataAvailable={false} message={false}>
			<div className={clsx("backdrop-blur-2xl bg-gray-50", className)} {...extra}/>
		</NoData>
	)
}

function ClickableLevelBlock({taxonId, level, count}) {
	const [lang] = useLang();
	const countFormat = useMemo(() => {
		return count ? count.toLocaleString() : "-"
	}, [count]);

	return (
		<li key={level} className="w-full">
			<BlockWrapper className="w-full h-full font-extralight  text-sm p-3.5 bg-white rounded-xl transition-all border-1 flex flex-col"
			      href={`/${lang}/taxon/list?ancestor=${taxonId}&rank=${level}`} isClickable={count !== undefined}>
				<p className="flex-grow text-center font-[250] text-2xl xl:text-lg 2xl:text-2xl">
					{countFormat}
				</p>
				<p className="capitalize mt-auto text-center max-w-full text-sm truncate">
					{t(lang, `general.taxon_rank.${level}`)}
				</p>
			</BlockWrapper>
		</li>
	)
}

export default function TaxonDescendants({taxonId, descendants}) {

	return (
		<Loading className="mb-4 aspect-video" loading={descendants} width="100%" height="300px">
			<ul className="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-9 justify-items-center gap-1">
				{descendants &&
					DESCENDANTS.map((level) => (
						<ClickableLevelBlock key={level} taxonId={taxonId} level={level}
						                     count={descendants[level]}/>
					))
				}
			</ul>
		</Loading>
	)
}
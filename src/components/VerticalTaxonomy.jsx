"use client"

import React, {useMemo} from "react";
import TaxonName from "@/components/common/TaxonName";
import {t} from "@/i18n/i18n";
import LoadMore from "@/components/LoadMore";
import clsx from "clsx";
import {useLang} from "@/contexts/LangContext";

export default function VerticalTaxonomy({taxonomy, markLast= false, overflow = false, windowSize = 5}) {
	const [lang] = useLang();

	const taxa = useMemo(() => {
		if (taxonomy) {
			return taxonomy.reduce((acc, taxon) => {
				acc.push({...taxon, taxonRankTranslated: t(lang, `general.taxon_rank.${taxon.taxonRank}`)});
				return acc;
			}, [])
		} else {
			return taxonomy;
		}
	}, [lang, taxonomy]);

	return (
		<ul className="text-small">
			<LoadMore items={taxa} overflow={overflow} initialSize={windowSize}>
				{
					(taxon, idx) => (
						<li key={taxon.id} className={
							clsx(
								idx + 1 < taxa.length ? "border-b-1" : markLast ? "bg-gray-100 border-s-2 border-primary" : "",
								"py-3 px-1 flex items-end"
							)
						}>
							<p className="first-letter:uppercase font-normal">
								{taxon.taxonRankTranslated}
							</p>
							<p className="ps-4 font-extralight text-end ms-auto">
								<TaxonName lang={lang} taxon={taxon}/>
							</p>
						</li>
					)
				}
			</LoadMore>
		</ul>
	);
}
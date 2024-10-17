import React, {useMemo, useState} from "react";
import TaxonName from "@/components/common/TaxonName";
import {t} from "@/i18n/i18n";
import {IoIosArrowDown} from "react-icons/io";

export default function VerticalTaxonomy({lang, taxonomy, markLast= false, overflow = false, windowSize = 5}) {
	const [loadMore, setLoadMore] = useState(overflow ? windowSize : false);

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

	if (taxa && taxa.length) {
		return (
			<>
				<ul className="text-small">
				{
					taxa.map(
						(taxon, idx) => (
							<li key={taxon.id} className={`${idx + 1 < taxa.length ? "border-b-1" : markLast ? "bg-gray-100 border-s-2 border-primary" : ""} py-3 px-1 flex items-end ${loadMore && idx > loadMore - 1 ? "hidden" : ""}`}>
								<p className="first-letter:uppercase font-normal">
									{taxon.taxonRankTranslated}
								</p>
								<p className="ps-4 font-extralight text-end ms-auto">
									<TaxonName lang={lang} taxon={taxon}/>
								</p>
							</li>
						)
					)
				}
				</ul>
				{overflow && loadMore < taxa.length &&
					<div>
						<p className="flex flex-row justify-end text-sm text-primary cursor-pointer m-4 space-x-2"
						   onClick={() => setLoadMore(loadMore + windowSize)}>
							<span>Load more</span> <IoIosArrowDown className="my-auto"/>
						</p>
					</div>
				}
			</>
		);
	} else {
		return (
			<p className="text-center font-extralight flex">
				<span className="flex flex-1 border-1 h-0 m-4 my-auto"/>
				{t(lang, 'components.verticalTaxonomy.empty')}
				<span/>
				<span className="flex flex-1 border-1 h-0 m-4 my-auto"/>
			</p>
		)
	}
}
import React, {useState} from "react";
import TaxonName from "@/components/common/TaxonName";
import {t} from "@/i18n/i18n";
import {IoIosArrowDown} from "react-icons/io";

export default function VerticalTaxonomy({lang, taxonomy, markLast= false, overflow = false, windowSize = 5}) {
	const [loadMore, setLoadMore] = useState(overflow ? windowSize : false);

	if (taxonomy && taxonomy.length) {
		return (
			<ul>
			{
				taxonomy.map(
					(taxon, idx) => (
						<li key={taxon.id} className={`${idx + 1 < taxonomy.length ? "border-b-1" : markLast ? "bg-gray-100 border-s-1 border-primary" : ""} p-3 flex items-end ${loadMore && idx > loadMore - 1 ? "hidden" : ""}`}>
							<p className="first-letter:uppercase font-normal">{taxon.taxonRank}</p>
							<p className="ps-4 font-extralight text-end ms-auto">
								<TaxonName lang={lang} taxon={taxon}/>
							</p>
						</li>
					)
				)
			}
			{overflow && loadMore < taxonomy.length &&
				<li>
					<p className="flex flex-row justify-end text-sm text-blue-400 cursor-pointer m-4 space-x-2"
					   onClick={() => setLoadMore(loadMore + windowSize)}>
						<span>Load more</span> <IoIosArrowDown className="my-auto"/>
					</p>
				</li>
			}
			</ul>
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
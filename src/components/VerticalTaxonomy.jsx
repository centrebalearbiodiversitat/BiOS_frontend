import React, {useState} from "react";
import TaxonName from "@/components/TaxonName";
import {t} from "@/i18n/i18n";

export default function VerticalTaxonomy({lang, taxonomy, overflow = false, windowSize = 5}) {
	const [loadMore, setLoadMore] = useState(overflow ? windowSize : false);

	if (taxonomy && taxonomy.length) {
		return (
			<ul>
			{
				taxonomy.map(
					(taxon, idx) => (
						<li key={taxon.id} className={`border-b-1 p-3 flex items-end ${loadMore && idx > loadMore - 1 ? "hidden" : ""}`}>
							<p className="first-letter:uppercase font-normal">{taxon.taxonRank}</p>
							<p className="ps-4 font-light text-end truncate ms-auto">
								<TaxonName lang={lang} taxon={taxon}/>
							</p>
						</li>
					)
				)
			}
			{overflow && loadMore < taxonomy.length &&
				<li>
					<p className="text-center text-accent cursor-pointer m-4"
					   onClick={() => setLoadMore(loadMore + windowSize)}>
						Load more
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
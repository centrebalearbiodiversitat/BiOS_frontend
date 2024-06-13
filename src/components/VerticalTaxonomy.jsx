import React from "react";
import TaxonName from "@/components/TaxonName";

export default function VerticalTaxonomy({lang, taxonomy}) {
	return (
		<ul>
		{
			taxonomy.map(
				(taxon) => (
					<li key={taxon.id} className="border-b-1 p-3 grid grid-cols-2 items-baseline">
						<p className="first-letter:uppercase font-normal">{taxon.taxonRank}</p>
						<p className="ms-2 font-light text-end truncate">
							<TaxonName id={taxon.id} lang={lang} name={taxon.name}/>
						</p>
					</li>
				)
			)
		}
		</ul>
	);
}
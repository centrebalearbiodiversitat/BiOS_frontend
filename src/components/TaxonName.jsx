import React from "react";
import Link from "next/link";


const ITALIC_RANKS = new Set([
	"genus",
	"species",
	"subspecies",
	"variety",
])


export default function TaxonName({lang, taxon, author = false}) {

	return (
		<Link href={`/${lang}/taxon/${taxon.id}`} className={`first-letter:uppercase text-pretty`}>
			<span className={`${ITALIC_RANKS.has(taxon.taxonRank) ? "italic" : ""}`}>
				{taxon.name}
			</span>
			{
				author && taxon.scientificNameAuthorship && (
					<span className="font-light">
						, {taxon.scientificNameAuthorship}
					</span>
				)
			}
		</Link>
	);
}
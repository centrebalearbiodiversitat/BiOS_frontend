import React from "react";
import TaxonName from "@/components/TaxonName";

function unroll_taxonomy(node) {
	if (!node) {
		return []
	}

	const taxonomy = [node];

	while (taxonomy.at(-1).parent_level) {
		taxonomy.push(taxonomy.at(-1).parent_level);
	}

	return taxonomy
}

export default function VerticalTaxonomy({taxonomy}) {
	return (
		<div className="block">
			{
				taxonomy.map(
					(taxon) => <TaxonName key={taxon.id} name={taxon.name}/>
				)
			}
		</div>
	);
}
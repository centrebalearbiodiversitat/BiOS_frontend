import React from "react";
import TaxonName from "@/components/common/TaxonName";
import clsx from "clsx";

export default function AncestorsList({lang, ancestors, className}) {
	return (
		<p className={clsx("flex flex-row gap-1", className)}>
			{
				ancestors.map(
					(parent, idx) => (
						<>
							<TaxonName key={parent.id} lang={lang} taxon={parent} as={"span"}/>
							{idx < ancestors.length - 1 && " >"}
						</>
					)
				)
			}
		</p>
	)
}
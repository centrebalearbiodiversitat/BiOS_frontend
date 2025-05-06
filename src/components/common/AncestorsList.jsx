import React from "react";
import TaxonName from "@/components/common/TaxonName";
import clsx from "clsx";

export default function AncestorsList({ancestors, className}) {
	return (
		<p className={clsx("flex flex-row gap-1", className)}>
			{
				ancestors.map(
					(parent, idx) => (
						<React.Fragment key={parent.id}>
							<TaxonName taxon={parent} as="span"/>
							{idx < ancestors.length - 1 && " >"}
						</React.Fragment>
					)
				)
			}
		</p>
	)
}
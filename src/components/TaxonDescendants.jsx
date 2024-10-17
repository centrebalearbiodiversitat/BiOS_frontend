import React, {useMemo} from "react";
import {t} from "@/i18n/i18n";
import Empty from "@/components/Empty";


export default function TaxonDescendants({lang, descendants}) {
	const descendantsTranslated = useMemo(() => {
		return Object.keys(descendants).reduce((acc, key) => {
			acc[key] = {
				total: descendants[key],
				taxon: t(lang, `general.taxon_rank.${key}`)
			}

			return acc;
		}, {})
	}, [lang, descendants]);

	return (
		<Empty isEmpty={descendantsTranslated === {}} lang={lang}>
			<ul className="flex flex-row flex-wrap gap-2">
				{descendantsTranslated &&
					Object.entries(descendantsTranslated).map(([key, value]) => (
						<li key={key} className="font-extralight text-sm p-3.5 flex flex-col bg-white rounded-xl border-1"
						style={{
							minWidth: 120,
							maxWidth: 120,
							width: 120,
							minHeight: 100,
							maxHeight: 100,
							height: 100,
						}}>
							<p className="capitalize">{value.taxon}</p>
							<div className="flex-1 flex align-middle w-full h-full">
								<p className="mt-auto font-extralight text-2xl">
								{value.total}
								</p>
							</div>
						</li>
					))
				}
			</ul>
		</Empty>
	)
}
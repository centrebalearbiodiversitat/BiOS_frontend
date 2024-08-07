import React from "react";
import {t} from "@/i18n/i18n";
import {Tooltip} from "@nextui-org/react";


export default function Habitats({habitats, lang}) {
	return (
		<ul className="m-5 capitalize list-disc grid grid-cols-3">
			{habitats.map(habitat => (
				<li key={habitat.sources[0].originId}>
					<p>
						{t(lang, `taxon.overview.habitat_${habitat.sources[0].originId}`)}
					</p>
				</li>
			))}
		</ul>
	)
}
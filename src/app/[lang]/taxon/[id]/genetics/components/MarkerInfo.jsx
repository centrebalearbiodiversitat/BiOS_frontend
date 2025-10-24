import {t} from "@/i18n/i18n";
import React from "react";
import SubSection from "@/components/common/SubSection";

export default function MarkerInfo({lang, marker}) {
	return (
		<SubSection className="flex flex-col gap-3" padding="p-4">
			<h4 className="font-extralight text-sm">
				{t(lang, "components.markerInfo.selected")}
			</h4>
			<div>
				<h3 className="text-xl">
					{marker?.name}
				</h3>
				<p className="font-light capitalize">
					{marker?.product}
				</p>
			</div>
			<ul className="flex flex-wrap gap-1">
				{marker &&
					marker.synonyms.map(marker => (
						<li key={marker.id} className="rounded-full px-4 text-sm bg-slate-400/80 text-white">
							{marker.name}
						</li>
					))
				}
			</ul>
		</SubSection>
	);
}
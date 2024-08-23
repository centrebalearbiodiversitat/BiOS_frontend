import {t} from "@/i18n/i18n";
import React from "react";
import {PieChart} from "@mui/x-charts";
import Empty from "@/components/Empty";

export default function TaxonPie({lang, composition}) {

	return (
		<Empty isEmpty={!composition} lang={lang}>
		{composition &&
			<PieChart skipAnimation={true} height={250}
		           series={[
			           {
				           innerRadius: 60,
				           data: composition,
				           // highlightScope: {faded: 'global', highlighted: 'item'},
				           // faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
			           },
		           ]}
		           slotProps={{
			           legend: {
				           // hidden: true
				           hidden: composition.length > 16
			           }
		           }}/>
		}
		</Empty>
	)
}
"use client"

import taxonomy from "@/API/taxonomy";
import occurrences from "@/API/occurrences";
import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import {PieChart} from "@mui/x-charts";
import Loading from "@/components/common/Loading";
import IUCN from "@/components/IUCN";
import Habitats from "@/components/Habitats";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState(null);
	const [composition, setComposition] = useState(null);
	const [taxonData, setTaxonData] = useState(null);

	useEffect(() => {
		taxonomy.composition(id)
			.then(r => setComposition(r.map(taxon => ({id, value: taxon.totalSpecies, label: taxon.name}))));
		taxonomy.taxonData(id)
			.then(r => setTaxonData(r));
		occurrences.list(id, null)
			.then(r => setOccs(occurrencesToGeoJson(id, r)));
	}, [id])

	return (
		<div>
			<h3 className="text-2xl font-semibold">
				Habitats
			</h3>
			<Loading className="mb-4 aspect-video" loading={taxonData === null} width="100%">
				<Habitats lang={lang} habitats={taxonData?.habitat}/>
			</Loading>

			<h3 className="text-2xl font-semibold">
				{t(lang, 'taxon.overview.iucn_status')}
			</h3>
			<Loading className="mb-4 aspect-video" loading={taxonData === null} width="100%">
				{taxonData &&
					<div className="my-5 flex flex-col items-center">
						<IUCN title="taxon.overview.iucn_global" status={taxonData.iucnMediterranean} lang={lang}/>
						<IUCN title="taxon.overview.iucn_europe" status={taxonData.iucnEurope} lang={lang}/>
						<IUCN title="taxon.overview.iucn_mediterranean" status={taxonData.iucnGlobal} lang={lang}/>
					</div>
				}
			</Loading>
			<h3 className="text-2xl font-semibold">
				{t(lang, 'taxon.overview.composition')}
			</h3>
			<Loading className="mb-4" loading={composition === null} width="100%" height={350}>
				{composition &&
					<PieChart
						skipAnimation={true}
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
						}}
						height={250}/>
				}
			</Loading>
		</div>
	);
}

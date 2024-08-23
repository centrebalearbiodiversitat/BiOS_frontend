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
import Empty from "@/components/Empty";
import TaxonPie from "@/components/TaxonPie";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState(undefined);
	const [composition, setComposition] = useState(undefined);
	const [taxonData, setTaxonData] = useState(undefined);

	useEffect(() => {
		taxonomy.composition(id)
			.then(r => {
				if (r && r.length > 0)
					setComposition(r.map(taxon => ({id, value: taxon.totalSpecies, label: taxon.name})));
				else
					setComposition(null);
			});
		taxonomy.taxonData(id)
			.then(r => setTaxonData(r));
		occurrences.list(id, null)
			.then(r => r && setOccs(occurrencesToGeoJson(id, r)));
	}, [id])

	return (
		<div>
			<h3 className="text-2xl font-semibold">
				Habitats
			</h3>
			<Loading className="mb-4 aspect-video" loading={taxonData} width="100%" height="100px">
				<Habitats lang={lang} habitats={taxonData?.habitat}/>
			</Loading>

			<h3 className="text-2xl font-semibold">
				{t(lang, 'taxon.overview.iucn_status')}
			</h3>
			<Loading className="mb-4 aspect-video" loading={taxonData} width="100%">
				<div className="my-5 flex flex-col items-center">
					<IUCN title="taxon.overview.iucn_global" status={taxonData?.iucnMediterranean} lang={lang}/>
					<IUCN title="taxon.overview.iucn_europe" status={taxonData?.iucnEurope} lang={lang}/>
					<IUCN title="taxon.overview.iucn_mediterranean" status={taxonData?.iucnGlobal} lang={lang}/>
				</div>
			</Loading>
			<h3 className="text-2xl font-semibold">
				{t(lang, 'taxon.overview.composition')}
			</h3>
			<Loading className="mb-4" loading={composition} width="100%" height={350}>
				<TaxonPie composition={composition}/>
			</Loading>
		</div>
	);
}

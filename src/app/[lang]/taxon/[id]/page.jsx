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
import Section from "@/components/common/Section";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState(undefined);
	const [composition, setComposition] = useState(undefined);
	const [taxonData, setTaxonData] = useState(undefined);

	useEffect(() => {
		taxonomy.composition(id)
			.then(r => {
				if (r && r.length > 0)
					setComposition(r.map(taxon => ({id: taxon.id, value: taxon.totalSpecies, label: taxon.name})));
				else
					setComposition(null);
			});
		taxonomy.taxonData(id)
			.then(r => setTaxonData(r));
		occurrences.list(id, null)
			.then(r => r && setOccs(occurrencesToGeoJson(id, r)));
	}, [id])

	return (
		<>

			<Section lang={lang} title="taxon.overview.iucn_status">
				<Loading className="mb-4 aspect-video" loading={taxonData} width="100%">
					<div className="mx-auto my-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[370px] sm:max-w-[550px] xl:max-w-[800px] xl:grid-cols-3">
						<IUCN className="col-span-1 sm:col-span-2 xl:col-span-1" title="taxon.overview.iucn_global" status={taxonData?.iucnMediterranean} lang={lang}/>
						<IUCN className="col-span-1" title="taxon.overview.iucn_europe" status={taxonData?.iucnEurope} lang={lang}/>
						<IUCN className="col-span-1" title="taxon.overview.iucn_mediterranean" status={taxonData?.iucnGlobal} lang={lang}/>
					</div>
				</Loading>
			</Section>

			<Section lang={lang} title="taxon.overview.habitats">
				<Loading className="mb-4 aspect-video" loading={taxonData} width="100%" height="100px">
					<Habitats lang={lang} habitats={taxonData?.habitat}/>
				</Loading>
			</Section>

			<Section lang={lang} title="taxon.overview.composition">
				<Loading className="mb-4" loading={composition} width="100%" height={350}>
					<TaxonPie composition={composition}/>
				</Loading>
			</Section>
		</>
	);
}

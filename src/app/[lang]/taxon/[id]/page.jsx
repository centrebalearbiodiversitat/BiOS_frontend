"use client"

// const languages = ['es']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import taxonomy from "@/API/taxonomy";
import occurrences from "@/API/occurrences";
import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import MapLibre from "@/components/maplibre/MapLibre";
import LinkButton from "@/components/LinkButton";
import {IoOpenOutline} from "react-icons/io5";
import {PieChart} from "@mui/x-charts";
import Loading from "@/components/Loading";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState(null);
	const [composition, setComposition] = useState(null);

	useEffect(() => {
		taxonomy.composition(id)
			.then(r => setComposition(r.map(taxon => ({id, value: taxon.totalSpecies, label: taxon.name}))));
		occurrences.list(id, null)
			.then(r => setOccs(occurrencesToGeoJson(id, r)));
	}, [id])

	return (
		<div>
			<h3 className="text-2xl">
				{t(lang, 'taxon.main.composition')}
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
								hidden: true
								// hidden: composition.length > 20
							}
						}}
						height={250}/>
				}
			</Loading>
			<h3 className="text-2xl">
				{t(lang, 'taxon.main.distribution')}
			</h3>
			<MapLibre nav={true} loading={occs === null} style={{borderRadius: '8px', height: '450px'}} data={[occs]}
			          taxaColors={{[id]: '#ff6900'}}>
				<div className="m-6" style={{position: 'absolute', top: 0, left: 0}}>
					<LinkButton variant="bordered" className="font-medium text-white" color="white"
					            href={`/${lang}/map?taxon=${id}`}>
						{t(lang, 'taxon.main.map.button.redirect')}<IoOpenOutline className="text-xl"/>
					</LinkButton>
				</div>
			</MapLibre>
		</div>
	);
}

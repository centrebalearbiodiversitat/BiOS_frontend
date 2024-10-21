"use client"

import occurrences from "@/API/occurrences";
import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import MapLibre from "@/components/maplibre/MapLibre";
import LinkButton from "@/components/common/LinkButton";
import {IoOpenOutline} from "react-icons/io5";
import Section from "@/components/common/Section";
import StatsChart from "@/components/StatsChart";
import Loading from "@/components/common/Loading";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState(null);
	const [occsStatsByMonth, setOccsStatsByMonth] = useState(undefined);
	const [occsStatsByYear, setOccsStatsByYear] = useState(undefined);
	const [occsStatsBySource, setOccsStatsBySource] = useState(undefined);

	useEffect(() => {
		occurrences.list(id, null)
			.then(r => r && setOccs(occurrencesToGeoJson(id, r)));
		occurrences.statsByMonth(id)
			.then(r => setOccsStatsByMonth(r));
		occurrences.statsByYear(id)
			.then(r => setOccsStatsByYear(r));
		occurrences.statsBySource(id)
			.then(r => setOccsStatsBySource(r));
	}, [id])

	return (
		<>
			<Section lang={lang} title="taxon.distribution.distribution">
				<MapLibre nav={true} loading={occs === null} style={{borderRadius: '8px', height: '450px'}} data={[occs]}
				          taxaColors={{[id]: '#ff6900'}}>
					<div className="m-6" style={{position: 'absolute', top: 0, left: 0}}>
						<LinkButton variant="bordered" className="font-medium text-white" color="white"
						            href={`/${lang}/map?taxon=${id}`}>
							{t(lang, 'taxon.main.map.button.redirect')}<IoOpenOutline className="text-xl"/>
						</LinkButton>
					</div>
				</MapLibre>
			</Section>
			<Section lang={lang} title="taxon.distribution.statistics">
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
					<div className="w-full aspect-video">
						<Loading loading={occsStatsByMonth} width="100%" height="100%">
							<StatsChart lang={lang} data={occsStatsByMonth} yLabel="month" type="bar"/>
						</Loading>
					</div>
					<div className="w-full aspect-video">
						<Loading loading={occsStatsBySource} width="100%" height="100%">
							<StatsChart lang={lang} data={occsStatsBySource} yLabel="source" type="bar"/>
						</Loading>
					</div>
					<div className="w-full aspect-video xl:col-span-2">
						<Loading loading={occsStatsByYear} width="100%" height="100%">
							<StatsChart lang={lang} data={occsStatsByYear} yLabel="year" type="line" show_null={false}/>
						</Loading>
					</div>
				</div>
			</Section>
		</>
	);
}

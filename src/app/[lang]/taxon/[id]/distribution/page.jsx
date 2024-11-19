"use client"

import occurrences from "@/API/occurrences";
import React, {useEffect, useMemo, useState} from "react";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import MapLibre from "@/components/maplibre/MapLibre";
import LinkButton from "@/components/common/LinkButton";
import {IoOpenOutline} from "react-icons/io5";
import Section from "@/components/common/Section";
import StatsChart from "@/components/StatsChart";
import Loading from "@/components/common/Loading";
import {Card, Description} from "@/components/common/DescriptionCard";

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

	const occsStatsByMonthTranslated = useMemo(() => {
		if (occsStatsByMonth)
			return occsStatsByMonth.map(e => ({
					...e,
					month: t(lang, `taxon.distribution.statistics.month_${e.month}`)
				})
			)

		return occsStatsByMonth
	}, [lang, occsStatsByMonth]);

	const occsStatsByYearAccumulated = useMemo(() => {
		if (occsStatsByYear)
			return occsStatsByYear.reduce((acc, elem) => {
				acc[1].push({...elem, count: acc[0] + elem.count});

				return [acc[0] + elem.count, acc[1]];
			}, [0, []])[1]

		return occsStatsByYear
	}, [occsStatsByYear]);

	return (
		<>
			<Section lang={lang} title="taxon.distribution.distribution">
				<MapLibre nav={true} loading={occs === null} style={{borderRadius: '8px', aspectRatio: '16 / 16', maxHeight: '450px'}} data={[occs]}
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
						<Card>
							<Card.Description>
								{t(lang, 'taxon.distribution.statistics.graph.months')}
							</Card.Description>
							<Loading loading={occsStatsByMonthTranslated} width="100%" height="100%">
								<Card.Body className="px-3">
									<StatsChart color="#3DBBCC" hideLegend data={occsStatsByMonthTranslated} yLabel="month" type="bar"/>
								</Card.Body>
							</Loading>
						</Card>
					</div>
					<div className="w-full aspect-video">
						<Card>
							<Card.Description>
								{t(lang, 'taxon.distribution.statistics.graph.sources')}
							</Card.Description>
							<Loading loading={occsStatsBySource} width="100%" height="100%">
								<Card.Body className="px-3">
									<StatsChart color="#BA3C4C" hideLegend data={occsStatsBySource} yLabel="source" type="bar"/>
								</Card.Body>
							</Loading>
						</Card>
					</div>
					<div className="w-full aspect-video col-span-full">
						<Card>
							<Card.Description>
								{t(lang, 'taxon.distribution.statistics.graph.y2yAcc')}
							</Card.Description>
							<Loading loading={occsStatsByYearAccumulated} width="100%" height="100%">
								<StatsChart color="#94C635CC" colorR={"#94C635"} hideLegend data={occsStatsByYear} dataRight={occsStatsByYearAccumulated} yLabel="year" type="combined" show_null={false}/>
							</Loading>
						</Card>
					</div>
				</div>
			</Section>
		</>
	);
}

import occurrences from "@/API/occurrences";
import React from "react";
import {t} from "@/i18n/i18n";
import LinkButton from "@/components/common/LinkButton";
import {IoOpenOutline} from "react-icons/io5";
import Section from "@/components/common/Section";
import StatsChart from "@/components/StatsChart";
import {Card} from "@/components/common/DescriptionCard";
import {generatePageTitle} from "@/utils/utils";
import taxonomy from "@/API/taxonomy";
import MapLibreAPIWrapper from "@/components/maplibre/MapLibreAPIWrapper";

export async function generateMetadata({params}) {
	const {lang, id} = await params;
	const taxon = await taxonomy.get(id);

	return {
		title: generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.distribution')}`)
	}
}

export default async function Taxon({params}) {
	const {lang, id} = await params;

	const [
		occsStatsByMonth,
		occsStatsByYear,
		occsStatsBySource,
	] = await Promise.all([
		occurrences.statsByMonth(id),
		occurrences.statsByYear(id),
		occurrences.statsBySource(id)
	]);

	let occsStatsByMonthTranslated = occsStatsByMonth;
	if (occsStatsByMonth) {
		occsStatsByMonthTranslated = occsStatsByMonth.map(e => ({
				...e,
				month: `${e.month}`
				// month: t(lang, `taxon.distribution.statistics.month_${e.month}`)
			})
		)
	}

	let occsStatsByYearAccumulated = occsStatsByYear;
	if (occsStatsByYear)
		occsStatsByYearAccumulated = occsStatsByYear.reduce((acc, elem) => {
			acc[1].push({...elem, count: acc[0] + elem.count});

			return [acc[0] + elem.count, acc[1]];
		}, [0, []])[1]

	return (
		<>
			<Section lang={lang} title="taxon.distribution.title" subtitle="taxon.distribution.subtitle">
				<MapLibreAPIWrapper id={id} nav={true} color="#ff6900"
				                    style={{borderRadius: '8px', aspectRatio: '16 / 16', maxHeight: '450px'}}>
					<div className="m-6" style={{position: 'absolute', top: 0, left: 0}}>
						<LinkButton variant="bordered" className="font-medium text-white" color="white"
						            href={`/${lang}/map?taxon=${id}`}>
							{t(lang, 'taxon.main.map.button.redirect')}<IoOpenOutline className="text-xl"/>
						</LinkButton>
					</div>
				</MapLibreAPIWrapper>
			</Section>
			<Section lang={lang} title="taxon.distribution.statistics" subtitle="taxon.distribution.statistics.subtitle">
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
					<div className="w-full aspect-video">
						<Card>
							<Card.Description>
								{t(lang, 'taxon.distribution.statistics.graph.months')}
							</Card.Description>
							<Card.Body className="px-3">
								<StatsChart color="#3DBBCC" hideLegend data={occsStatsByMonthTranslated} yLabel="month" type="bar"/>
							</Card.Body>
						</Card>
					</div>
					<div className="w-full aspect-video">
						<Card>
							<Card.Description>
								{t(lang, 'taxon.distribution.statistics.graph.sources')}
							</Card.Description>
							<Card.Body className="px-3">
								<StatsChart color="#BA3C4C" hideLegend data={occsStatsBySource} yLabel="source" type="bar"/>
							</Card.Body>
						</Card>
					</div>
					<div className="w-full aspect-video col-span-full">
						<Card>
							<Card.Description>
								{t(lang, 'taxon.distribution.statistics.graph.y2yAcc')}
							</Card.Description>
							<StatsChart color="#94C635" colorR="#3DBBCC" hideLegend data={occsStatsByYear}  show_null={false}
							            dataRight={occsStatsByYearAccumulated} yLabel="year" type="combined"/>
						</Card>
					</div>
				</div>
			</Section>
		</>
	);
}

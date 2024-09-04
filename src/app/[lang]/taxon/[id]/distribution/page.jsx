"use client"

import occurrences from "@/API/occurrences";
import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import MapLibre from "@/components/maplibre/MapLibre";
import LinkButton from "@/components/common/LinkButton";
import {IoOpenOutline} from "react-icons/io5";
import Section from "@/components/common/Section";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState(null);

	useEffect(() => {
		occurrences.list(id, null)
			.then(r => r && setOccs(occurrencesToGeoJson(id, r)));
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
			<Section lang={lang}>

			</Section>
		</>
	);
}

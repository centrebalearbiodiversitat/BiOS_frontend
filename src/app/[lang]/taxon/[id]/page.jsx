"use client"

// const languages = ['es']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import occurrences from "@/API/occurrences";
import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import {useRouter} from "next/navigation";
import MapLibre from "@/components/maplibre/MapLibre";
import LinkButton from "@/components/LinkButton";
import {IoOpenOutline} from "react-icons/io5";


export default function Taxon({params: {lang, id}}) {
	const [occs, setOccs] = useState([]);

	useEffect(() => {
		occurrences.list(id, null)
			.then(r => setOccs(occurrencesToGeoJson(id, r)));
	}, [id])

	return (
		<div>
			<h3 className="text-2xl">
				{t(lang, 'taxon.main.distribution')}
			</h3>
			<MapLibre nav={true} style={{borderRadius: '8px', height: '450px'}} data={[occs]} taxaColors={{[id]: '#ff6900'}}>
				<div className="m-6" style={{ position: 'absolute', top: 0, left: 0}}>
					<LinkButton variant="bordered" className="font-medium text-white" color="white" href={`/${lang}/map?taxon=${id}`}>
						{t(lang, 'taxon.main.map.button.redirect')}<IoOpenOutline className="text-xl"/>
					</LinkButton>
				</div>
			</MapLibre>
		</div>
	);
}

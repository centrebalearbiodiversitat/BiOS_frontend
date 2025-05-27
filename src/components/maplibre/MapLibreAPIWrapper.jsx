"use client"

import React, {useEffect, useState} from 'react';
import occurrences from "@/API/occurrences";
import {occurrencesToGeoJson} from "@/utils/geojson";
import MapLibre from "@/components/maplibre/MapLibre";

export default function MapLibreAPIWrapper({children, nav, style, id, color}) {
	const [occs, setOccs] = useState(undefined);

	useEffect(() => {
		occurrences.map(id, null).then(r => setOccs([occurrencesToGeoJson(id, r)]))
	}, [id]);

	return (
		<MapLibre nav={nav} loading={occs === undefined} data={occs} taxaColors={{[id]: color}} style={style}>
			{children}
		</MapLibre>
	)
}
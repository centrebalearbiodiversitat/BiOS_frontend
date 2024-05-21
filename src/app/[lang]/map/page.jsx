"use client"

import MapLibre from "@/components/MapLibre";
import {useEffect, useState} from "react";
import occurrences from "@/API/occurrences";
import { useSearchParams } from 'next/navigation'


async function fetchSpecies(taxa, locations) {
	const layers = [];

	if (taxa && locations) {
		for (const taxon of taxa) {
			for (const location of locations) {
				const payload = await occurrences.list(
					taxon,
					location
				);
				console.log(taxon, location, payload)
				const features = []
				for (const occurrence of payload) {
					features.push(
						{
							geometry: {
								type: "Point",
								coordinates: [occurrence.decimalLongitude, occurrence.decimalLatitude]
							}
						},
					)
				}
				layers.push({
					type: "FeatureCollection",
					crs: {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
					features: features
				})
			}
		}
	}

	return layers
}

export default function MapPage({params: {lang}}) {
	const searchParams = useSearchParams();
	const [occus, setOccus] = useState([])

	useEffect(() => {
		fetchSpecies(
			searchParams.getAll('taxon'),
			searchParams.getAll('loc'),
		).then(r => setOccus(r));
	}, [searchParams]);

	return (
		<>
			{/*<LazyMap/>*/}
			<MapLibre data={occus}/>
		</>
	);
}

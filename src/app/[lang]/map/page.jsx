"use client"

import {useEffect, useState} from "react";
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import taxonomy from "@/API/taxonomy"
import occurrences from "@/API/occurrences";
import MapLibre from "@/components/MapLibre";
import MapSearchBar from "@/components/MapSearchBar";


async function fetchOccurrences(taxa, locations) {
	const layers = [];

	if (locations.length === 0) {
		locations = [1]
	}

	if (taxa && locations) {
		for (const taxon of taxa) {
			for (const location of locations) {
				const payload = await occurrences.list(
					taxon,
					location
				);

				const features = []
				for (const occurrence of payload) {
					features.push(
						{
							id: occurrence.id,
							properties: occurrence,
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


async function fetchTaxa(taxa) {
	const taxaList = [];

	for (const taxon of taxa) {
		taxaList.push(await taxonomy.get(taxon));
	}

	return taxaList;
}


export default function MapPage({params: {lang}}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [occus, setOccus] = useState([]);
	const [occuPopup, setOccuPopup] = useState(null);
	const [taxa, setTaxa] = useState([]);

	useEffect(() => {
		const taxa = searchParams.getAll('taxon')
		const locs = searchParams.getAll('loc')
		fetchOccurrences(
			taxa,
			locs,
		).then(r => setOccus(r));

		fetchTaxa(
			taxa,
		).then(r => setTaxa(r));

	}, [searchParams, setOccus, setTaxa]);

	function onSelected(id) {
		if (id) {
			const params = new URLSearchParams(searchParams.toString())
			params.append('taxon', id)
			router.push(`${pathname}?${params.toString()}`)
		}
	}

	function onSelectedOccurrences(feature) {
		if (feature != null) {
			const occurrence = feature.properties;
			console.log(occurrence)
			taxonomy.get(occurrence.taxonomy).then(r => {
				console.log(occurrence)
				console.log(r)
				occurrence.taxonomy = r;
				setOccuPopup(occurrence);
			})
		}
	}

	return (
		<>
			<MapLibre data={occus} onClick={onSelectedOccurrences}>
				<div className="h-[100%] grid grid-cols-3 sm:grid-cols-12">
					<ul className="bg-transparent relative col-span-1 sm:col-span-2 m-2 overflow-y-auto">
						{
							taxa && taxa.map((taxon, idx) => (
								<li className="rounded-xl bg-primary my-2 p-2 text-center" key={idx}>
									{taxon.name}
								</li>
							))
						}
						{
							occuPopup && (
								<div className="rounded-md bg-secondary my-2 p-2 text-center">
									<p className="text-white">{occuPopup?.taxonomy.name}</p>
									<p>{occuPopup.id}</p>
									<p>{occuPopup.sample_id}</p>
									<p>{occuPopup.voucher}</p>
									<p>{occuPopup.eventDate}</p>
									<p>{occuPopup.basisOfRecord}</p>
									<p>{occuPopup.decimalLatitude}</p>
									<p>{occuPopup.decimalLongitude}</p>
								</div>
							)
						}
					</ul>
					<MapSearchBar className="col-start-2 sm:col-start-5 sm:col-span-6 columns-md mt-auto"
					              onSelected={onSelected}/>
				</div>
			</MapLibre>
		</>
	);
}

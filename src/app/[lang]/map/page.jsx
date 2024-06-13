"use client"

import {useEffect, useState} from "react";
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import taxonomy from "@/API/taxonomy"
import occurrences from "@/API/occurrences";
import MapLibre from "@/components/MapLibre";
import Drawer from "@/components/Drawer";
import CBBSearchBar from "@/components/CBBSearchBar";
import {t} from "@/i18n/i18n";
import Figure from "@/components/Figure";
import {HexColorPicker} from "react-colorful";
import {PopoverColorPicker} from "@/components/PopoverColorPicker";


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
		const taxa = searchParams.getAll('taxon');
		const locs = searchParams.getAll('loc');

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

	const FILTER_BUTTONS = [
		{
			textKey: "components.searchbar.filter.taxonomy",
			onSelected: onSelected,
			onInput: e => taxonomy.search(e)
		},
		{
			textKey: "components.searchbar.filter.authors",
			onSelected: () => {
			},
			onInput: () => {
			}
		},
		{
			textKey: "components.searchbar.filter.genetics",
			onSelected: () => {
			},
			onInput: () => {
			}
		},
	]

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
			<div className="absolute top-0 h-full w-full">
				<MapLibre data={occus} onClick={onSelectedOccurrences}/>
			</div>
			<Drawer lang={lang}>
				<div className="h-full p-4">
					<CBBSearchBar className="col-start-2 sm:col-start-5 sm:col-span-6 columns-md mt-auto"
					              lang={lang} rounded={false} filters={FILTER_BUTTONS}/>
					<h4 className="p-2 border-b-1 border-black m-2">
						{t(lang, 'map.drawer.selectedTaxa')}
					</h4>
					<ul className="relative col-span-1 sm:col-span-2 py-2 space-y-2">
						{
							taxa.map((taxon, idx) => (
								<li className="bg-white p-3 flex flex-row items-center" key={idx}>
									<PopoverColorPicker color={"#aabbcc"} onChange={() => {}} />
									<div>
										<p className="text-lg font-semibold">
											{taxon.name}
										</p>
										<p className="text-md font-light">
											{taxon.scientificNameAuthorship}
										</p>
									</div>
								</li>
							))
						}
						{/*	{*/}
						{/*		occuPopup && (*/}
						{/*			<div className="rounded-md bg-secondary my-2 p-2 text-center">*/}
						{/*				<p className="text-white">{occuPopup?.taxonomy.name}</p>*/}
						{/*				<p>{occuPopup.id}</p>*/}
						{/*				<p>{occuPopup.sample_id}</p>*/}
						{/*				<p>{occuPopup.voucher}</p>*/}
						{/*				<p>{occuPopup.eventDate}</p>*/}
						{/*				<p>{occuPopup.basisOfRecord}</p>*/}
						{/*				<p>{occuPopup.decimalLatitude}</p>*/}
						{/*				<p>{occuPopup.decimalLongitude}</p>*/}
						{/*			</div>*/}
						{/*		)*/}
						{/*	}*/}
					</ul>
				</div>
			</Drawer>
		</>
	);
}

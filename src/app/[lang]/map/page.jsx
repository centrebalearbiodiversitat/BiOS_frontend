"use client"

import React, {useEffect, useState} from "react";
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import taxonomy from "@/API/taxonomy"
import occurrences from "@/API/occurrences";
import Drawer from "@/components/Drawer";
import CBBSearchBar from "@/components/CBBSearchBar";
import {t} from "@/i18n/i18n";
import MapLibre from "@/components/maplibre/MapLibre";
import MapLibreCard from "@/components/maplibre/MapLibreCard";
import TaxonName from "@/components/TaxonName";
import {MapLibrePopup, TwoLineText} from "@/components/maplibre/MapLibrePopup";
import Sources from "@/components/Sources";


async function fetchOccurrences(taxa, locations, savedTaxaColors, savedTaxaToLoc) {
	const taxaColors = {};
	const taxaToLoc = {};

	if (locations.size === 0) {
		locations.add(null)
	}

	for (const taxon of taxa) {
		for (const location of locations) {
			const taxaToLocKey = `${taxon}_${location}`;

			if (savedTaxaToLoc.hasOwnProperty(taxaToLocKey)) {
				taxaToLoc[taxaToLocKey] = savedTaxaToLoc[taxaToLocKey];
			} else {
				const payload = await occurrences.list(
					taxon,
					location
				);

				const features = [];
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

				taxaToLoc[taxaToLocKey] = {
					type: "FeatureCollection",
					taxonId: taxon,
					crs: {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
					features: features
				}
			}

			if (savedTaxaColors && savedTaxaColors.hasOwnProperty(taxon)) {
				taxaColors[taxon] = savedTaxaColors[taxon];
			} else {
				const randomColor = Math.floor(Math.random()*16777215)
				taxaColors[taxon] = `#${randomColor.toString(16).padStart(6, '0')}`
			}
		}
	}

	return [taxaToLoc, taxaColors];
}


async function fetchTaxa(taxa, savedTaxa) {
	const taxaList = {};

	for (const taxon of taxa) {
		if (savedTaxa.hasOwnProperty(taxon))
			taxaList[taxon] = savedTaxa[taxon];
		else
			taxaList[taxon] = await taxonomy.get(taxon);
	}

	return taxaList;
}


export default function MapPage({params: {lang}}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [selectedOccus, setSelectedOccus] = useState([]);
	const [taxa, setTaxa] = useState({});
	const [taxaToLoc, setTaxaToLoc] = useState({});
	const [taxaColors, setTaxaColors] = useState({});

	function setAndSaveTaxaColors(tC) {
		localStorage.setItem('taxaColors', JSON.stringify(tC));
		setTaxaColors(tC);
	}

	useEffect(() => {
		// parse saved colors
		let savedTaxaColors = {};

		try {
			savedTaxaColors = JSON.parse(localStorage.getItem('taxaColors'));
		} catch (e) {
			localStorage.removeItem('taxaColors');
		}

		setTaxaColors(savedTaxaColors);

		// parse params
		const reqTaxa = new Set(searchParams.getAll('taxon'));
		const locs = new Set(searchParams.getAll('loc'));
		setTaxa([...reqTaxa].map(() => undefined))

		fetchOccurrences(
			reqTaxa,
			locs,
			savedTaxaColors,
			taxaToLoc
		).then(([newTaxaToLoc, colors]) => {
			setTaxaToLoc(newTaxaToLoc);
			setAndSaveTaxaColors(colors);
		});

		fetchTaxa(
			reqTaxa,
			taxa
		).then(r => setTaxa(r));
	}, [searchParams]);

	function onSelected(id) {
		if (id) {
			const params = new URLSearchParams(searchParams.toString())
			params.append('taxon', id)
			router.push(`${pathname}?${params.toString()}`)
		}
	}

	function onColorChanged(id, color) {
		if (id) {
			const newTaxaColors = {...taxaColors, [id]: color};
			setAndSaveTaxaColors(newTaxaColors);
		}
	}

	function onDeleted(id) {
		if (id) {
			const params = new URLSearchParams(searchParams.toString())
			params.delete('taxon', id)
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
		if (feature) {
			occurrences.get(feature.properties.id)
				.then(r => setSelectedOccus([...selectedOccus, r]))
		}
	}

	return (
		<>
			<div className="absolute top-0 h-full w-full">
				<MapLibre data={Object.values(taxaToLoc)} taxaColors={taxaColors} onClick={onSelectedOccurrences}>
					{
						selectedOccus.map(
							(occu, idx) => (
								<MapLibrePopup key={occu.id} maxWidth={'450px'} maxHeight={'250px'} images={occu.taxonomy.images}
								               onClose={() => selectedOccus.splice(idx, 1) && setSelectedOccus([...selectedOccus])}
								               longitude={occu.decimalLongitude} latitude={occu.decimalLatitude}>
									<div className="m-6 mt-4 text-medium">
										<p className="text-3xl mb-4 text-center">
											<TaxonName lang={lang} taxon={occu.taxonomy} author={false}/>
										</p>
										<div>
											<TwoLineText title={t(lang, "map.popup.locality")} text={occu.location?.name}/>
											<TwoLineText title={t(lang, "map.popup.location")} text={
												<span>({occu.decimalLatitude}, {occu.decimalLongitude}) {occu.coordinateUncertaintyInMeters && (<span>± {occu.coordinateUncertaintyInMeters} m.</span>)}</span>
											}/>
											<TwoLineText title={t(lang, "map.popup.eventDate")} text={occu.eventDate}/>
											<TwoLineText title={t(lang, "map.popup.basisRecord")} text={occu.basisOfRecord}/>
											<TwoLineText title={t(lang, "map.popup.voucher")} text={occu.voucher}/>
										</div>
										<div className="mx-2 mt-6">
											<Sources sources={occu.sources} className="my-3"/>
										</div>
									</div>
								</MapLibrePopup>
							)
						)
					}
				</MapLibre>
			</div>
			<Drawer>
				<div className="h-full px-6 pt-4">
					<CBBSearchBar showFilters={false} className="col-start-2 sm:col-start-5 sm:col-span-6 columns-md mt-auto"
					              lang={lang} rounded={false} filters={FILTER_BUTTONS}/>
					<h4 className="p-2 border-b-1 border-black m-2">
						{t(lang, 'map.drawer.selectedTaxa')}
					</h4>
					<ul className="relative col-span-1 sm:col-span-2 py-2 space-y-2">
						{
							Object.values(taxa).map((taxon, idx) => (
								<MapLibreCard key={idx} color={taxon && taxaColors ? taxaColors[taxon.id] : undefined}
								              onColorChanged={onColorChanged} lang={lang}
								              taxon={taxon} onDelete={onDeleted}/>
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

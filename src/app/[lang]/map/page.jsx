"use client"

import React, {use, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import taxonomy from "@/API/taxonomy"
import occurrences from "@/API/occurrences";
import geography from "@/API/geography";
import Drawer from "@/components/common/Drawer";
import CBBSearchBar from "@/components/common/CBBSearchBar";
import {t} from "@/i18n/i18n";
import MapLibre from "@/components/maplibre/MapLibre";
import TaxonName from "@/components/common/TaxonName";
import {MapLibrePopup, TwoLineText} from "@/components/maplibre/MapLibrePopup";
import Sources from "@/components/Sources";
import {Accordion, AccordionItem} from "@heroui/accordion";
import HighlightText from "@/components/common/HighlightText";
import Filters from "@/components/Filters";
import {FiDownload} from "react-icons/fi";
import CBBButton from "@/components/common/CBBButton";
import MapLibreTaxa from "@/components/maplibre/MapLibreTaxa";
import MapLibreCardGeography from "@/components/maplibre/MapLibreCardGeography";
import {generatePageTitle} from "@/utils/utils";

const TAXA_PALETTE = [
	"#D55E00",
	"#56e4e9",
	"#F0E442",
	"#009E73",
	"#f178b9",
	"#FF6F61",
	"#008080",
	"#D9B44A",
	"#6A5ACD",
	"#C07F9B",
	"#66C2A5",
	"#FC8D62",
	"#8DA0CB",
	"#ef60bd",
	"#A6D854",
	"#FFD92F",
	"#E60000",
	"#FF6600",
	"#006666",
]

async function fetchOccurrences(taxa, locations, savedTaxaColors, savedTaxaToLoc, params) {
	const taxaColors = {};
	const taxaToLoc = {};
	locations = new Set([...locations]);

	if (locations.size === 0) {
		locations.add(null)
	}

	for (const taxon of taxa) {
		for (const location of locations) {
			const taxaToLocKey = `${taxon}_${location}`;

			if (savedTaxaToLoc.hasOwnProperty(taxaToLocKey)) {
				taxaToLoc[taxaToLocKey] = savedTaxaToLoc[taxaToLocKey];
			} else {
				let payload = await occurrences.map(
					taxon,
					location,
					params
				);

				if (!payload)
					payload = []

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
				const randomColor = Math.floor(Math.random() * TAXA_PALETTE.length)
				taxaColors[taxon] = TAXA_PALETTE[randomColor];
			}
		}
	}

	return [taxaToLoc, taxaColors];
}


async function fetchTaxa(taxa, savedTaxa) {
	savedTaxa = savedTaxa.reduce((acc, cur) => {acc[cur.id] = cur; return acc; }, {})
	const taxaList = new Map();

	for (const taxon of taxa) {
		if (savedTaxa.hasOwnProperty(taxon))
			taxaList.set(taxon.toString(), savedTaxa[taxon]);
		else {
			const taxonPayload = await taxonomy.get(taxon);
			if (taxonPayload)
				taxaList.set(taxon.toString(), taxonPayload);
		}
	}

	return Array.from(taxaList.values());
}


async function fetchGeographicalLocations(locationsIDs, savedLocations) {
	const locationList = {}

	for (const location of locationsIDs) {
		if (savedLocations.hasOwnProperty(location))
			locationList[location] = savedLocations[location];
		else {
			const locPayload = await geography.get(location);
			if (locPayload)
				locationList[location] = locPayload;
		}
	}

	return locationList;
}


export default function MapPage({params}) {
	const {lang} = use(params);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [selectedOccus, setSelectedOccus] = useState([]);
	const [taxa, setTaxa] = useState([]);
	const [loading, setLoading] = useState(false);
	const [geographicalLocations, setGeographicalLocations] = useState({});
	const [taxaToLoc, setTaxaToLoc] = useState({});
	const [filteredTaxaToLoc, setFilteredTaxaToLoc] = useState({});
	const [taxaColors, setTaxaColors] = useState({});
	const [hidden, setHidden] = useState({});
	const mapRef = useRef(null);

	useEffect(() => {
		document.title = generatePageTitle(lang, t(lang, 'components.header.button.map'))
	}, [lang]);

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
		const reqTaxa = Array.from(new Set(searchParams.getAll('taxon')));
		const reqLocs = Array.from(new Set(searchParams.getAll('loc')));

		const params = {};
		const excludedKeys = new Set(['taxon', 'loc']);
		searchParams.forEach((value, key) => {
			if (!excludedKeys.has(key)) {
				params[key] = value;
			}
		});

		if (reqTaxa)
			setLoading(true);

		fetchOccurrences(
			reqTaxa,
			reqLocs,
			savedTaxaColors,
			taxaToLoc,
			params
		).then(([newTaxaToLoc, colors]) => {
			setTaxaToLoc(newTaxaToLoc);
			setAndSaveTaxaColors(colors);
			setLoading(false);
		});

		fetchTaxa(
			reqTaxa,
			taxa
		).then(r => setTaxa(r));

		fetchGeographicalLocations(
			reqLocs,
			geographicalLocations
		).then(r => {
			setGeographicalLocations(r);
		});
	}, [searchParams]);

	const setAndSaveTaxaColors = useCallback((tC) => {
		localStorage.setItem('taxaColors', JSON.stringify(tC));
		setTaxaColors(tC);
	}, []);

	const onColorChanged = useCallback((id, color) => {
		if (id) {
			const newTaxaColors = {...taxaColors, [id]: color};
			setAndSaveTaxaColors(newTaxaColors);
		}
	}, [setAndSaveTaxaColors,  taxaColors]);

	const onSelectedSearch = useCallback((paramName, id) => {
		if (id) {
			const params = new URLSearchParams(searchParams.toString())
			if (!params.has(paramName, id)) {
				params.append(paramName, id)
				router.push(`${pathname}?${params.toString()}`)
			}
		}
	}, [searchParams, router, pathname]);

	const onDeletedSearch = useCallback((paramName, id) => {
		if (id) {
			const params = new URLSearchParams(searchParams.toString())
			params.delete(paramName, id)
			router.push(`${pathname}?${params.toString()}`)
		}
	}, [router, searchParams, pathname]);

	const onSelectedOccurrences = useCallback((feature) => {
		if (feature) {
			occurrences.get(feature.properties.id)
				.then(r => setSelectedOccus([...selectedOccus, r]))
		}
	}, [selectedOccus]);

	const onFiltered = useCallback((d) => {
		setFilteredTaxaToLoc(d);
	}, []);

	const onHide = useCallback((idx, isHidden) => {
		setHidden({...hidden, [idx]: isHidden});
	}, [hidden]);

	const onReorder = useCallback((reorderedTaxa) => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('taxon');
		reorderedTaxa.forEach(r => {!params.has('taxon', r.id) && params.append('taxon', r.id)});
		router.push(`${pathname}?${params.toString()}`);
	}, [router, pathname, searchParams]);

	return (
		<>
			<div className="z-0 absolute top-0 h-full w-full">
				<MapLibre ref={mapRef} data={Object.values(filteredTaxaToLoc)} taxaColors={taxaColors}
				          sources={geographicalLocations} loading={loading} hidden={hidden}
				          onClick={onSelectedOccurrences}>
					{
						selectedOccus.map(
							(occu, idx) => (
								<MapLibrePopup key={occu.id} images={occu.taxonomy.images}
								               onClose={() => selectedOccus.splice(idx, 1) && setSelectedOccus([...selectedOccus])}
								               title={
									               <p className="text-lg md:text-2xl font-extralight text-start leading-6 my-auto mb-3 text-pretty mx-auto">
										               <TaxonName taxon={occu.taxonomy} author={false}/>
										               <span
											               className={`block text-sm md:text-lg font-extralight w-full`}>
											               {occu ? occu.taxonomy.scientificNameAuthorship : ""}
										               </span>
									               </p>
								               }
								               longitude={occu.decimalLongitude} latitude={occu.decimalLatitude}>
									<div className="space-y-0.5">
										<TwoLineText title={t(lang, "map.popup.locality")}
										             text={occu.location?.name}/>
										<TwoLineText title={t(lang, "map.popup.location")} text={
											<span>({occu.decimalLatitude}, {occu.decimalLongitude}) {occu.coordinateUncertaintyInMeters !== null && (
												<span>± {occu.coordinateUncertaintyInMeters} m.</span>)}</span>
										}/>
										<TwoLineText title={t(lang, "map.popup.elevation")} text={occu.elevation}/>
										<TwoLineText title={t(lang, "map.popup.depth")}
										             text={occu.depth ? `${occu.depth} m.` : null}/>
										<TwoLineText title={t(lang, "map.popup.eventDate")} text={occu.eventDate}/>
										<TwoLineText title={t(lang, "map.popup.basisRecord")}
										             text={occu.basisOfRecord}/>
										<TwoLineText title={t(lang, "map.popup.voucher")} text={occu.voucher}/>
									</div>
									<Sources sources={occu.sources} className="mt-4 justify-end"/>
								</MapLibrePopup>
							)
						)
					}
				</MapLibre>
			</div>
			<Drawer>
				<Drawer.Body>
					<Accordion className="px-6 pt-4" defaultExpandedKeys={["taxa", "geo", "filters"]}
					           selectionMode={"multiple"}>
						<AccordionItem key="taxa" aria-label={t(lang, 'map.drawer.selectedTaxa')}
						               className="border-b border-slate-400"
						               title={<h4 className="flex justify-start text-xl font-extralight">{t(lang, 'map.drawer.selectedTaxa')}</h4>}>
							<MapLibreTaxa lang={lang} taxa={taxa} taxaColors={taxaColors} onColorChanged={onColorChanged}
							              onHide={onHide} onReorder={onReorder}
							              onDeleted={onDeletedSearch} onSelectedSearch={onSelectedSearch}/>
						</AccordionItem>
						<AccordionItem key="geo" aria-label={t(lang, 'map.drawer.selectedLocalities')}
						               className="border-b border-slate-400"
						               title={<h4 className="flex justify-start text-xl font-extralight">{t(lang, 'map.drawer.selectedLocalities')}</h4>}>
							<div className="mx-2">
								<CBBSearchBar showFilters={false} lang={lang} rounded={true} loadOnSubmit={false}
								              label="components.searchbar.label.geography" redirect={true}
								              placeholder="components.searchbar.placeholder.geography"
								              filters={[{
									              textKey: "components.searchbar.filter.authors",
									              onSelected: e => onSelectedSearch('loc', e),
									              onInput: e => geography.search(e)
								              }]}>
									{(obj, search) => <><span
										className="text-slate-500">{t(lang, `geography.rank.${obj.rank}`)}: </span><HighlightText
										text={obj.name} highlight={search}/></>}
								</CBBSearchBar>
								<ul className="relative col-span-1 sm:col-span-2 py-2 space-y-2 ">
									{
										Object.values(geographicalLocations).map((location, idx) => (
											<MapLibreCardGeography key={idx} colorSelector={false}
											                       taxon={location} lang={lang}
											                       onDelete={d => onDeletedSearch('loc', d)}/>
										))
									}
								</ul>
							</div>
						</AccordionItem>
						<AccordionItem key="filters" aria-label={t(lang, 'map.drawer.filters')} className="border-b-0"
						               title={<h4 className="flex justify-start text-xl font-extralight">{t(lang, 'map.drawer.filters')}</h4>}>
							<div className="mx-2">
								<Filters data={taxaToLoc} onFiltered={onFiltered}/>
							</div>
						</AccordionItem>
					</Accordion>
				</Drawer.Body>
				<Drawer.Footer>
					<div className="m-4 flex justify-end">
						<CBBButton disabled={!mapRef?.current} className="me-auto"
						           onPress={() => mapRef.current.exportMap()}>
							Export map <FiDownload/>
						</CBBButton>
					</div>
				</Drawer.Footer>
			</Drawer>
		</>
	);
}

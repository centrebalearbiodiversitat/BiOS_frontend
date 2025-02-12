"use client"

import React, {useCallback, useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import genetics from "@/API/genetics";
import Section from "@/components/common/Section";
import {useTaxon} from "@/contexts/TaxonContext";
import {generatePageTitle} from "@/utils/utils";
import SubSection from "@/components/common/SubSection";
import TaxonMarkers from "@/components/TaxonMarkers";
import TaxonSequences from "@/components/TaxonSequences";
import occurrences from "@/API/occurrences";
import {occurrencesToGeoJson} from "@/utils/geojson";
import ToggleButton from "@/components/common/ToggleButton";
import {useRouter, useSearchParams} from "next/navigation";

export default function Genetics({params: {id, lang}}) {
	const [taxon, setTaxon] = useTaxon();
	const [markers, setMarkers] = useState(undefined);
	const [seqs, setSeqs] = useState(undefined);
	const [occs, setOccs] = useState(undefined);
	const router  = useRouter();
	const searchParams = useSearchParams();

	const marker = searchParams.get("marker");
	const inGeographyScope = searchParams.get("inGeographyScope") === "true"

	useEffect(() => {
		genetics.listSequences(id, marker, inGeographyScope).then(r => setSeqs(r));
		genetics.listMarkers(id, inGeographyScope).then(r => setMarkers(r));
		occurrences.list(id, null)
			.then(r => setOccs([occurrencesToGeoJson(id, r)]));
	}, [marker, inGeographyScope, id]);

	useEffect(() => {
		if (taxon)
			document.title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.genetics')}`)
	}, [taxon, lang]);

	const onSelectMarker = useCallback((marker) => {
		const params = new URLSearchParams(searchParams.toString());
		if (marker) {
			params.set("marker", marker);
		} else {
			params.delete("marker");
		}
		router.push(`?${params.toString()}`, {scroll: false});
	}, [router, searchParams]);

	const onGeographyToggle = useCallback((value) => {
		const params = new URLSearchParams();
		if (value) {
			params.set("inGeographyScope", value);
		} else {
			params.delete("inGeographyScope");
		}
		router.push(`?${params.toString()}`, {scroll: false});
	}, [router]);

	return (
		<>
			<Section title="taxon.genetics.markers">
				<div className="flex flex-row justify-end mb-6">
					<ToggleButton label="taxon.genetics.filter.inGeographyScope" onToggle={onGeographyToggle} isEnabled={inGeographyScope}/>
				</div>
				<TaxonMarkers markers={markers} selectedMarker={marker} onSelectMarker={onSelectMarker}/>
				{/*<MapLibre nav={true} loading={occs === undefined} style={{borderRadius: '8px', aspectRatio: '16 / 16', maxHeight: '450px'}} data={occs}*/}
				{/*          taxaColors={{[id]: '#ff6900'}}>*/}
				{/*	<div className="m-6" style={{position: 'absolute', top: 0, left: 0}}>*/}
				{/*		<LinkButton variant="bordered" className="font-medium text-white" color="white"*/}
				{/*		            href={`/${lang}/map?taxon=${id}`}>*/}
				{/*			{t(lang, 'taxon.main.map.button.redirect')}<IoOpenOutline className="text-xl"/>*/}
				{/*		</LinkButton>*/}
				{/*	</div>*/}
				{/*</MapLibre>*/}
				<SubSection>
					<TaxonSequences sequences={seqs}/>
				</SubSection>
			</Section>
		</>
	);
}

"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react";
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
import {Button, Divider} from "@nextui-org/react";

export default function Genetics({params: {id, lang}}) {
	const [taxon, setTaxon] = useTaxon();
	const [markers, setMarkers] = useState(undefined);
	const [seqs, setSeqs] = useState(undefined);
	const [occs, setOccs] = useState(undefined);
	const router  = useRouter();
	const searchParams = useSearchParams();

	const getParam = (key, defaultValue) => {
	const value = searchParams.get(key);
		if (typeof defaultValue === "boolean") return value === "true";
		return value ?? defaultValue;
	};

	const marker = getParam("marker");
	const page = getParam("page");
	const inGeographyScope = getParam("inGeographyScope", false);

	useEffect(() => {
		setSeqs(undefined);
		genetics.listSequences(id, marker, inGeographyScope, page).then(r => setSeqs(r));
	}, [id, page, marker, inGeographyScope]);

	useEffect(() => {
		setMarkers(undefined);
		genetics.listMarkers(id, inGeographyScope).then(r => setMarkers(r));
		// occurrences.list(id, null)
		// 	.then(r => setOccs([occurrencesToGeoJson(id, r)]));
	}, [id, inGeographyScope]);

	useEffect(() => {
		if (taxon)
			document.title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.genetics')}`)
	}, [taxon, lang]);

	const onSelectMarker = useCallback((marker) => {
		const params = new URLSearchParams();
		if (inGeographyScope){
			params.set("inGeographyScope", inGeographyScope);
		}

		if (marker) {
			params.set("marker", marker);
		} else {
			params.delete("marker");
		}
		router.push(`?${params.toString()}`, {scroll: false});
	}, [router, inGeographyScope]);

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
			<Section title="taxon.genetics.sequences" subtitle="taxon.genetics.sequences.description">
				{/*<MapLibre nav={true} loading={occs === undefined} style={{borderRadius: '8px', aspectRatio: '16 / 16', maxHeight: '450px'}} data={occs}*/}
				{/*          taxaColors={{[id]: '#ff6900'}}>*/}
				{/*	<div className="m-6" style={{position: 'absolute', top: 0, left: 0}}>*/}
				{/*		<LinkButton variant="bordered" className="font-medium text-white" color="white"*/}
				{/*		            href={`/${lang}/map?taxon=${id}`}>*/}
				{/*			{t(lang, 'taxon.main.map.button.redirect')}<IoOpenOutline className="text-xl"/>*/}
				{/*		</LinkButton>*/}
				{/*	</div>*/}
				{/*</MapLibre>*/}
				{/*<div className="flex flex-row justify-center">*/}
				{/*	<Button radius="full" color={inGeographyScope ? "primary" : null}>*/}
				{/*		{t(lang, "taxon.genetics.filter.inGeographyScope")}*/}
				{/*	</Button>*/}
				{/*</div>*/}
				<SubSection className="space-y-6">
					<div className="space-y-4">
						<div className="flex flex-row justify-end">
							<ToggleButton label="taxon.genetics.filter.inGeographyScope" onToggle={onGeographyToggle} isEnabled={inGeographyScope}/>
						</div>
						<TaxonMarkers markers={markers} selectedMarker={marker} onSelectMarker={onSelectMarker}/>
					</div>
					<Divider/>
					<TaxonSequences sequences={seqs}/>
				</SubSection>
			</Section>
		</>
	);
}

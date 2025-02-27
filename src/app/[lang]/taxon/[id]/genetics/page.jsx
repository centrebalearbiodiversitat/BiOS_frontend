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
import {useRouter, useSearchParams} from "next/navigation";
import MarkerInfo from "@/components/MarkerInfo";
import Hidden from "@/components/common/Hidden";
import DownloadButton from "@/components/common/DownloadButton";
import ToggleButton from "@/components/common/ToggleButton";

export default function Genetics({params: {id, lang}}) {
	const [taxon] = useTaxon();
	const [markers, setMarkers] = useState(undefined);
	const [totalMarker, setTotalMarker] = useState(undefined);
	const [seqs, setSeqs] = useState(undefined);
	const [selectedMarker, setSelectedMarker] = useState(undefined);
	const [downloadURL, setDownloadURL] = useState(undefined);
	// const [occs, setOccs] = useState(undefined);
	const router  = useRouter();
	const searchParams = useSearchParams();

	const getParam = (key, defaultValue) => {
	const value = searchParams.get(key);
		if (typeof defaultValue === "boolean") return value === "true";
		return value ?? defaultValue;
	};

	const marker = getParam("marker");
	const page = getParam("page");
	const inGeographyScope = getParam("inGeographyScope", undefined);

	useEffect(() => {
		setSeqs(undefined);
		setDownloadURL(undefined);
		genetics.listSequences(id, marker, inGeographyScope, page).then(r => setSeqs(r));
		if (marker) {
			genetics.getMarker(marker).then(r => setSelectedMarker(r));
		} else {
			setSelectedMarker(undefined);
		}
		genetics.listSequenceDownload(id, {marker, inGeographyScope}).then(r => setDownloadURL(r));
	}, [id, page, marker, inGeographyScope]);

	useEffect(() => {
		setMarkers(undefined);
		genetics.listMarkers(id, {inGeographyScope}).then(r => setMarkers(r));
		genetics.listCountSequences(id, {inGeographyScope})
			.then(r => setTotalMarker({id: null, total: r, name: t(lang, "taxon.genetics.totalSequence")}));
		// occurrences.list(id, null)
		// 	.then(r => setOccs([occurrencesToGeoJson(id, r)]));
	}, [id, lang, inGeographyScope]);

	useEffect(() => {
		if (taxon)
			document.title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.genetics')}`)
	}, [taxon, lang]);

	const onSelectMarker = useCallback((marker) => {
		const params = new URLSearchParams();
		if (inGeographyScope) {
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
			params.set("inGeographyScope", true);
		} else {
			params.delete("inGeographyScope");
		}
		router.push(`?${params.toString()}`, {scroll: false});
	}, [router]);

	return (
		<>
			<Section title="taxon.genetics.sequences" subtitle="taxon.genetics.sequences.description"
			         className="space-y-2">
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
				<div className="flex flex-row rounded-full">
					<div className="flex grow">
						{/*<PushButton label="taxon.genetics.filter.inGeographyScope" onPush={onGeographyToggle}*/}
						{/*            className="mx-auto flex flex-row items-center gap-4 my-2" isPushed={inGeographyScope}*/}
						{/*            icon={<IoLocationSharp className="text-xl"/>}/>*/}
						<DownloadButton href={seqs && seqs.total ? downloadURL : undefined} className="bg-white">
							{t(lang, "taxon.layout.modal.download_button")} {seqs && `(${seqs.total.toLocaleString()})`}
						</DownloadButton>
					</div>
					<div className="bg-white rounded-full border border-slate-200 flex px-3">
						<ToggleButton label="taxon.genetics.filter.inGeographyScope" onToggle={onGeographyToggle}
						              className="m-auto flex flex-row items-center gap-4" isEnabled={inGeographyScope ?? false}/>
					</div>
				</div>
				<SubSection className="!p-0">
					<TaxonMarkers
						markers={totalMarker !== undefined && markers !== undefined && [totalMarker, ...markers]}
						selectedMarker={marker} onSelectMarker={onSelectMarker}/>
				</SubSection>
				<Hidden hide={!selectedMarker}>
					<MarkerInfo marker={selectedMarker}/>
				</Hidden>
				<SubSection className="flex flex-col gap-8">
					<TaxonSequences sequences={seqs}/>
				</SubSection>
			</Section>
		</>
	);
}

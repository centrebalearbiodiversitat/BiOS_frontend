import React from "react";
import {t} from "@/i18n/i18n";
import genetics from "@/API/genetics";
import Section from "@/components/common/Section";
import {generatePageTitle, getParam} from "@/utils/utils";
import SubSection from "@/components/common/SubSection";
import TaxonMarkers from "@/app/[lang]/taxon/[id]/genetics/components/TaxonMarkers";
import TaxonSequences from "@/app/[lang]/taxon/[id]/genetics/components/TaxonSequences";
import MarkerInfo from "@/app/[lang]/taxon/[id]/genetics/components/MarkerInfo";
import Hidden from "@/components/common/Hidden";
import DownloadButton from "@/components/common/DownloadButton";
import taxonomy from "@/API/taxonomy";
import OnGeoToggleButton from "@/app/[lang]/taxon/[id]/genetics/components/OnGeoToggleButton";

export async function generateMetadata({params, searchParams}) {
	const {lang, id} = await params;
	const taxon = await taxonomy.get(id);
	const title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.genetics')}`)

	return {
		title,
		openGraph: {
			title
		}
	}
}

export default async function Genetics({params, searchParams}) {
	const {id, lang} = await params;
	searchParams = new URLSearchParams(await searchParams);

	const page = getParam(searchParams, "page");
	const marker = getParam(searchParams, "marker");
	const inGeographyScope = getParam(searchParams, "inGeographyScope", undefined);

	const [
		markers,
		totalMarker,
		seqs,
		selectedMarker,
		downloadURL,
	] = await Promise.all([
		genetics.listMarkers(id, {inGeographyScope}),
		genetics.listCountSequences(id, {inGeographyScope}).then(r => ({id: null, total: r, name: t(lang, "taxon.genetics.totalSequence")})),
		genetics.listSequences(id, marker, inGeographyScope, page),
		marker ? genetics.getMarker(marker) : undefined,
		genetics.listSequenceDownload(id, {marker, inGeographyScope}).then(l => l.toString())
	]);

	return (
		<Section className="space-y-2" lang={lang} title="taxon.genetics.sequences"
		         subtitle="taxon.genetics.sequences.description">
			<div className="flex flex-row rounded-full">
				<div className="flex grow">
					{/*<PushButton label="taxon.genetics.filter.inGeographyScope" onPush={onGeographyToggle}*/}
					{/*            className="mx-auto flex flex-row items-center gap-4 my-2" isPushed={inGeographyScope}*/}
					{/*            icon={<IoLocationSharp className="text-xl"/>}/>*/}
					<DownloadButton lang={lang} href={seqs && seqs.total ? downloadURL : undefined} className="bg-white">
						{t(lang, "taxon.layout.modal.download_button")} {seqs && `(${seqs.total.toLocaleString()})`}
					</DownloadButton>
				</div>
				<div className="bg-white rounded-full border border-slate-200 flex px-3">
					<OnGeoToggleButton/>
				</div>
			</div>
			<SubSection padding="p-0">
				<TaxonMarkers markers={totalMarker !== undefined && markers !== undefined && [totalMarker, ...markers]}/>
			</SubSection>
			<Hidden hide={!selectedMarker}>
				<MarkerInfo lang={lang} marker={selectedMarker}/>
			</Hidden>
			<SubSection className="flex flex-col gap-8">
				<TaxonSequences sequences={seqs}/>
			</SubSection>
		</Section>
	);
}

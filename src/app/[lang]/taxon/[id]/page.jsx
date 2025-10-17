import taxonomy from "@/API/taxonomy";
import tags from "@/API/tags";
import React from "react";
import TaxonHabitats from "@/components/TaxonHabitats";
import TaxonComposition from "@/components/TaxonComposition";
import Section from "@/components/common/Section";
import TaxonDescendants from "@/components/TaxonDescendants";
import Hidden from "@/components/common/Hidden";
import {t} from "@/i18n/i18n";
import {generatePageTitle, generateSourceUrl} from "@/utils/utils";
import TaxonDOE from "@/components/TaxonDOE";
import SubSection from "@/components/common/SubSection";
import TaxonSystem from "@/components/TaxonSystem";
import TaxonDirectives from "@/components/TaxonDirectives";
import NoData from "@/components/common/NoData";
import IUCNCard from "@/components/IUCNCard";
import {IMAGE_NOT_FOUND_SRC} from "@/utils/CONSTANTS";

// export async function generateStaticParams({params}) {
// 	console.log(params)
// 	const {id} = await params;
// 	console.log(id)
//
// 	return [{
// 		taxon
// 	}]
// }

export async function generateMetadata({params, searchParams}) {
	const {lang, id} = await params;
	const taxon = await taxonomy.get(id);

	const title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.taxon')}`)

	return {
		title,
		openGraph: {
			title
		}
	}
}

export default async function Taxon({params}) {
	const {lang, id} = await params;
	const taxon = await taxonomy.get(id);

	const [
		composition,
		taxonData,
		taxonTags,
		taxonHabitats,
		taxonDirectives,
		taxonSystems,
		descendants,
	] = await Promise.all([
		taxonomy.composition(id).then(r => {
			if (r && r.length > 0) {
				return r.map(taxon => ({id: taxon.id, value: taxon.totalSpecies, label: taxon.name}));
			} else
				return null;
		}),
		tags.taxonIUCN(id),
		tags.listTagsByTaxon(id),
		tags.listHabitats(id),
		tags.listDirectives(id),
		tags.listSystem(id),
		taxonomy.descendantCount(id),
	])

	const isSpeciesOrLower = ['species', 'subspecies', 'variety'].includes(taxon.taxonRank);

	return (
		<>
			<Hidden hide={!isSpeciesOrLower}>
				<Section lang={lang} title="taxon.overview.status" subtitle="taxon.overview.status.description">
					<div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-4 gap-4">
						<SubSection className="col-span-full md:col-span-2 xl:col-span-1 !p-0">
							<NoData lang={lang} isDataAvailable={taxonTags?.at(0)}>
								<TaxonDOE lang={lang} doe={taxonTags?.at(0)}/>
							</NoData>
						</SubSection>
						<SubSection className="col-span-full md:col-span-3 xl:col-span-3 !p-0">
							<IUCNCard lang={lang} scopes={taxonData}/>
						</SubSection>
					</div>
				</Section>
			</Hidden>

			<Hidden hide={descendants === null || descendants !== undefined && Object.keys(descendants).length === 0}>
				<Section lang={lang} title="taxon.overview.statistics" subtitle="taxon.overview.statistics.description">
					<TaxonDescendants taxonId={id} descendants={descendants}/>
				</Section>
			</Hidden>

			<Section lang={lang} title="taxon.overview.habitats" subtitle="taxon.overview.habitats.description">
				<TaxonSystem className="justify-center mb-4" systems={taxonSystems}/>
				{/*<SubSection className="!p-3">*/}
					<TaxonHabitats habitats={taxonHabitats}/>
				{/*</SubSection>*/}
			</Section>

			<Hidden hide={!isSpeciesOrLower}>
				<Section lang={lang} title="taxon.overview.directives" subtitle="taxon.overview.directives.description">
					<SubSection>
						<TaxonDirectives directives={taxonDirectives}/>
					</SubSection>
				</Section>
			</Hidden>

			<Hidden hide={isSpeciesOrLower}>
				<Section lang={lang} title="taxon.overview.composition">
					<SubSection>
						<TaxonComposition lang={lang} composition={composition}/>
					</SubSection>
				</Section>
			</Hidden>
		</>
	);
}

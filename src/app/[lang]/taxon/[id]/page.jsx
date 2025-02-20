"use client"

import taxonomy from "@/API/taxonomy";
import tags from "@/API/tags";
import React, {useEffect, useMemo, useState} from "react";
import TaxonHabitats from "@/components/TaxonHabitats";
import TaxonComposition from "@/components/TaxonComposition";
import Section from "@/components/common/Section";
import TaxonDescendants from "@/components/TaxonDescendants";
import {useTaxon} from "@/contexts/TaxonContext";
import Hidden from "@/components/common/Hidden";
import {t} from "@/i18n/i18n";
import {generatePageTitle} from "@/utils/utils";
import TaxonDOE from "@/components/TaxonDOE";
import SubSection from "@/components/common/SubSection";
import TaxonSystem from "@/components/TaxonSystem";
import TaxonDirectives from "@/components/TaxonDirectives";
import NoData from "@/components/common/NoData";
import IUCNCard from "@/components/IUCNCard";


export default function Taxon({params: {lang, id}}) {
	const [taxon] = useTaxon();
	const [composition, setComposition] = useState(undefined);
	const [taxonData, setTaxonData] = useState(undefined);
	const [taxonTags, setTaxonTags] = useState(undefined);
	const [taxonHabitats, setTaxonHabitats] = useState(undefined);
	const [taxonDirectives, setTaxonDirectives] = useState(undefined);
	const [taxonSystems, setTaxonSystems] = useState(undefined);
	const [descendants, setDescendants] = useState(undefined);

	useEffect(() => {
		taxonomy.composition(id)
			.then(r => {
				if (r && r.length > 0) {
					setComposition(r.map(taxon => ({id: taxon.id, value: taxon.totalSpecies, label: taxon.name})));
				} else
					setComposition(null);
			});
		taxonomy.descendantCount(id)
			.then(r => setDescendants(r));
		tags.taxonIUCN(id)
			.then(r => setTaxonData(r));
		tags.listTagsByTaxon(id)
			.then(r => setTaxonTags(r));
		tags.listHabitats(id)
			.then(r => setTaxonHabitats(r));
		tags.listDirectives(id)
			.then(r => setTaxonDirectives(r));
		tags.listSystem(id)
			.then(r => setTaxonSystems(r));
	}, [id]);

	useEffect(() => {
		if (taxon)
			document.title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.taxon')}`)
	}, [taxon, lang]);

	const isSpeciesOrLower = useMemo(() => {
		return ['species', 'subspecies', 'variety'].includes(taxon?.taxonRank);
	}, [taxon]);

	return (
		<>
			<Hidden hide={!isSpeciesOrLower}>
				<Section title="taxon.overview.status" subtitle="taxon.overview.status.description">
					<div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-4 gap-4">
						<SubSection className="col-span-full md:col-span-2 xl:col-span-1 !p-0">
							<NoData isDataAvailable={taxonTags?.at(0)}>
								<TaxonDOE doe={taxonTags?.at(0)}/>
							</NoData>
						</SubSection>
						<SubSection className="col-span-full md:col-span-3 xl:col-span-3 !p-0">
							<IUCNCard scopes={taxonData}/>
						</SubSection>
					</div>
				</Section>
			</Hidden>

			<Hidden hide={descendants === null || descendants !== undefined && Object.keys(descendants).length === 0}>
				<Section title="taxon.overview.statistics" subtitle="taxon.overview.statistics.description">
					<TaxonDescendants taxonId={id} descendants={descendants}/>
				</Section>
			</Hidden>

			<Section title="taxon.overview.habitats" subtitle="taxon.overview.habitats.description">
				<TaxonSystem className="justify-center mb-4" systems={taxonSystems}/>
				{/*<SubSection className="!p-3">*/}
					<TaxonHabitats habitats={taxonHabitats}/>
				{/*</SubSection>*/}
			</Section>

			<Hidden hide={!isSpeciesOrLower}>
				<Section title="taxon.overview.directives" subtitle="taxon.overview.directives.description">
					<SubSection>
						<TaxonDirectives directives={taxonDirectives}/>
					</SubSection>
				</Section>
			</Hidden>

			<Hidden hide={isSpeciesOrLower}>
				<Section title="taxon.overview.composition">
					<SubSection>
						<TaxonComposition lang={lang} composition={composition}/>
					</SubSection>
				</Section>
			</Hidden>
		</>
	);
}

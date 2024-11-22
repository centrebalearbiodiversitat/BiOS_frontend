"use client"

import taxonomy from "@/API/taxonomy";
import React, {useEffect, useMemo, useState} from "react";
import Loading from "@/components/common/Loading";
import IUCN from "@/components/IUCN";
import Habitats from "@/components/Habitats";
import TaxonComposition from "@/components/TaxonComposition";
import Section from "@/components/common/Section";
import TaxonDescendants from "@/components/TaxonDescendants";
import {useTaxon} from "@/context/TaxonContext";
import Hidden from "@/components/common/Hidden";
import {t} from "@/i18n/i18n";
import {generatePageTitle} from "@/utils/utils";


export default function Taxon({params: {lang, id}}) {
	const [taxon, setTaxon] = useTaxon();
	const [composition, setComposition] = useState(undefined);
	const [taxonData, setTaxonData] = useState(undefined);
	const [taxonHabitats, setTaxonHabitats] = useState(undefined);
	const [descendants, setDescendants] = useState(undefined);

	useEffect(() => {
		taxonomy.composition(id)
			.then(r => {
				if (r && r.length > 0) {
					setComposition(r.map(taxon => ({id: taxon.id, value: taxon.totalSpecies, label: taxon.name})));
				} else
					setComposition(null);
			});
		taxonomy.taxonData(id)
			.then(r => setTaxonData(r));
		taxonomy.habitats(id)
			.then(r => setTaxonHabitats(r));
		taxonomy.descendantCount(id)
			.then(r => setDescendants(r));
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
			<Hidden hide={descendants === null || descendants !== undefined && Object.keys(descendants).length === 0}>
				<Section lang={lang} title="taxon.overview.statistics">
					<Loading className="mb-4 aspect-video" loading={descendants} width="100%" height="300px">
						<TaxonDescendants lang={lang} descendants={descendants}/>
					</Loading>
				</Section>
			</Hidden>

			<Hidden hide={!isSpeciesOrLower}>
				<Section lang={lang} title="taxon.overview.iucn_status">
					<Loading className="mb-4 aspect-video" loading={taxonData} width="100%">
						<div className="mx-auto my-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[370px] sm:max-w-[550px] xl:max-w-[800px] xl:grid-cols-3">
							<IUCN className="col-span-1 sm:col-span-2 xl:col-span-1" title="taxon.overview.iucn_global" status={taxonData?.iucnGlobal} lang={lang}/>
							<IUCN className="col-span-1" title="taxon.overview.iucn_europe" status={taxonData?.iucnEurope} lang={lang}/>
							<IUCN className="col-span-1" title="taxon.overview.iucn_mediterranean" status={taxonData?.iucnMediterranean} lang={lang}/>
						</div>
					</Loading>
				</Section>
			</Hidden>

			<Hidden hide={isSpeciesOrLower}>
				<Section lang={lang} title="taxon.overview.composition">
					<Loading className="mb-4" loading={composition} width="100%" height={350}>
						<TaxonComposition lang={lang} composition={composition}/>
					</Loading>
				</Section>
			</Hidden>

			<Section lang={lang} title="taxon.overview.habitats">
				<Loading className="mb-4 aspect-video" loading={taxonData} width="100%" height="100px">
					<Habitats lang={lang} habitats={taxonHabitats}/>
				</Loading>
			</Section>
		</>
	);
}

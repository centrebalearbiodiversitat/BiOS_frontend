"use client"

// const languages = ['es']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import taxonomy from "@/API/taxonomy";
import occurrences from "@/API/occurrences";
import {useEffect, useState} from "react";
import VerticalTaxonomy from "@/components/VerticalTaxonomy";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import CBBSearchBar from "@/components/CBBSearchBar";
import Figure from "@/components/Figure";
import {useRouter} from "next/navigation";
import MapLibre from "@/components/maplibre/MapLibre";
import TaxonName from "@/components/TaxonName";
import Sources from "@/components/Sources";


export default function Taxon({params: {lang, id}}) {
	const [taxon, setTaxon] = useState({});
	const [higherTaxonomy, setHigherTaxonomy] = useState([]);
	const [children, setChildren] = useState([]);
	const [synonyms, setSynonyms] = useState([]);
	const [sources, setSources] = useState([]);
	const [occs, setOccs] = useState([]);
	const router = useRouter();


	const FILTER_BUTTONS = [
		{
			textKey: "components.searchbar.filter.taxonomy",
			onSelected: (taxonId) => router.push(`/${lang}/taxon/${taxonId}`),
			onInput: e => taxonomy.search(e)
		}
	]

	useEffect(() => {
		taxonomy.get(id)
			.then((r) => setTaxon(r))
		taxonomy.parent(id)
			.then((r) => setHigherTaxonomy(r))
		taxonomy.children(id)
			.then((r) => setChildren(r))
		taxonomy.synonyms(id)
			.then((r) => setSynonyms(r))
		taxonomy.sources(id)
			.then((r) => setSources(r))
		occurrences.list(id, null)
			.then(r => setOccs(occurrencesToGeoJson(id, r)));
	}, [id])

	return taxon.id && (
		<div className="flex flex-col-reverse xl:grid xl:grid-cols-12 mx-10 xl:mx-16 mt-5">
			<aside className="mx-auto col-span-3 xl:me-8 max-w-[400px] overflow-y-auto space-y-6">
				<div className="border-1 rounded-full mx-auto">
					<CBBSearchBar lang={lang} filters={FILTER_BUTTONS}/>
				</div>
				<hr/>
				<h2 className="text-2xl">
					{t(lang, 'taxon.sidebar.classification')}
				</h2>
				<VerticalTaxonomy lang={lang} taxonomy={[...higherTaxonomy, taxon]}/>

				<h3 className="text-2xl">
					{t(lang, 'taxon.sidebar.children')} ({children.length})
				</h3>
				<VerticalTaxonomy lang={lang} overflow={true} taxonomy={children}/>

				<h3 className="text-2xl">
					{t(lang, 'taxon.sidebar.synonyms')} ({synonyms.length})
				</h3>
				<VerticalTaxonomy lang={lang} overflow={true}  taxonomy={synonyms}/>
			</aside>
			<div className="rounded-2xl col-span-9 h-fit bg-gray-100 px-16 py-12 space-y-5">
				<div className="flex flex-row justify-center">
					<div className="w-full grid grid-cols-10 space-x-2">
						<div className="col-span-5 w-full h-[300px] max-h-[300px] border-accent">
							<Figure
								alt={`Representative image of ${taxon.name}`}
								className="h-full w-auto"
								caption={taxon.attribution}
								src={taxon.imageId}
							/>
						</div>
						<header className="p-12 col-span-5 my-auto">
							<h2 className="first-letter:uppercase font-extralight text-3xl">
								{taxon.taxonRank}
							</h2>
							<h1 className="first-letter:uppercase font-normal text-4xl">
								<TaxonName taxon={taxon} lang={lang}/>
							</h1>
							{taxon.scientificNameAuthorship &&
								<h1 className="first-letter:uppercase font-medium text-xl">
									{taxon.scientificNameAuthorship}
								</h1>
							}
							<p className="font-semibold first-letter:uppercase">
								{taxon.acceptedModifier &&
									<span className="capitalize me-1">{taxon.acceptedModifier}</span>}
								<span>{taxon.accepted ? t(lang, 'taxon.main.accepted') : t(lang, 'taxon.main.synonym')}</span>
							</p>
							<p className="text-small italic font-light">
								<span className="font-semibold me-1">ID:</span>{taxon.id}
							</p>
							<Sources sources={sources} className="my-4"/>
						</header>
					</div>
				</div>
				<div>
					<h3 className="text-2xl">
						{t(lang, 'taxon.main.distribution')}
					</h3>
					<MapLibre nav={true} style={{minHeight: '450px'}} data={[occs]} taxaColors={{[taxon.id]: '#ff6900'}}/>
				</div>
			</div>
		</div>
	);
}

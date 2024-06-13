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
import MapLibre from "@/components/MapLibre";
import {t} from "@/i18n/i18n";
import {occurrencesToGeoJson} from "@/utils/geojson";
import CBBSearchBar from "@/components/CBBSearchBar";
import Figure from "@/components/Figure";
import {useRouter} from "next/navigation";


export default function Taxon({params: {lang, id}}) {
	const [taxon, setTaxon] = useState({});
	const [higherTaxonomy, setHigherTaxonomy] = useState([]);
	const [children, setChildren] = useState([]);
	const [occs, setOccs] = useState([]);
	const [hasNoImage, setNoImage] = useState(false);
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
		occurrences.list(id, 1)
			.then(r => setOccs(occurrencesToGeoJson(r)));
	}, [id])

	return taxon.id && (
		<>
			<div className="flex flex-col-reverse xl:grid xl:grid-cols-12 mx-10 xl:mx-16 mt-5">
				<div className="mx-auto col-span-3 xl:me-8 max-w-[400px] overflow-y-auto">
					<div className="border-1 rounded-full mx-auto">
						<CBBSearchBar lang={lang} filters={FILTER_BUTTONS}/>
					</div>
					<hr className="my-4"/>
					<h2 className="text-2xl">
						{t(lang, 'taxon.sidebar.classification')}
					</h2>
					<VerticalTaxonomy lang={lang} taxonomy={[...higherTaxonomy, taxon]}/>

					<h3 className="text-2xl mt-10">
						{t(lang, 'taxon.sidebar.children')}
					</h3>
					<VerticalTaxonomy lang={lang} taxonomy={children}/>
				</div>
				<div className="rounded-2xl col-span-9 h-fit bg-gray-100 px-16 py-12 space-y-4">
					<div className="flex flex-row justify-center">
						<div className="w-full grid grid-cols-10 h-full space-x-2">
							<div className="bg-transparent rounded-2xl col-span-5 m-auto">
								<Figure
									onError={() => setNoImage(true)}
									isZoomed
									className="h-[300px] max-h-[300px] w-auto"
									alt={`Representative image of ${taxon.name}`}
									caption={taxon.attribution}
									src={
									hasNoImage || !(taxon.imageId)
										? 'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg'
										: taxon.imageId}
								/>
							</div>
							<header className="p-12 col-span-5 my-auto">
								<h2 className="first-letter:uppercase font-extralight text-3xl">
									{taxon.taxonRank}
								</h2>
								<h1 className="first-letter:uppercase font-normal italic text-4xl">
									{taxon.name}
								</h1>
								{taxon.scientificNameAuthorship &&
									<h1 className="first-letter:uppercase font-medium text-xl">
										{taxon.scientificNameAuthorship}
									</h1>
								}
								<p className="font-semibold first-letter:uppercase">
									{taxon.acceptedModifier &&
										<span className="capitalize me-1">{taxon.acceptedModifier}</span>}
									<span>{taxon.accepted ? 'accepted' : 'synonym'}</span>
								</p>
								<p className="text-small italic font-light">
									<span className="font-semibold me-1">ID:</span>{taxon.id}
								</p>
							</header>
						</div>
					</div>
					<hr/>
					<div className="h-[450px]">
						<h2 className="text-2xl">
							{t(lang, 'taxon.main.distribution')}
						</h2>
						<MapLibre nav={true} data={[occs]}/>
					</div>
				</div>
			</div>
		</>
	);
}

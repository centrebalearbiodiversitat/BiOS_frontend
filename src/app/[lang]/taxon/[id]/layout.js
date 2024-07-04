"use client"

import {t} from "@/i18n/i18n"

import "@/globals.css";
import 'maplibre-gl/dist/maplibre-gl.css';
import Aside from "@/sections/Aside";
import VerticalTaxonomy from "@/components/VerticalTaxonomy";
import MainContent from "@/sections/MainContent";
import Figure from "@/components/Figure";
import TaxonName from "@/components/TaxonName";
import Sources from "@/components/Sources";
import {useEffect, useMemo, useState} from "react";
import taxonomy from "@/API/taxonomy";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import LinkButton from "@/components/LinkButton";
import {usePathname} from "next/navigation";


export default function RootLayout({children, params: {lang, id}}) {
	const [taxon, setTaxon] = useState({});
	const [higherTaxonomy, setHigherTaxonomy] = useState([]);
	const [descendants, setDescendants] = useState([]);
	const [synonyms, setSynonyms] = useState([]);
	const [sources, setSources] = useState([]);
	const pathname = usePathname();

	useEffect(() => {
		taxonomy.get(id)
			.then((r) => setTaxon(r))
		taxonomy.parent(id)
			.then((r) => setHigherTaxonomy(r))
		taxonomy.children(id)
			.then((r) => setDescendants(r))
		taxonomy.synonyms(id)
			.then((r) => setSynonyms(r))
		taxonomy.sources(id)
			.then((r) => setSources(r))
	}, [id]);

	const TAB_BUTTONS = useMemo(() => [
		{href: `/${lang}/taxon/${id}`, text: t(lang, 'taxon.layout.button.taxon')},
		{href: `/${lang}/taxon/${id}/genetics`, text: t(lang, 'taxon.layout.button.genetics')}
	], [lang, id])

	return (
		<div className="flex flex-col-reverse xl:grid xl:grid-cols-12 mx-10 xl:mx-16 mt-5">
			<Aside className="col-span-3 xl:me-8 ">
				<div className=" rounded-full mx-auto">
					<FullCBBSearchBar lang={lang} border={true} rounded={false} showFilters={false}/>
				</div>
				<hr/>
				<h2 className="text-2xl">
					{t(lang, 'taxon.sidebar.classification')}
				</h2>
				<VerticalTaxonomy lang={lang} taxonomy={[...higherTaxonomy, taxon]}/>

				<h3 className="text-2xl">
					{t(lang, 'taxon.sidebar.children')} ({descendants.length})
				</h3>
				<VerticalTaxonomy lang={lang} overflow={true} taxonomy={descendants}/>

				<h3 className="text-2xl">
					{t(lang, 'taxon.sidebar.synonyms')} ({synonyms.length})
				</h3>
				<VerticalTaxonomy lang={lang} overflow={true} taxonomy={synonyms}/>
			</Aside>
			<MainContent className="col-span-9">
				<div className="flex flex-row justify-center">
					<div className="w-full grid grid-cols-10 space-x-2">
						<div className="col-span-5 w-full h-[335px] border-accent">
							{taxon.id && <Figure
								alt={`Representative image of ${taxon.name}`}
								className="h-auto w-full max-h-full"
								caption={taxon.attribution}
								src={taxon.imageId}
							/>}
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
				<div className="flex flex-row space-x-3 justify-center">
					{TAB_BUTTONS.map(button =>
						<LinkButton key={button.href} href={button.href}
						            color={button.href === pathname ? "primary" : "default"}>
							{button.text}
						</LinkButton>
					)}
				</div>
				<hr className="m-10"/>
				{children}
			</MainContent>
		</div>
	);
}

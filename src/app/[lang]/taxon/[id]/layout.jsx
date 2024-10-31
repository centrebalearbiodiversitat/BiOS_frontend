"use client"

import {t} from "@/i18n/i18n"

import "@/globals.css";
import 'maplibre-gl/dist/maplibre-gl.css';
import VerticalTaxonomy from "@/components/VerticalTaxonomy";
import MainContent from "@/sections/MainContent";
import Figure from "@/components/common/Figure";
import TaxonName from "@/components/common/TaxonName";
import Sources from "@/components/Sources";
import {useEffect, useMemo, useState, createContext, useContext} from "react";
import taxonomy from "@/API/taxonomy";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import TabButtonGroup from "@/components/common/TabButtonGroup";
import {Accordion, AccordionItem} from "@nextui-org/react";
import Loading from "@/components/common/Loading";
import {FaDna, FaInfo} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import DownloadModal from "@/components/DownloadModal";
import {TaxonProvider, useTaxon} from "@/context/TaxonContext";
import Scrollbars from "react-custom-scrollbars-2";


function AccordionTaxonomy({taxon, className, higherTaxonomy, lang, descendants, synonyms, ...extra}) {
	return (
		<Accordion className={className} {...extra}>
			<AccordionItem title={<h3 className="text-2xl font-extralight">{t(lang, 'taxon.sidebar.classification')}</h3>}
			               key="1" aria-label="Accordion 1">
				<Loading loading={[taxon, higherTaxonomy]} width="100%" height="300px">
					{taxon && higherTaxonomy && <VerticalTaxonomy lang={lang} taxonomy={[...higherTaxonomy, taxon]} markLast={true}/>}
					<div className="mt-3">
						<h4 className="pt-2 text-xl font-extralight">{t(lang, 'taxon.sidebar.children')} ({descendants?.length ?? 0})</h4>
						<Loading loading={descendants} width="100%" height="100px">
							{descendants && <VerticalTaxonomy lang={lang} overflow={true} taxonomy={descendants}/>}
						</Loading>
					</div>
				</Loading>
			</AccordionItem>
			<AccordionItem
				title={<h3 className="text-xl font-extralight">{t(lang, 'taxon.sidebar.synonyms')} ({synonyms?.length ?? 0})</h3>}
				key="3" aria-label="Accordion 3">
				<Loading loading={synonyms} width="100%" height="200px">
					{synonyms && <VerticalTaxonomy lang={lang} title={`${t(lang, 'taxon.sidebar.synonyms')} (${synonyms.length})`}
					                   overflow={true} taxonomy={synonyms}/>}
				</Loading>
			</AccordionItem>
		</Accordion>
	)
}


export default function RootLayout({children, params: {lang, id}}) {
	const [taxon, setTaxon] = useState(undefined);
	const [higherTaxonomy, setHigherTaxonomy] = useState(undefined);
	const [descendants, setDescendants] = useState(undefined);
	const [synonyms, setSynonyms] = useState(undefined);
	const [sources, setSources] = useState(undefined);

	useEffect(() => {
		taxonomy.get(id)
			.then(r => setTaxon(r))
		taxonomy.parent(id)
			.then(r => setHigherTaxonomy(r))
		taxonomy.children(id, true)
			.then(r => setDescendants(r))
		taxonomy.synonyms(id)
			.then(r => setSynonyms(r))
		taxonomy.sources(id)
			.then(r => setSources(r))
	}, [id]);

	const TAB_BUTTONS = useMemo(() => [
		{href: `/${lang}/taxon/${id}`, text: t(lang, 'taxon.layout.button.taxon'), icon: <FaInfo />},
		{href: `/${lang}/taxon/${id}/distribution`, text: t(lang, 'taxon.layout.button.distribution'), icon: <FaLocationDot />},
		{href: `/${lang}/taxon/${id}/genetics`, text: t(lang, 'taxon.layout.button.genetics'), icon: <FaDna />},
	], [lang, id])

	const taxonRank = useMemo(() => {
		return taxon ? t(lang, `general.taxon_rank.${taxon.taxonRank}`) : ""
	}, [lang, taxon])

	return (
		<article className="flex flex-col lg:grid lg:grid-cols-12 mx-6 md:mx-8 2xl:mx-16 mt-5 lg:gap-3">
			<aside className="col-span-3 w-full h-full space-y-2 mb-5 xl:me-8 m-auto">
				<div className="sticky max-h-[80svh] lg:h-[80svh] top-[128px] flex flex-col">
					<div className="rounded-full ms-auto w-full">
						<FullCBBSearchBar lang={lang} rounded={false} showFilters={false}/>
					</div>
					<Scrollbars universal autoHide className="hidden lg:block flex-grow h-0">
						<AccordionTaxonomy hideIndicator={true} showDivider={false}
						                   selectionMode="multiple" defaultSelectedKeys="all"
						                   className="px-0 pe-2.5" higherTaxonomy={higherTaxonomy}
						                   lang={lang} taxon={taxon} synonyms={synonyms} descendants={descendants}/>
					</Scrollbars>
				</div>
			</aside>
			<div className="rounded-lg col-span-9 xl:ps-8">
				<header className="flex flex-row justify-center mb-6">
					<div className="w-full grid grid-cols-5 md:space-x-10">
						<div
							className="col-span-full md:col-span-3 w-full h-[275px] xl:h-[350px] m-auto justify-center border-accent">
							<Loading loading={taxon} width="100%" height="100%">
								{taxon && <Figure alt={`Representative image of ${taxon.name}`}
								                  className="rounded-lg h-auto w-full max-h-full"
												  images={taxon?.images}/>}
							</Loading>
						</div>
						<div className="flex flex-col col-span-full md:col-span-2">
							<div className="ms-auto">
								<DownloadModal lang={lang} taxonId={id}/>
							</div>
							<div className="my-auto">
								<Loading loading={taxon} className="mb-4" width="40%" height="32px">
									{taxon &&
										<h2 className="first-letter:uppercase font-extralight text-3xl">
											{taxonRank}
										</h2>
									}
								</Loading>
								<Loading loading={taxon} className="mb-4" width="80%" height="58px">
									{taxon &&
										<h1 className="first-letter:uppercase font-medium text-4xl">
											<TaxonName taxon={taxon} lang={lang} redirect={false}/>
										</h1>
									}
								</Loading>
								<Loading loading={taxon} className="mb-4" width="60%" height="30px">
									{taxon &&
										<>
											{taxon.scientificNameAuthorship &&
												<h1 className="first-letter:uppercase font-normal text-xl">
													{taxon.scientificNameAuthorship}
												</h1>
											}
											<p className="font-semibold first-letter:uppercase">
												{taxon?.acceptedModifier &&
													<span className="capitalize me-1">{taxon.acceptedModifier}</span>}
												<span>{taxon?.accepted ? t(lang, 'taxon.main.accepted') : t(lang, 'taxon.main.synonym')}</span>
											</p>
											<p className="text-small italic font-light">
												<span className="font-semibold me-1">ID:</span>{taxon?.id}
											</p>
										</>
									}
								</Loading>
								<Loading loading={sources} width="100%" height="80px">
									<Sources sources={sources} className="my-3"/>
								</Loading>
							</div>
						</div>
					</div>
				</header>
				<AccordionTaxonomy showDivider={false} selectionMode="multiple"
				                   className="lg:hidden mt-3 mb-8" higherTaxonomy={higherTaxonomy}
				                   lang={lang} taxon={taxon} synonyms={synonyms} descendants={descendants}/>
				<TabButtonGroup buttons={TAB_BUTTONS} colorPrimary="bg-gray-100" colorSecondary="bg-gray-200"/>
				<MainContent>
					<TaxonProvider initialState={taxon}>
						{children}
					</TaxonProvider>
				</MainContent>
			</div>
		</article>
	);
}

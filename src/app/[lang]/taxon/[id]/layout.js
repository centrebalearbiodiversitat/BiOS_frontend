"use client"

import {t} from "@/i18n/i18n"

import "@/globals.css";
import 'maplibre-gl/dist/maplibre-gl.css';
import VerticalTaxonomy from "@/components/VerticalTaxonomy";
import MainContent from "@/sections/MainContent";
import Figure from "@/components/common/Figure";
import TaxonName from "@/components/common/TaxonName";
import Sources from "@/components/Sources";
import {useEffect, useMemo, useState} from "react";
import taxonomy from "@/API/taxonomy";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import CBBButton from "@/components/common/CBBButton";
import {BsFiletypeCsv} from "react-icons/bs";
import Link from "next/link";
import TabButtonGroup from "@/components/common/TabButtonGroup";
import {Accordion, AccordionItem} from "@nextui-org/react";
import Loading from "@/components/common/Loading";
import {FaDna, FaInfo} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";


function AccordionTaxonomy({taxon, className, higherTaxonomy, lang, descendants, synonyms, ...extra}) {
	return (
		<Accordion className={`${className}`} {...extra}>
			<AccordionItem title={<h3 className="text-xl font-normal">{t(lang, 'taxon.sidebar.classification')}</h3>}
			               key="1" aria-label="Accordion 1">
				<Loading loading={taxon === null || higherTaxonomy === null} width="100%" height="300px">
					{taxon && higherTaxonomy && <VerticalTaxonomy lang={lang} taxonomy={[...higherTaxonomy, taxon]} markLast={true}/>}
					<div className="ps-2 mt-3">
						<h4 className="pt-2 font-light">{t(lang, 'taxon.sidebar.children')} ({descendants?.length ?? 0})</h4>
						<Loading loading={descendants === null} width="100%" height="100px">
							{descendants && <VerticalTaxonomy lang={lang} overflow={true} taxonomy={descendants}/>}
						</Loading>
					</div>
				</Loading>
			</AccordionItem>
			<AccordionItem
				title={<h3 className="text-xl font-normal">{t(lang, 'taxon.sidebar.synonyms')} ({synonyms?.length ?? 0})</h3>}
				key="3" aria-label="Accordion 3">
				<Loading loading={synonyms === null} width="100%" height="200px">
					{synonyms && <VerticalTaxonomy lang={lang} title={`${t(lang, 'taxon.sidebar.synonyms')} (${synonyms.length})`}
					                   overflow={true} taxonomy={synonyms}/>}
				</Loading>
			</AccordionItem>
		</Accordion>
	)
}


export default function RootLayout({children, params: {lang, id}}) {
	const [taxon, setTaxon] = useState(null);
	const [higherTaxonomy, setHigherTaxonomy] = useState(null);
	const [descendants, setDescendants] = useState(null);
	const [synonyms, setSynonyms] = useState(null);
	const [sources, setSources] = useState(null);
	const [checklistLink, setChecklistLink] = useState('');

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
		taxonomy.checklist(id)
			.then(r => setChecklistLink(r))
	}, [id]);

	const TAB_BUTTONS = useMemo(() => [
		{href: `/${lang}/taxon/${id}`, text: t(lang, 'taxon.layout.button.taxon'), icon: <FaInfo />},
		{href: `/${lang}/taxon/${id}/distribution`, text: t(lang, 'taxon.layout.button.distribution'), icon: <FaLocationDot />},
		{href: `/${lang}/taxon/${id}/genetics`, text: t(lang, 'taxon.layout.button.genetics'), icon: <FaDna />},
	], [lang, id])

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-12 mx-5 md:mx-8 2xl:mx-16 mt-5">
			<aside className="col-span-3 w-full h-full space-y-6 mb-5 xl:me-8 m-auto">
				<div className="rounded-full ms-auto w-full">
					<FullCBBSearchBar lang={lang} border={true} rounded={false} showFilters={false}/>
				</div>
				<AccordionTaxonomy hideIndicator={true} showDivider={false}
				                   selectionMode="multiple" defaultSelectedKeys="all"
				                   className="hidden lg:block" higherTaxonomy={higherTaxonomy}
				                   lang={lang} taxon={taxon} synonyms={synonyms} descendants={descendants}/>
			</aside>
			<div className="col-span-9 md:px-4 2xl:px-16 space-y-6">
				<div className="flex flex-row justify-center mb-10">
					<div className="w-full grid grid-cols-2 lg:space-x-12">
						<div className="col-span-full lg:col-span-1 w-full h-[275px] xl:h-[350px] m-auto justify-center border-accent">
							<Loading loading={taxon === null} width="100%" height="100%">
								{taxon && <Figure alt={`Representative image of ${taxon.name}`}
								         		  className="rounded-lg h-auto w-full max-h-full"
												  images={taxon?.images}/>}
							</Loading>
						</div>
						<header className="flex flex-col col-span-full lg:col-span-1">
							<div className="ms-auto">
								<Link href={checklistLink} download={true}>
									<CBBButton className="border-primary px-5">
										Taxonomy <BsFiletypeCsv className="text-2xl"/>
									</CBBButton>
								</Link>
							</div>
							<div className="my-auto">
								<Loading loading={taxon === null} className="mb-4" width="40%" height="32px">
									{taxon &&
										<h2 className="first-letter:uppercase font-extralight text-3xl">
											{taxon.taxonRank}
										</h2>
									}
								</Loading>
								<Loading loading={taxon === null} className="mb-4" width="80%" height="58px">
									{taxon &&
										<h1 className="first-letter:uppercase font-medium text-4xl">
											<TaxonName taxon={taxon} lang={lang}/>
										</h1>
									}
								</Loading>
								<Loading loading={taxon === null} className="mb-4" width="60%" height="30px">
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
								<Loading loading={sources === null} width="100%" height="80px">
									<Sources sources={sources} className="my-3"/>
								</Loading>
							</div>
						</header>
					</div>
				</div>
				<div>
					<AccordionTaxonomy showDivider={false} selectionMode="multiple"
					                   className="lg:hidden mt-3 mb-8" higherTaxonomy={higherTaxonomy}
					                   lang={lang} taxon={taxon} synonyms={synonyms} descendants={descendants}/>
					<TabButtonGroup buttons={TAB_BUTTONS} colorPrimary="bg-gray-100" colorSecondary="bg-gray-200"/>
					<MainContent>
						{children}
					</MainContent>
				</div>
			</div>
		</div>
	);
}

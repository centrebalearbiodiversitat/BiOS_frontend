import {t} from "@/i18n/i18n"

import 'maplibre-gl/dist/maplibre-gl.css';
import MainContent from "@/sections/MainContent";
import Figure from "@/components/common/Figure";
import TaxonName from "@/components/common/TaxonName";
import Sources from "@/components/Sources";
import taxonomy from "@/API/taxonomy";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import {TabButtonGroup, TabButton} from "@/components/common/TabButtonGroup";
import DownloadModal from "@/components/DownloadModal";
import {TaxonProvider} from "@/contexts/TaxonContext";
import occurrences from "@/API/occurrences";
import genetics from "@/API/genetics";
import {notFound} from "next/navigation";
import {AccordionTaxonomy} from "@/app/[lang]/taxon/[id]/components/AccordionTaxonomy";
import {FaDna, FaInfo} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {Suspense} from "react";
import {generateSourceUrl} from "@/utils/utils";
import {IMAGE_NOT_FOUND_SRC} from "@/utils/CONSTANTS";

export async function generateMetadata({params, searchParams}) {
	const {lang, id} = await params;
	const taxon = await taxonomy.get(id);

	const description = t(lang, 'taxon.overview.description').replace("{name}", taxon.name)

	return {
		description,
		openGraph: {
			description,
			images: [
				{url: generateSourceUrl(taxon?.images[0], IMAGE_NOT_FOUND_SRC)}
			]
		}
	}
}

export default async function RootLayout({children, params}) {
	const {lang, id} = await params;

	const taxon = await taxonomy.get(id);

	if (!taxon) {
		notFound();
	}

	const [
		higherTaxonomy,
		descendants,
		synonyms,
		sources,
		checklistLink,
		occurrencesLink,
		geneticsLink
	] = await Promise.all([
		taxonomy.parent(id),
		taxonomy.children(id, true),
		taxonomy.synonyms(id),
		taxonomy.sources(id),
		taxonomy.checklist(id),
		occurrences.listDownload(id),
		genetics.listSequenceDownload(id)
	]);

	const availableDownloads = [
		{
			title: t(lang, "taxon.layout.modal.checklist"),
			description: t(lang, "taxon.layout.modal.checklist.help"),
			link: checklistLink.toString(),
		},
		{
			title: t(lang, "taxon.layout.modal.occurrences"),
			description: t(lang, "taxon.layout.modal.occurrences.help"),
			link: occurrencesLink.toString(),
		},
		{
			title: t(lang, "taxon.layout.modal.sequences"),
			description: t(lang, "taxon.layout.modal.sequences.help"),
			link: geneticsLink.toString(),
		},
	];

	const TAB_BUTTONS = [
		{href: `/${lang}/taxon/${id}`, text: t(lang, 'taxon.layout.button.taxon'), icon: <FaInfo/>},
		{href: `/${lang}/taxon/${id}/distribution`, text: t(lang, 'taxon.layout.button.distribution'), icon: <FaLocationDot/>},
		{href: `/${lang}/taxon/${id}/genetics`, text: t(lang, 'taxon.layout.button.genetics'), icon: <FaDna/>},
	];

	const taxonRank = t(lang, `general.taxon_rank.${taxon.taxonRank}`);

	return (
		<div className="flex flex-col lg:flex-row lg:gap-11 mx-4 md:mx-8 2xl:mx-16 mt-5">
			<aside className="basis-1/4 w-full h-full space-y-2 mb-5 sticky top-[110px]">
				<div className="max-h-[80svh] lg:h-[80svh] flex flex-col gap-6">
					<div className="rounded-full ms-auto w-full">
						<FullCBBSearchBar lang={lang} rounded={true} showFilters={false}/>
					</div>
					<div className="hidden lg:block custom-scrollbar overflow-y-auto grow h-0">
						<AccordionTaxonomy lang={lang} hideIndicator={true} showDivider={false}
						                   selectionMode="multiple" defaultSelectedKeys="all"
						                   className="px-0 pe-2.5" higherTaxonomy={higherTaxonomy}
						                   taxon={taxon} synonyms={synonyms} descendants={descendants}/>
					</div>
				</div>
			</aside>
			<article className="basis-3/4 rounded-lg col-span-9 space-y-6">
				<header className="flex flex-row justify-center mb-6">
					<div className="w-full grid grid-cols-5 gap-1 md:gap-6">
						<div className="col-span-full md:col-span-3 w-full h-[275px] xl:h-[350px] m-auto justify-center border-accent">
							{taxon && <Figure alt={`Representative image of ${taxon.name}`}
							                  className="rounded-lg h-auto w-full max-h-full"
											  images={taxon?.images}/>}
						</div>
						<div className="flex flex-col col-span-full md:col-span-2">
							<div className="ms-auto mt-4">
								<DownloadModal availableDownloads={availableDownloads}/>
							</div>
							<div className="my-auto">
								{taxon &&
									<h2 className="first-letter:uppercase font-extralight text-3xl">
										{taxonRank}
									</h2>
								}
								{taxon &&
									<TaxonName as="h1" className="first-letter:uppercase font-medium text-4xl" taxon={taxon} redirect={false}/>
								}
								{taxon &&
									<>
										{taxon.scientificNameAuthorship &&
											<h3 className="first-letter:uppercase font-normal text-xl">
												{taxon.scientificNameAuthorship}
											</h3>
										}
										<p className="font-semibold first-letter:uppercase">
											{taxon?.acceptedModifier &&
												<span className="capitalize me-1">{taxon.acceptedModifier}</span>}
												{taxon?.accepted ?
													<span>{t(lang, 'general.taxonStatus.accepted')}</span> :
													<span className="text-secondary font-bold">{t(lang, 'general.taxonStatus.synonym')}</span>}
										</p>
										<p className="text-small italic font-light">
											<span className="font-semibold me-1">ID:</span>{taxon?.id}
										</p>
									</>
								}
								<Sources sources={sources} className="my-3"/>
							</div>
						</div>
					</div>
				</header>
				<AccordionTaxonomy lang={lang} showDivider={false} selectionMode="multiple"
				                   className="lg:hidden mt-3 mb-8" higherTaxonomy={higherTaxonomy}
				                   taxon={taxon} synonyms={synonyms} descendants={descendants}/>
				<TabButtonGroup buttons={TAB_BUTTONS} colorPrimary="bg-gray-100" colorSecondary="bg-gray-200">
					{
						TAB_BUTTONS.map((button, index) => (
							<TabButton key={button.href} text={button.text} href={button.href} icon={button.icon}/>
						))
					}
				</TabButtonGroup>
				<MainContent>
					<TaxonProvider initialState={taxon}>
						<Suspense>
							{children}
						</Suspense>
					</TaxonProvider>
				</MainContent>
			</article>
		</div>
	);
}

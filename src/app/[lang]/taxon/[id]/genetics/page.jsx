"use client"

// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import React, {useEffect, useMemo, useState} from "react";
import {t} from "@/i18n/i18n";
import genetics from "@/API/genetics";
import {
	Card,
	CardBody,
} from "@nextui-org/react";
import TableList from "@/components/TableList";
import Loading from "@/components/common/Loading";
import Section from "@/components/common/Section";
import {useTaxon} from "@/context/TaxonContext";
import {generatePageTitle} from "@/utils/utils";

export default function TaxonSequences({params: {id, lang}}) {
	const [taxon, setTaxon] = useTaxon();
	const [seqs, setSeqs] = useState([]);
	const [genes, setGenes] = useState(undefined);

	useEffect(() => {
		// genetics.listSequences(taxonId).then(r => setSeqs(r))
		genetics.listGenes(id).then(r => setGenes(r))
	}, [id]);

	useEffect(() => {
		if (taxon)
			document.title = generatePageTitle(lang, `${taxon.name} - ${t(lang, 'taxon.layout.button.genetics')}`)
	}, [taxon, lang]);

	const SEQ_HEADERS = useMemo(
		() => {
			return [
				{key: 'bp', name: 'BP'},
				{key: 'dataFileDivision', name: 'Data File Division'},
				{key: 'moleculeType', name: 'Molecule Type'},
				{key: 'isolate', name: 'Isolate'},
				{key: 'definition', name: 'Definition'},
				{key: 'publishedDate', name: 'Published date'},
			]
		}
	, [])

	return (
		<>
			<Section lang={lang} title="taxon.genetics.genes">
				<Loading loading={genes} width="100%" height={200}>
					<ul className="grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8">
						{genes &&
							genes.map(
								gene => (
									<li key={gene.id} className="col-span-1 m-1">
										<Card className="">
											<CardBody className="flex flex-col text-center overflow-hidden">
												<p className="font-bold">
													{gene.name}
												</p>
												<div className="flex-1 w-full">
													<p className="m-auto">
														{gene.total}
													</p>
												</div>
											</CardBody>
										</Card>

									</li>
								)
							)
						}
					</ul>
				</Loading>
			</Section>

			<Section lang={lang} title="taxon.genetics.genomes">
				<TableList list={seqs} headers={SEQ_HEADERS}/>
			</Section>
			<Section lang={lang} title="taxon.genetics.transcriptomes">
				<TableList list={[]} headers={SEQ_HEADERS}/>
			</Section>
			<Section lang={lang} title="taxon.genetics.mitogenomes">
				<TableList list={[]} headers={SEQ_HEADERS}/>
			</Section>
		</>
	);
}

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
import Loading from "@/components/Loading";

export default function TaxonSequences({params: {id, lang}}) {
	const [seqs, setSeqs] = useState([]);
	const [genes, setGenes] = useState(null);

	useEffect(() => {
		// genetics.listSequences(taxonId).then(r => setSeqs(r))
		genetics.listGenes(id).then(r => setGenes(r))
	}, [id]);

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
			<h3 className="text-2xl">
				{t(lang, "taxon.genetics.genes")}
			</h3>
			<Loading loading={genes === null} width="100%" height={200}>
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
			<h3 className="text-2xl">
				{t(lang, "taxon.genetics.genomes")}
			</h3>
			<TableList list={seqs} headers={SEQ_HEADERS}/>
			<h3 className="text-2xl">
				{t(lang, "taxon.genetics.transcriptomes")}
			</h3>
			<TableList list={seqs} headers={SEQ_HEADERS}/>
			<h3 className="text-2xl">
				{t(lang, "taxon.genetics.mitogenomes")}
			</h3>
			<TableList list={seqs} headers={SEQ_HEADERS}/>
		</>
	);
}

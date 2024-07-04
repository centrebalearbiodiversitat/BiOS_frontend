"use client"

// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import {useEffect, useMemo, useState} from "react";
import taxonomy from "@/API/taxonomy";
import {t} from "@/i18n/i18n";
import genetics from "@/API/genetics";
import {
	Card,
	CardBody,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from "@nextui-org/react";

export default function TaxonSequences({params: {id, lang}}) {
	const [seqs, setSeqs] = useState([]);
	const [genes, setGenes] = useState([]);

	useEffect(() => {
		// genetics.listSequences(taxonId).then(r => setSeqs(r))
		genetics.listGenes(id).then(r => setGenes(r))
	}, [id]);

	return (
		<>
			<ul className="grid grid-cols-6">
				{
					genes.map(
						gene => (
							<li key={gene.id} className="col-span-1 m-1">
								<Card className="h-full w-full">
									<CardBody className="text-center">
										{gene.name}
									</CardBody>
								</Card>

							</li>
						)
					)
				}
			</ul>
			<Table aria-label="Example table with client side sorting"
			       classNames={{
				       table: "min-h-[400px]",
			       }}>
				<TableHeader>
					<TableColumn key="bp" allowsSorting>
						BP
					</TableColumn>
					<TableColumn key="dataFileDivision" allowsSorting>
						Data File Division
					</TableColumn>
					<TableColumn key="moleculeType" allowsSorting>
						Molecule Type
					</TableColumn>
					<TableColumn key="isolate" allowsSorting>
						Isolate
					</TableColumn>
					<TableColumn key="definition" allowsSorting>
						Definition
					</TableColumn>
					<TableColumn key="publishedDate" allowsSorting>
						Published date
					</TableColumn>
				</TableHeader>
				<TableBody items={seqs} isLoading={false} loadingContent={<Spinner label="Loading..."/>}>
					{(item) => (
						<TableRow key={item.id}>
							{
								(columnKey) => (
									<TableCell>{
										item[columnKey]}
									</TableCell>
								)
							}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}

"use client"
// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import taxonomy from "@/API/taxonomy";
import {useEffect, useState} from "react";
import VerticalTaxonomy from "@/components/VerticalTaxonomy";

export default function Taxon({params: {id}}) {
	const [taxon, setTaxon] = useState({});
	const [higherTaxonomy, setHigherTaxonomy] = useState([]);
	const [children, setChildren] = useState([]);

	useEffect(() => {
		taxonomy.taxon(id)
			.then((r) => setTaxon(r))
		taxonomy.parent(id)
			.then((r) => setHigherTaxonomy(r))
		taxonomy.children(id)
			.then((r) => setChildren(r))
	}, [id])

	return (
		<div className="grid grid-cols-3">
			<div className="bg-secondary col-span-1">
				<VerticalTaxonomy taxonomy={higherTaxonomy}/>
			</div>
			<div className="bg-accent col-span-1">
				<span>
					{JSON.stringify(taxon)}
				</span>
			</div>
			<div className="bg-primary col-span-1">
				<VerticalTaxonomy taxonomy={children}/>
			</div>
		</div>
	);
}

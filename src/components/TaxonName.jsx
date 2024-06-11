import React from "react";
import Link from "next/link";

export default function TaxonName({id, lang, name}) {

	return (
		<Link href={`/${lang}/taxon/${id}`} className="first-letter:uppercase">
			{name}
		</Link>
	);
}
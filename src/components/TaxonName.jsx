import React, {useMemo} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/Loading";


const ITALIC_RANKS = new Set([
	"genus",
	"species",
	"subspecies",
	"variety",
])


export default function TaxonName({lang, taxon, author = false}) {
	const pathname = usePathname();

	const href = useMemo(() => {
		return `/${lang}/taxon/${taxon.id}${pathname.endsWith('genetics') ? '/genetics' : ''}`
	}, [lang, taxon.id, pathname])

	return (
		<Link href={href} className={`first-letter:uppercase text-pretty`}>
			<span className={`${ITALIC_RANKS.has(taxon.taxonRank) ? "italic" : ""}`}>
				{taxon.name}
			</span>
			{
				author && taxon.scientificNameAuthorship && (
					<span className="font-light">
						, {taxon.scientificNameAuthorship}
					</span>
				)
			}
		</Link>
	);
}
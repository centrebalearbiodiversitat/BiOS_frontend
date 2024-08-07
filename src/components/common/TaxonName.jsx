import React, {useMemo} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/common/Loading";
import {RxExternalLink} from "react-icons/rx";


const ITALIC_RANKS = new Set([
	"genus",
	"species",
	"subspecies",
	"variety",
])


export default function TaxonName({lang, taxon, author = false}) {
	const pathname = usePathname();

	const href = useMemo(() => {
		return pathname.replace(/\/taxon\/\d+/, `/taxon/${taxon.id}`)
	}, [lang, taxon.id, pathname])

	return (
		<Link href={href} className={`first-letter:uppercase text-pretty hover:underline`}>
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
			{/*{showRedirect && <span className="inline-block ms-2 my-auto"><RxExternalLink/></span>}*/}
		</Link>
	);
}
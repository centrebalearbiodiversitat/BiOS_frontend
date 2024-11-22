"use client"

import React, {useMemo} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";


const ITALIC_RANKS = new Set([
	"genus",
	"species",
	"subspecies",
	"variety",
])

const handleScrollTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

function LinkOrP({children, as, redirect, className, ...extra}) {
	className = `${className} ${redirect ? "hover:underline" : ""}`

	const Component = redirect ? Link : as;

	return <Component onClick={handleScrollTop} className={className} {...extra}>{children}</Component>;
}


export default function TaxonName({lang, className, as = 'p', taxon, author = false, redirect = true}) {
	const pathname = usePathname();

	const href = useMemo(() => {
		if (!redirect) {
			return '';
		} else if (pathname.search(/\/taxon\/\d+/) === -1) {
			return `/${lang}/taxon/${taxon.id}`;
		} else {
			return pathname.replace(/\/taxon\/\d+/, `/taxon/${taxon.id}`);
		}
	}, [redirect, lang, taxon.id, pathname]);

	return (
		<LinkOrP as={as} redirect={redirect} href={href} className={clsx(`first-letter:uppercase text-pretty`, className)}>
			<span className={`${ITALIC_RANKS.has(taxon.taxonRank) ? "italic" : ""}`}>
				{taxon.name}
			</span>
			{author && taxon.scientificNameAuthorship && (
				<span className="font-light">
					, {taxon.scientificNameAuthorship}
				</span>
			)}
			{/*{showRedirect && <span className="inline-block ms-2 my-auto"><RxExternalLink/></span>}*/}
		</LinkOrP>
	);
}
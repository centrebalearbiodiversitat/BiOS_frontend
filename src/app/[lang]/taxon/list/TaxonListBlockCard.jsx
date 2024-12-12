"use client"

import TaxonName from "@/components/common/TaxonName";
import Figure from "@/components/common/Figure";
import {t} from "@/i18n/i18n";
import React, {useMemo, useState} from "react";
import Link from "next/link";
import {FaChevronRight} from "react-icons/fa";
import clsx from "clsx";
import Loading from "@/components/common/Loading";
import {handleScrollTop} from "@/utils/utils";
import StatusPill from "@/components/common/StatusPill";
import AncestorsList from "@/components/common/AncestorsList";

export default function TaxonListBlockCard({lang, taxon}) {
	const [isHovered, setIsHovered] = useState(false);
	const isLoading = typeof taxon === 'object' && Object.keys(taxon).length === 0;

	const isNameTooLong = useMemo(() => {
		return taxon?.name?.split(" ").length > 2
	}, [taxon]);

	return (
		<Link href={`/${lang}/taxon/${taxon.id}`} onClick={handleScrollTop}
		      onMouseEnter={() => setIsHovered(true)}
		      onMouseLeave={() => setIsHovered(false)}
		      className="rounded-xl w-full h-[300px] max-h-[300px] flex flex-col border border-slate-200 transition-all hover:brightness-[1.03] hover:bg-gray-100">
			<Loading loading={isLoading} width="100%" height="100%">
				<Figure alt={`Representative image of ${taxon.name}`}
				        className="grow rounded-t-xl" hoverEffect={false}
				        images={taxon.images}/>
			</Loading>
			<div className="flex flex-row rounded-lg px-4 pt-2 pb-3 min-h-[80px] flex-shrink-0">
				<div className={clsx("flex flex-col w-full justify-center gap-1")}>
					<Loading loading={isLoading} className="mb-1" width="40%" height="16px">
						{!isLoading && <AncestorsList lang={lang} className="text-xs font-extralight truncate flex-shrink-0"
						                              ancestors={taxon.ancestors.length > 4 ? taxon.ancestors.slice(1, 5) : taxon.ancestors}/>}
					</Loading>
					<Loading loading={isLoading} width="80%" height="22px">
						<TaxonName redirect={false} as="p" taxon={taxon}
						           className={clsx("leading-4 first-letter:uppercase font-normal", isHovered && 'underline', isNameTooLong ? "text-base" : "text-xl")}/>
						{!isLoading && <p className="first-letter:uppercase text-sm font-extralight">
							{t(lang, `general.taxon_rank.${taxon.taxonRank}`)} <StatusPill lang={lang} taxon={taxon} className="ms-1"/>
						</p>}
					</Loading>
				</div>
			</div>
		</Link>
	)
}
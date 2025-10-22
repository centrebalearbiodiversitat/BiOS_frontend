import React, {useCallback, useMemo, useState} from "react";
import {t} from "@/i18n/i18n";
import Loading from "@/components/common/Loading";
import {useLang} from "@/contexts/LangContext";
import Link from "next/link";
import {handleScrollTop} from "@/utils/utils";
import Figure from "@/components/common/Figure";
import clsx from "clsx";
import AncestorsList from "@/components/common/AncestorsList";
import TaxonName from "@/components/common/TaxonName";
import StatusPill from "@/components/common/StatusPill";
import {useRouter} from "next/navigation";

function TaxonListBlockCard({lang, taxon}) {
	const router = useRouter();
	const [isHovered, setIsHovered] = useState(false);
	const isLoading = typeof taxon === 'object' && Object.keys(taxon).length === 0;

	const isNameTooLong = useMemo(() => {
		return taxon?.name?.split(" ").length > 2
	}, [taxon]);

	const onClick = useCallback(() => {
		router.push(`/${lang}/taxon/${taxon.id}`)
		handleScrollTop();
	}, [router, lang, taxon]);

	return (
		<div onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
		     className="rounded-xl cursor-pointer w-full h-[300px] max-h-[300px] flex flex-col border border-slate-200 transition-all hover:brightness-[1.03] hover:bg-gray-100">
			<Loading loading={isLoading} width="100%" height="100%">
				<Figure alt={`Representative image of ${taxon.name}`}
				        className="grow rounded-t-xl" hoverEffect={false}
				        images={taxon.images}/>
			</Loading>
			<div className="flex flex-row rounded-lg px-4 pt-2 pb-3 min-h-[80px] shrink-0">
				<div className={clsx("flex flex-col w-full justify-center gap-1")}>
					<Loading loading={isLoading} className="mb-1" width="40%" height="16px">
						{!isLoading && taxon.ancestors && <AncestorsList className="text-xs font-extralight truncate shrink-0"
						                              ancestors={taxon.ancestors.length > 4 ? taxon.ancestors.slice(1, 5) : taxon.ancestors}/>}
					</Loading>
					<Loading loading={isLoading} width="80%" height="22px">
						<TaxonName redirect={true} taxon={taxon}
						           className={clsx("leading-4 first-letter:uppercase font-normal", isHovered && 'underline', isNameTooLong ? "text-base" : "text-xl")}/>
						{!isLoading && <p className="first-letter:uppercase text-sm font-extralight">
							{t(lang, `general.taxon_rank.${taxon.taxonRank}`)} <StatusPill lang={lang} taxon={taxon} className="ms-1"/>
						</p>}
					</Loading>
				</div>
			</div>
		</div>
	)
}

export default function TaxaList({taxa}) {
	const [lang] = useLang();

	return (
		<Loading loading={taxa} width="100%" height="100%">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{taxa?.map((taxon, idx) => <TaxonListBlockCard key={taxon.id || (-idx - 1)} lang={lang} taxon={taxon}/>)}
			</div>
			{typeof taxa === 'object' && taxa.length === 0 &&
				<p className="text-center w-full font-extralight flex flex-wrap gap-1 justify-center my-auto">
					{t(lang, "taxon.list.notFound")}
				</p>
			}
		</Loading>
	)
}
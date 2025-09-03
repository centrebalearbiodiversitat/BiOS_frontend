"use client"

import React, {useCallback, useRef} from "react";
import Loading from "@/components/common/Loading";
import {Divider} from "@heroui/divider";
import {Pagination} from "@heroui/pagination";
import SourceLink from "@/components/common/SourceLink";
import Hidden from "@/components/common/Hidden";
import {useRouter, useSearchParams} from "next/navigation";
import TaxonName from "@/components/common/TaxonName";
import Empty from "@/components/Empty";
import {RxExternalLink} from "react-icons/rx";
import {useLang} from "@/contexts/LangContext";


function Sequence({seq}) {
	const source = seq.sources[0];

	return (
		<li className="hover:bg-slate-50 border-b border-gray-200">
			{/*<p className="font-extralight">*/}
			{/*	{seq.definition}*/}
			{/*</p>*/}
			<div className="grid grid-cols-5 py-4 text-sm gap-x-1.5">
				<p>
					<TaxonName taxon={seq.occurrence.taxonomy}/>
				</p>
				<p>
					{source.source?.basis.acronym ?? source.source?.basis.name}
				</p>
				<SourceLink source={source}>
					{/*<Sources sources={seq.sources} className="my-3"/>*/}
					<p className="inline-flex gap-x-1 link w-full">
						<span className="truncate overflow-hidden whitespace-nowrap">{source.externalId}</span> <RxExternalLink className="text-md my-auto align-baseline flex-shrink-0"/>
					</p>
				</SourceLink>
				<p>
					{seq.publishedDate ?? "-"}
				</p>
				<ul className="flex flex-wrap gap-2">
					{
						seq.markers.map(
							marker => (
								<li key={marker.id} className="rounded-full bg-black h-auto text-white text-sm max-h-[20px] px-3">
									{marker.name}
								</li>
							)
						)
					}
				</ul>
			</div>
		</li>
	)
}


export default function TaxonSequences({sequences}) {
	const [lang] = useLang();
	const titlesRef = useRef(null);
	const router = useRouter();
	const searchParams = useSearchParams();

	const pageSwap = useCallback((page) => {
		if (!isNaN(page)) {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", page)
			router.push(`?${params.toString()}`, {scroll: false});
			if (titlesRef.current) {
		      const elementTop = titlesRef.current.getBoundingClientRect().top;
		      const offset = window.innerHeight / 3; // Scroll to the middle of the screen
		      window.scrollBy({ top: elementTop - offset, behavior: "smooth" });
		    }
		}
	}, [router, searchParams]);

	return (
		<Loading loading={sequences} width="100%" height="795px">
			<div className="space-y-6">
				<div className="custom-scrollbar overflow-x-auto" style={{width: "100%"}}>
					<div className="min-w-[600px]">
						<div ref={titlesRef} className="grid grid-cols-5 font-semibold pb-2">
							<p>
								Taxon
							</p>
							<p>
								Source
							</p>
							<p>
								External ID
							</p>
							<p>
								Published date
							</p>
							<p>
								Markers
							</p>
						</div>
						<Divider/>
						<Empty lang={lang} isEmpty={sequences?.data.length === 0}>
							<ul className="outline outline-1 outline-slate-200">
								{sequences &&
									sequences.data.map(
										seq => <Sequence key={seq.id} seq={seq}/>
									)
								}
							</ul>
						</Empty>
					</div>
				</div>
				<Hidden hide={!sequences || sequences.pages <= 1}>
					<div className="flex flex-row container justify-center">
						<Pagination total={sequences ? sequences.pages : 0}
						            page={parseInt(searchParams.get('page')) || 1}
						            initialPage={parseInt(searchParams.get('page')) || 1}
						            onChange={pageSwap}/>
					</div>
				</Hidden>
			</div>
		</Loading>
	)
}
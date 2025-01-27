"use client"

import React, {useEffect, useMemo, useState} from "react";
import {t} from "@/i18n/i18n";
import Empty from "@/components/Empty";
import Link from "next/link";
import taxonomy from "@/API/taxonomy";
import Hidden from "@/components/common/Hidden";
import Section from "@/components/common/Section";
import Loading from "@/components/common/Loading";


const DESCENDANTS = [
	"kingdom",
	"phylum",
	"class",
	"order",
	"family",
	"genus",
	"species",
	"subspecies",
	"variety"
]


export default function TaxonDescendants({lang, taxonId}) {
	const [descendants, setDescendants] = useState(undefined);

	useEffect(() => {
		taxonomy.descendantCount(taxonId)
			.then(r => setDescendants(r));
	}, [taxonId]);

	return (
		<Hidden hide={descendants === null || descendants !== undefined && Object.keys(descendants).length === 0}>
			<Section title="taxon.overview.statistics">
				<Loading className="mb-4 aspect-video" loading={descendants} width="100%" height="300px">
					<ul className="flex flex-row flex-wrap gap-2">
						{descendants &&
							DESCENDANTS.map((level) => (
								<li key={level} className="font-extralight text-sm p-3.5 flex flex-col bg-white rounded-xl transition-all border-1 hover:border-primary hover:shadow-md"
									style={{
										minWidth: 120,
										maxWidth: 120,
										width: 120,
										minHeight: 100,
										maxHeight: 100,
										height: 100,
									}}>
									<Link href={`/${lang}/taxon/list?ancestor=${taxonId}&rank=${level}`}>
										<p className="capitalize">
											{t(lang, `general.taxon_rank.${level}`)}
										</p>
										<div className="flex-1 flex align-middle w-full h-full">
											<p className="mt-auto font-extralight text-2xl">
												{descendants[level]}
											</p>
										</div>
									</Link>
								</li>
							))
						}
					</ul>
				</Loading>
			</Section>
		</Hidden>
	)
}
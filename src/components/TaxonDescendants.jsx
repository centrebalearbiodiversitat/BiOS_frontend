"use client"

import React, {useEffect, useMemo, useState} from "react";
import {t} from "@/i18n/i18n";
import Empty from "@/components/Empty";
import Link from "next/link";
import taxonomy from "@/API/taxonomy";
import Hidden from "@/components/common/Hidden";
import Section from "@/components/common/Section";
import Loading from "@/components/common/Loading";


export default function TaxonDescendants({lang, taxonId}) {
	const [descendants, setDescendants] = useState(undefined);

	useEffect(() => {
		taxonomy.descendantCount(taxonId)
			.then(r => setDescendants(r));
	}, [taxonId]);

	const descendantsTranslated = useMemo(() => {
		if (!descendants)
			return {};

		return Object.keys(descendants).reduce((acc, key) => {
			acc[key] = {
				total: descendants[key],
				taxon: t(lang, `general.taxon_rank.${key}`)
			}

			return acc;
		}, {})
	}, [lang, descendants]);

	return (
		<Hidden hide={descendants === null || descendants !== undefined && Object.keys(descendants).length === 0}>
			<Section lang={lang} title="taxon.overview.statistics">
				<Loading className="mb-4 aspect-video" loading={descendants} width="100%" height="300px">
					<Empty isEmpty={descendantsTranslated === {}} lang={lang}>
						<ul className="flex flex-row flex-wrap gap-2">
							{descendantsTranslated &&
								Object.entries(descendantsTranslated).map(([key, value]) => (
									<li key={key} className="font-extralight text-sm p-3.5 flex flex-col bg-white rounded-xl transition-all border-1 hover:border-primary hover:shadow-md"
									style={{
										minWidth: 120,
										maxWidth: 120,
										width: 120,
										minHeight: 100,
										maxHeight: 100,
										height: 100,
									}}>
										<Link href={`/${lang}/taxon/list?ancestor=${taxonId}&rank=${value.taxon}`}>
											<p className="capitalize">{value.taxon}</p>
											<div className="flex-1 flex align-middle w-full h-full">
												<p className="mt-auto font-extralight text-2xl">
												{value.total}
												</p>
											</div>
										</Link>
									</li>
								))
							}
						</ul>
					</Empty>
				</Loading>
			</Section>
		</Hidden>
	)
}
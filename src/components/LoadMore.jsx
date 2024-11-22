"use client"

import React, {useState} from "react";
import {t} from "@/i18n/i18n";
import {IoIosArrowDown} from "react-icons/io";

export default function LoadMore({lang, items, children, overflow = false, initialSize = 5}) {
	const [loadMore, setLoadMore] = useState(overflow ? initialSize : false);

	if (items && items.length) {
		return (
			<>
				{
					items.slice(0, loadMore).map((taxon, idx) => children(taxon, idx))
				}
				{overflow && loadMore < items.length &&
					<div>
						<p className="flex flex-row justify-end text-sm text-primary cursor-pointer m-4 mb-0 space-x-2"
						   onClick={() => setLoadMore(items.length)}>
							<span>Load more</span> <IoIosArrowDown className="my-auto"/>
						</p>
					</div>
				}
			</>
		);
	} else {
		return (
			<p className="text-center font-extralight flex">
				<span className="flex flex-1 border-1 h-0 m-4 my-auto"/>
				{t(lang, 'components.verticalTaxonomy.empty')}
				<span/>
				<span className="flex flex-1 border-1 h-0 m-4 my-auto"/>
			</p>
		)
	}
}
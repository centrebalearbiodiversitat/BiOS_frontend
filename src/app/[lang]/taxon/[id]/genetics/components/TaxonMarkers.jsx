"use client"

import {useCallback} from "react";
import Loading from "@/components/common/Loading";
import clsx from "clsx";
import {useRouter, useSearchParams} from "next/navigation";
import {getParam} from "@/utils/utils";

function Marker({marker, selected, onClick}) {
	const onClickMarker = useCallback(() => {
		onClick(marker);
	}, [onClick, marker]);

	return (
		<li className={
			clsx(
				"px-4 py-3 flex flex-col items-center col-span-1 transition overflow-hidden cursor-pointer",
			    selected ? "text-black border-b-primary" : "text-slate-400 border-b-border-slate-200",
			    "hover:text-black hover:border-b-primary"
			)}
		    onClick={onClickMarker}
		>
			<p className="font-light leading-4 w-full">
				<span className="block text-xl font-extralight">
					{marker.total.toLocaleString()}
				</span>
				<span className="text-sm">
					{marker.name}
				</span>
			</p>
		</li>
	)
}

export default function TaxonMarkers({markers}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const selectedMarker = getParam(searchParams, "marker")

	const handleSelection = useCallback((marker) => {
		const params = new URLSearchParams(searchParams.toString());

		if (marker.id === null || getParam(searchParams, "marker") == marker.id) {
			params.delete("marker");
		} else {
			params.set("marker", marker.id);
		}
		params.delete("page");


		router.push(`?${params.toString()}`, {scroll: false});
	}, [router, searchParams]);

	return (
		<Loading loading={markers} width="100%" height="150px">
			<ul className="grid grid-cols-3 md:grid-cols-6 2xl:grid-cols-8 w-full h-full [clip-path:inset(0_1px_0px_0)] *:border-b *:border-r min-h-[72px]">
				{markers &&
					markers.map(
						marker => <Marker key={marker.id} marker={marker} onClick={handleSelection} selected={selectedMarker == marker.id}/>
					)
				}
			</ul>
		</Loading>
	)
}
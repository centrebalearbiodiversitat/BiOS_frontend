import {useCallback, useState} from "react";
import Loading from "@/components/common/Loading";
import clsx from "clsx";

function Marker({marker, selected, onClick}) {
	const onClickMarker = useCallback(() => {
		onClick(marker);
	}, [onClick, marker]);

	return (
		<li className={
			clsx(
				"bg-white px-4 pt-4 pb-3 flex flex-col items-center border border-slate-200 rounded-xl col-span-1 transition-all",
				"hover:bg-primary hover:cursor-pointer hover:text-white",
				selected && "!bg-primary !text-white"
			)}
		    onClick={onClickMarker}
		>
			<p className="font-light leading-4 text-center">
				{marker.name}
				<span className="block text-center text-xs">({marker.total})</span>
			</p>
		</li>
	)
}

export default function TaxonMarkers({markers, selectedMarker, onSelectMarker}) {
	const handleSelection = useCallback((marker) => {
		if (selectedMarker == marker.id) {
			onSelectMarker(null);
		} else {
			onSelectMarker(marker.id);
		}
	}, [selectedMarker, onSelectMarker]);

	return (
		<Loading loading={markers} width="100%" height="150px">
			<ul className="grid grid-cols-3 md:grid-cols-5 2xl:grid-cols-8 gap-2 w-full h-full">
				{markers &&
					markers.map(
						marker => <Marker key={marker.id} marker={marker} onClick={handleSelection} selected={selectedMarker == marker.id} />
					)
				}
			</ul>
		</Loading>
	)
}
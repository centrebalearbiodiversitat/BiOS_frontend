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
			<p className="font-light leading-4">
				{marker.name}
				<span className="block text-center text-xs">({marker.total})</span>
			</p>
		</li>
	)
}

export default function TaxonMarkers({markers, onSelectMarker}) {
	const [selected, setSelected] = useState(null);

	const handleSelection = useCallback((marker) => {
		if (selected === marker.id) {
			setSelected(null);
			onSelectMarker(null);
		} else {
			setSelected(marker.id);
			onSelectMarker(marker.id);
		}
	}, [selected, onSelectMarker]);

	return (
		<Loading loading={markers} width="100%" height="150px">
			<ul className="grid grid-cols-3 md:grid-cols-5 2xl:grid-cols-8 gap-2 w-full h-full my-3">
				{markers &&
					markers.map(
						marker => <Marker key={marker.id} marker={marker} onClick={handleSelection} selected={selected === marker.id} />
					)
				}
			</ul>
		</Loading>
	)
}
import React from "react";
import CBBButton from "@/components/CBBButton";
import PopoverColorPicker from "@/components/PopoverColorPicker";


function LoadedBodyCard({taxon, color, onColorChanged, onDelete}) {
	return (
		<>
			<PopoverColorPicker isDisabled={!taxon} color={color} onChange={(c) => onColorChanged(taxon.id, c)}/>
			<div className={`flex flex-col flex-1`}>
				<p className={`text-lg font-semibold w-full ${taxon ? "" : "animate-pulse h-[2] bg-gray-200"}`}>
					{taxon ? taxon.name : ""}
				</p>
				<p className={`text-md font-light w-full ${taxon ? "" : "animate-pulse h-[20px] bg-gray-200"}`}>
					{taxon ? taxon.scientificNameAuthorship : ""}
				</p>
			</div>
			<CBBButton isIconOnly className="border-0 text-lg ms-auto"
			           onPress={() => taxon && onDelete(taxon.id)}>
				x
			</CBBButton>
		</>
	)
}


export default function MapLibreCard({taxon, color, onColorChanged, onDelete}) {
	return (
		<li className={`bg-white p-3 flex flex-row items-center`}>
			<LoadedBodyCard taxon={taxon} color={color}
			                onColorChanged={onColorChanged} onDelete={onDelete}/>
		</li>
	);
}
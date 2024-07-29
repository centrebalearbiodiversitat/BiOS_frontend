import React from "react";
import CBBButton from "@/components/CBBButton";
import PopoverColorPicker from "@/components/PopoverColorPicker";
import {IoMdClose} from "react-icons/io";
import TaxonName from "@/components/TaxonName";
import Loading from "@/components/Loading";


function LoadedBodyCard({taxon, lang, color, onColorChanged, onDelete}) {
	return (
		<>
			<PopoverColorPicker isDisabled={!taxon} color={color} onChange={(c) => onColorChanged(taxon.id, c)}/>
			<div className={`flex flex-col flex-1`}>
				<Loading loading={taxon === null} width="100%" height="16px">
					<p className={`text-lg w-full`}>
						{taxon && <TaxonName taxon={taxon} lang={lang}/>}
					</p>
				</Loading>
				<Loading className="mt-2" loading={taxon === null} width="50%" height="14px">
					<p className={`text-md font-light w-full`}>
						{taxon ? taxon.scientificNameAuthorship : ""}
					</p>
				</Loading>
			</div>
			<CBBButton isIconOnly className="border-0 text-lg ms-auto"
			           onPress={() => taxon && onDelete(taxon.id)}>
				<IoMdClose/>
			</CBBButton>
		</>
	)
}


export default function MapLibreCard({lang, taxon, color, onColorChanged, onDelete}) {
	return (
		<li className={`bg-white p-2 flex flex-row items-center rounded-md`}>
			<LoadedBodyCard taxon={taxon} color={color} lang={lang}
			                onColorChanged={onColorChanged} onDelete={onDelete}/>
		</li>
	);
}
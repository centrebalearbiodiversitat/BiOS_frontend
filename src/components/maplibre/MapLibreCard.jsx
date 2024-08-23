import React from "react";
import CBBButton from "@/components/common/CBBButton";
import PopoverColorPicker from "@/components/common/PopoverColorPicker";
import {IoMdClose} from "react-icons/io";
import TaxonName from "@/components/common/TaxonName";
import Loading from "@/components/common/Loading";


function LoadedBodyCard({taxon, lang, color, colorSelector, onColorChanged, onDelete}) {
	return (
		<>
			{colorSelector && <PopoverColorPicker isDisabled={!taxon} color={color} onChange={(c) => onColorChanged(taxon.id, c)}/>}
			{!colorSelector && <p className="border border-gray-400 w-[36px] h-[36px] text-sm text-center rounded-full m-2 p-2">{taxon.name[0]}</p>}
			<div className={`flex flex-col flex-1`}>
				<Loading loading={taxon} width="100%" height="16px">
					<p className={`text-lg w-full`}>
						{taxon && <TaxonName taxon={taxon} lang={lang}/>}
					</p>
				</Loading>
				<Loading className="mt-2" loading={taxon} width="50%" height="14px">
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


export default function MapLibreCard({lang, taxon, colorSelector = true, color, onColorChanged, onDelete}) {
	return (
		<li className={`bg-white p-2 flex flex-row items-center rounded-md`}>
			<LoadedBodyCard taxon={taxon} color={color} lang={lang} colorSelector={colorSelector}
			                onColorChanged={onColorChanged} onDelete={onDelete}/>
		</li>
	);
}
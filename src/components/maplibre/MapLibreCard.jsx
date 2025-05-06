import React, {useCallback, useMemo, useState} from "react";
import CBBButton from "@/components/common/CBBButton";
import PopoverColorPicker from "@/components/common/PopoverColorPicker";
import {IoMdClose} from "react-icons/io";
import TaxonName from "@/components/common/TaxonName";
import Loading from "@/components/common/Loading";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import clsx from "clsx";
import {MdDragIndicator} from "react-icons/md";


export default function MapLibreCard({lang, taxon, dragControls, colorSelector = true, color, onColorChanged, onHide, onDelete}) {
	const [isHidden, setIsHidden] = useState(false);

	const _onHide = useCallback(() => {
		if (taxon) {
			onHide(taxon.id, !isHidden);
			setIsHidden(!isHidden);
		}
	}, [isHidden, taxon, onHide]);

	const _onDelete = useCallback(() => {
		if (taxon) {
			onDelete(taxon.id);
		}
	}, [taxon, onDelete]);

	return (
		<div className={clsx(`bg-white py-2 pe-2 px-4 flex flex-row items-center rounded-2xl transition-all select-none min-h-[68px]`, isHidden && "bg-opacity-65")}>
			{colorSelector &&
				<PopoverColorPicker isDisabled={!taxon || isHidden} color={color}
				                    className={clsx(isHidden && "opacity-65")}
		                            onChange={(c) => onColorChanged(taxon.id, c)}/>
			}
			{!colorSelector &&
			<p className="border border-gray-400 w-[36px] h-[36px] text-sm text-center rounded-full m-2 p-2">
				{taxon.name[0]}
			</p>
			}
			<div className={clsx("flex flex-col flex-1 transition-all", isHidden && "opacity-50")}>
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
			<div className="space-x-3">
				<CBBButton isIconOnly className={"border-0 text-lg hover:contrast-50 transition-all min-w-[20px] max-w-[20px]"}
				           onPress={_onHide}>
					{isHidden ? <FaEyeSlash/> : <FaEye/>}
				</CBBButton>
				<CBBButton isIconOnly className="border-0 text-lg hover:contrast-50 transition-all min-w-[20px] max-w-[20px]"
				           onPress={_onDelete}>
					<IoMdClose/>
				</CBBButton>
			</div>
			<div className="ms-4 border-s-1 ps-2">
				<CBBButton isIconOnly className="border-0 text-lg hover:contrast-50 transition-all min-w-[20px] max-w-[20px]"
				           onPointerDown={(event) => dragControls.start(event)}>
					<MdDragIndicator/>
				</CBBButton>
			</div>
		</div>
	);
}
import React from "react";
import {Popup} from "react-map-gl/maplibre";
import Figure from "@/components/common/Figure";
import CBBButton from "@/components/common/CBBButton";
import {IoClose} from "react-icons/io5";

export function TwoLineText({title, text, titleClassName = "", textClassName = ""}) {
	return (
		<p className="flex flex-row text-sm font-extralight text-pretty break-all gap-2">
			<span className={`font-bold ${titleClassName}`}>{title}:</span>
			<span className={`border-b text-end flex-grow  ${textClassName}`}>{text ? text : "-"}</span>
		</p>
	)
}

export function MapLibrePopup({longitude, title, latitude, images, children, onClose, ...extra}) {
	return (
		<Popup longitude={longitude} latitude={latitude} closeOnClick={true} onClose={onClose}
		       closeOnMove={false} className="w-[375px] !max-w-[86vw]" closeButton={false} {...extra}>
			<div className={`space-x-4`}>
				<div className="w-full max-h-[190px] h-[190px] aspect-video">
					<Figure className="rounded-t-2xl" images={images}/>
				</div>
				<CBBButton isIconOnly className="z-50 !m-3 absolute right-0 top-0 text-black text-xl border-none rounded-full bg-white aspect-square"
				           onPress={onClose}>
					<IoClose/>
				</CBBButton>
			</div>
			<div className="px-8 py-4">
				{title}
				{children}
			</div>
		</Popup>
	);
}

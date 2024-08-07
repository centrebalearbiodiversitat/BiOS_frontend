import React from "react";
import {Popup} from "react-map-gl/maplibre";
import Figure from "@/components/common/Figure";


export function TwoLineText({title, text, titleClassName = "", textClassName = ""}) {
	return (
		<p className="m-1 ms-0 text-pretty break-all">
			<span className={`font-semibold me-2 ${titleClassName}`}>{title}:</span>
			<span className={`${textClassName}`}>{text ? text : "-"}</span>
		</p>
	)
}


export function MapLibrePopup({longitude, title, latitude, images, children, onClose, ...extra}) {
	return (
		<Popup longitude={longitude} latitude={latitude} closeOnClick={true} onClose={onClose}
		       closeOnMove={false} closeButton={false} maxWidth='475px' {...extra}>
			<div className="m-7">
				{/*<div className="flex flex-row justify-end">*/}
				{/*	<CBBButton isIconOnly className="text-black text-xl border-none"*/}
				{/*			   onPress={onClose}>*/}
				{/*		<IoClose/>*/}
				{/*	</CBBButton>*/}
				{/*</div>*/}
				<div className={`flex flex-row mb-4 space-x-4`}>
					<div className="max-h-[100px] h-[100px] aspect-video">
						<Figure className="rounded-lg" images={images}/>
					</div>
					<p className="flex-shrink-1 text-2xl my-auto text-pretty">
						{title}
					</p>
				</div>
				<div className="">
					{children}
				</div>
			</div>
		</Popup>
	);
}

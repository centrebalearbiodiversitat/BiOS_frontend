import React from "react";
import {Popup} from "react-map-gl/maplibre";
import Figure from "@/components/Figure";
import CBBButton from "@/components/CBBButton";
import {IoClose} from "react-icons/io5";


export function TwoLineText({title, text, titleClassName = "", textClassName = ""}) {
	return (
		<p className="m-2 text-pretty break-all">
			<span className={`font-semibold me-2 ${titleClassName}`}>{title}:</span>
			<span className={`${textClassName}`}>{text ? text : ""}</span>
		</p>
	)
}


export function MapLibrePopup({longitude, maxWidth = '300px', maxHeight = '300px', latitude, images, children, onClose, ...extra}) {
	return (
		<Popup longitude={longitude} latitude={latitude} closeOnClick={true} onClose={onClose}
		       closeOnMove={false} closeButton={false} maxWidth={maxWidth} {...extra}>
			<div className={`w-full`} style={{height: maxHeight, maxHeight, width: maxWidth, maxWidth}}>
				<Figure className="rounded-b-none" images={images}/>
			</div>
			<CBBButton isIconOnly className="absolute top-0 right-0 m-2 text-white bg-white/30 border-none z-30"
			           onPress={onClose}>
				<IoClose/>
			</CBBButton>
			{children}
		</Popup>
	);
}

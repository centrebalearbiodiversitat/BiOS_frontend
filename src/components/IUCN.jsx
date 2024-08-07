import React from "react";
import {t} from "@/i18n/i18n";
import {Tooltip} from "@nextui-org/react";

const IUCN_CATEGORIES = [
	{status: 'ex', color: "black", text: 'components.iucn.EX', textColor: "red"},
	{status: 'ew', color: "black", text: 'components.iucn.EW', textColor: "white"},
	{status: 'cr', color: "#C52512", text: 'components.iucn.CR', textColor: "#FECBCB"},
	{status: 'en', color: "#F28533", text: 'components.iucn.EN', textColor: "#FFCC99"},
	{status: 'vu', color: "#FFC90E", text: 'components.iucn.VU', textColor: "#FFFFCC"},
	{status: 'nt', color: "#AFF092", text: 'components.iucn.NT', textColor: "#f5ffe9"},
	{status: 'lc', color: "#006666", text: 'components.iucn.LC', textColor: "white"},
	{status: 'dd', color: "#808285", text: 'components.iucn.DD', textColor: "white"},
	{status: 'ne', color: "#cdcdcd", text: 'components.iucn.NE', textColor: "black"},
]

function IUCNPill({status, color, text, textColor, lang, enabled}) {
	return (
		<li className="flex font-semibold text-lg min-h-[60px]"
		     style={{
			     paddingTop: enabled ? '' : '.8rem',
			     paddingBottom: enabled ? '' : '.8rem',
			     border: enabled ? '1px solid white' : 0,
			     color: textColor,
		     }}>
			<Tooltip offset={12} showArrow
			         content={<p className="m-3 text-lg">{t(lang, text)}</p>}>
				<p className="uppercase py-2 flex justify-center items-center w-full h-full"
				   style={{
					   backgroundColor: color,
				   }}>
					{status}
				</p>
			</Tooltip>
		</li>
	)
}

export default function IUCN({title, status, lang}) {
	return (
		<div className="w-full h-full ">
			<h3 className="text-lg font-medium mt-3">
				{t(lang, title)}
			</h3>
			<ul className="grid grid-cols-9">
				{
					IUCN_CATEGORIES.map((item) => (
						<IUCNPill key={item.status} lang={lang} enabled={item.status === status} {...item}/>
					))
				}
			</ul>
		</div>
	)
}
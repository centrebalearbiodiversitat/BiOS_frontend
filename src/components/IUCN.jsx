import React, {useMemo} from "react";
import {t} from "@/i18n/i18n";
import {Tooltip} from "@nextui-org/react";
import {TiArrowSortedUp} from "react-icons/ti";

const IUCN_CATEGORIES = {
	'ex': {color: "#000000", text: 'components.iucn.EX', textColor: "red"},
	'ew': {color: "#4a3835", text: 'components.iucn.EW', textColor: "white"},
	'cr': {color: "#C52512", text: 'components.iucn.CR', textColor: "#FECBCB"},
	'en': {color: "#F28533", text: 'components.iucn.EN', textColor: "#ffdab5"},
	'vu': {color: "#FFC90E", text: 'components.iucn.VU', textColor: "#FFFFCC"},
	'nt': {color: "#CCE227", text: 'components.iucn.NT', textColor: "#f5ffe9"},
	'lc': {color: "#006666", text: 'components.iucn.LC', textColor: "white"},
	'dd': {color: "#808285", text: 'components.iucn.DD', textColor: "white"},
	'na': {color: "#C1B5A5", text: 'components.iucn.NA', textColor: "black"},
	'ne': {color: "#e1e1e1", text: 'components.iucn.NE', textColor: "black"},
}


function IUCNPill({lang, status, color, text, textColor, enabled, arrow = false}) {
	const radius = '40px'

	return (
		<div className="rounded-full"
		     style={{
			     // paddingTop: enabled ? '' : '.8rem',
			     // paddingBottom: enabled ? '' : '.8rem',
			     border: enabled ? null : '3px solid #FFFFFF',
			     color: textColor,
			     backgroundColor: color,
			     minWidth: radius,
			     width: radius,
			     maxWidth: radius,
			     minHeight: radius,
			     height: radius,
			     maxHeight: radius,
			     opacity: enabled ? 1 : 0.3,
			     marginLeft: arrow && enabled && '4px',
			     marginRight: arrow && enabled && '4px',
		     }}>
			<p className="uppercase flex justify-center items-center w-full h-full">
				{status}
			</p>
			{arrow && enabled && <TiArrowSortedUp className="text-slate-600 mt-auto mx-auto"/>}
		</div>
	)
}


function IUCNToolTip({lang, children, status}) {
	return (
		<Tooltip offset={12} showArrow
		         content={
			         <div className=" py-4">
				         <h3 className="text-center font-light text-lg m-2 mb-3">IUCN Red List Status</h3>
				         <ul className="flex flex-row justify-center items-center p-2">
					         {
						         Object.keys(IUCN_CATEGORIES).map((key) => {
							         const item = IUCN_CATEGORIES[key];

							         return (
								         <IUCNPill key={key} lang={lang} status={key} arrow={true}
								                   enabled={status === key} {...item}/>
							         )
						         })
					         }
				         </ul>
			         </div>
		         }>
			{children}
		</Tooltip>
	)
}


export default function IUCN({title, status, lang, className}) {
	status = status || 'na';

	const iucn_cat = IUCN_CATEGORIES[status];

	return (
		<IUCNToolTip lang={lang} status={status}>
			<div className={`h-full w-full gap-5 bg-white rounded-full ps-4 pe-8 py-3 flex flex-row items-center ${className}`}>
				<IUCNPill lang={lang} enabled={true} status={status} {...iucn_cat}/>
				<div className="flex flex-col text-pretty">
					<h3 className="text-lg font-medium w-full">
						{t(lang, title)}
					</h3>
					<p className="text-sm text-gray-500">
						{t(lang, iucn_cat.text)}
					</p>
				</div>
			</div>
		</IUCNToolTip>
	)
}
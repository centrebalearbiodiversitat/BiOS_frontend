"use client"

import React from "react";
import {t} from "@/i18n/i18n";
import {Tooltip} from "@heroui/tooltip";
import {TiArrowSortedUp} from "react-icons/ti";
import clsx from "clsx";
import {BiDotsHorizontalRounded} from "react-icons/bi";
import {useLang} from "@/contexts/LangContext";
import Link from "next/link";

const IUCN_CATEGORIES = {
	'ex': {color: "#000000", text: 'components.iucn.EX', textColor: "#fd3636"},
	'ew': {color: "#4a3835", text: 'components.iucn.EW', textColor: "white"},
	'cr': {color: "#C52512", text: 'components.iucn.CR', textColor: "#FECBCB"},
	'en': {color: "#F28533", text: 'components.iucn.EN', textColor: "#ffe4c5"},
	'vu': {color: "#FFC90E", text: 'components.iucn.VU', textColor: "#FFFFCC"},
	'nt': {color: "#CCE227", text: 'components.iucn.NT', textColor: "#fbfff5"},
	'lc': {color: "#006666", text: 'components.iucn.LC', textColor: "white"},
	'dd': {color: "#808285", text: 'components.iucn.DD', textColor: "white"},
	'na': {color: "#C1B5A5", text: 'components.iucn.NA', textColor: "black"},
	'ne': {color: "#e1e1e1", text: 'components.iucn.NE', textColor: "black"},
}


function IUCNPill({lang, status, uncolored = false, color, text, textColor, enabled, arrow = false}) {
	const radius = '40px'

	return (
		<div className={clsx("rounded-full", enabled && "rounded-tr-none")}
		     style={{
			     // paddingTop: enabled ? '' : '.8rem',
			     // paddingBottom: enabled ? '' : '.8rem',
			     // border: enabled ? null : '3px solid #FFFFFF',
			     color: textColor,
			     backgroundColor: !uncolored ? color : "",
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
			<p className="uppercase font-medium flex justify-center items-center w-full h-full">
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
			         <div className="py-2">
				         <h3 className="text-center font-light text-lg ">IUCN Red List Status</h3>
				         <ul className="flex flex-row justify-center items-center p-2 gap-0.5">
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


export default function IUCN({scope, status, source, className}) {
	const [lang] = useLang();

	status = status || 'na';
	// status = 'ex'
	// status = 'ew'
	// status = 'cr'
	// status = 'en'
	// status = 'vu'
	// status = 'nt'
	// status = 'lc'
	// status = 'dd'
	// status = 'na'
	// status = 'ne'

	const iucn_cat = IUCN_CATEGORIES[status];

	return (
		<IUCNToolTip lang={lang} status={status}>
			<Link target="_blank" rel="nofollow" href={`https://www.iucnredlist.org/species/${source?.externalId}`}>
				<div className={clsx("w-full h-full", className)}>
					<div className={"flex flex-col w-full h-full gap-5 p-6"}>
						<div className="flex flex-row">
							<div>
								<div className="w-fit aspect-square"
								     style={{
									     // backgroundColor: `${iucn_cat.color}`
								     }}>
									<IUCNPill uncolored={false} lang={lang} enabled={true} status={status} {...iucn_cat}/>
								</div>
								<p className="text-center font-medium text-gray-500 text-xs pt-1 flex justify-center gap-1 items-center">
									IUCN
								</p>
							</div>
							<div className="ms-auto text-lg">
								<BiDotsHorizontalRounded/>
							</div>
						</div>
						<div className="flex-grow flex">
							<div className="mt-auto w-full flex flex-col text-pretty self-center justify-self-center">
								<p className="text-end text-md font-medium">
									{t(lang, iucn_cat.text)}
								</p>
								<h3 className="text-end text-gray-500 w-full text-sm">
									{t(lang, `taxon.overview.iucn_${scope}`)}
								</h3>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</IUCNToolTip>
	)
}
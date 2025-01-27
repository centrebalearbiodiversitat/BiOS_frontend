import React from "react";
import {t} from "@/i18n/i18n";
import clsx from "clsx";
import Loading from "@/components/common/Loading";
import {useLang} from "@/contexts/LangContext";
import NoData from "@/components/common/NoData";

const SYSTEM_TYPES = [
	{
		type: "freshwater",
		color: "#70c5d5"
	},
	{
		type: "marine",
		color: "#137ad5"
	},
	{
		type: "terrestrial",
		color: "#cca37e"
	}
]

function SystemChip({lang, system, enabled}) {
	return (
		<span className={clsx(
			"py-[1px] w-[120px] font-extralight text-sm text-center rounded-full border border-slate-200",
			enabled ? "text-white" : "text-slate-300"
		)}
		      style={{backgroundColor: enabled  ? system.color : "transparent"}}>
			{t(lang, `component.system.${system.type}`)}
		</span>
	)
}

function LegendItem({text, className}) {
	return (
		<div className="flex flex-row gap-2 text-xs">
			<div className={clsx(
				"w-[40px] h-[13px] my-auto rounded-full border",
				className
			)}/>
			<p>{text}</p>
		</div>
	)
}

export default function TaxonSystem({systems, className}) {
	const [lang, _] = useLang();

	return (
		<Loading loading={!systems} width="100%" height="100%">
			<div className={clsx("flex flex-row px-5 gap-1", className)}>
				{systems &&
					SYSTEM_TYPES.map((system) => (
						<SystemChip lang={lang} key={system.type}
						            system={system} enabled={systems[system.type]}/>
					))
				}
			</div>
		</Loading>
	)
}
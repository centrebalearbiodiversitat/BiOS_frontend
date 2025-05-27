"use client"

import React from "react";
import {t} from "@/i18n/i18n";
import clsx from "clsx";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import {useLang} from "@/contexts/LangContext";

const DIRECTIVES = [
	{
		name: "cites"
	},
	{
		name: "lespre"
	},
	{
		name: "ceea"
	},
	{
		name: "directivaAves"
	},
	{
		name: "directivaHabitats"
	},
]

function DirectiveCard({lang, directive, enabled}) {
	return (
		<div className={clsx(
				"border flex flex-1 aspect-square !rounded-full text-center max-w-[85px] min-w-[85px]",
				enabled ? "border-amber-400 text-black" : "border-slate-200 text-slate-300"
			)}>
			<p className="m-auto text-sm">
				{t(lang, `components.directives.${directive.name}`)}
			</p>
		</div>
	)
}

export default function TaxonDirectives({directives, className}) {
	const [lang] = useLang();

	return (
		<Loading loading={directives} width="100%" height="100%">
			<NoData lang={lang} isDataAvailable={directives?.cites !== null}>
				<div className="flex flex-col gap-8 justify-center flex-grow py-3">
					<div className={clsx("flex flex-wrap my-auto justify-center px-5 gap-x-3 gap-y-2", className)}>
						{directives &&
							DIRECTIVES.map((directive) => (
								<DirectiveCard lang={lang} key={directive.name}
								               directive={directive} enabled={directives[directive.name]}/>
							))
						}
					</div>
					<div className="flex flex-row justify-center gap-2 text-sm">
						<div className="flex flex-row gap-2">
							<div className="w-[20px] h-[20px] rounded-full border border-amber-300"/>
							<p>{t(lang, "components.directives.applies")}</p>
						</div>
						<div className="flex flex-row gap-2">
							<div className="w-[20px] h-[20px] rounded-full border border-slate-200"/>
							<p>{t(lang, "components.directives.not_applies")}</p>
						</div>
					</div>
				</div>
			</NoData>
		</Loading>
	)
}
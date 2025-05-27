import React from "react";
import {t} from "@/i18n/i18n";
import {useLang} from "@/contexts/LangContext";

export default function Section({lang, title, subtitle, children, className}) {

	return (
		<section className={className}>
			<div className="mb-3">
				{title &&
					<h3 className="text-xl md:text-2xl font-extralight text-pretty">
						{t(lang, title)}
					</h3>
				}
				{subtitle &&
					<h4 className="text-sm md:text-base font-light text-slate-600 text-pretty">
						{t(lang, subtitle)}
					</h4>
				}
			</div>
			{children}
		</section>
	)
}
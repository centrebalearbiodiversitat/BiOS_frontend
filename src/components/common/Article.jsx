import {t} from "@/i18n/i18n";
import React from "react";

export function Title({lang, textKey}) {
	return <h3 className="font-medium text-2xl">{t(lang, textKey)}</h3>
}

export function Subtitle({lang, textKey}) {
	return <h4 className="font-medium text-xl">{t(lang, textKey)}</h4>
}

export function Body({lang, textKey}) {
	return <p>{t(lang, textKey)}</p>
}

export function Section({children}) {
	return (
		<section className="flex flex-col gap-2">
			{children}
		</section>
	)
}
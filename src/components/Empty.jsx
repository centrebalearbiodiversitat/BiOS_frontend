import {t} from "@/i18n/i18n";
import React from "react";
import {useLang} from "@/contexts/LangContext";

export default function Empty({isEmpty, children, maxWidth = '245px'}) {
	const [lang] = useLang();

	if (isEmpty) {
		return (
			<p className="text-center font-extralight flex mx-auto my-8" style={{maxWidth}}>
				<span className="flex flex-1 border-1 h-0 m-4 my-auto"/>
				{t(lang, 'components.empty')}
				<span/>
				<span className="flex flex-1 border-1 h-0 m-4 my-auto"/>
			</p>
		)
	} else {
		return children;
	}
}
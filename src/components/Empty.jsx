import {t} from "@/i18n/i18n";
import React from "react";
import clsx from "clsx";

export default function Empty({lang, isEmpty, children, className, maxWidth = '245px'}) {
	if (isEmpty) {
		return (
			<p className={clsx("text-center font-extralight flex mx-auto my-8", className)} style={{maxWidth}}>
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
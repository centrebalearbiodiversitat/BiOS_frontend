import React from "react";
import {t} from "@/i18n/i18n";

export default function Section({title, lang, children}) {
	return (
		<section>
			<h3 className="text-2xl font-light mb-4">
				{t(lang, title)}
			</h3>
			{children}
		</section>
	)
}
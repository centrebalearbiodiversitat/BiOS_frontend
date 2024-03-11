import React from "react";
import {t} from "@/i18n/i18n";

export default function Map({className, lang}) {
	return (
		<div className={`w-full bg-blue-400 ${className} flex justify-center align-middle`}>
			<p className="m-auto text-3xl">{t(lang, 'home.cards.map.title')}</p>

		</div>
	);
}
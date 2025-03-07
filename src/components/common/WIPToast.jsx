"use client"
import React, {useState} from "react";
import {t} from "@/i18n/i18n";
import {useLang} from "@/contexts/LangContext";
import {Image} from "@nextui-org/react";
import clsx from "clsx";

export default function WIPToast({}) {
	const [hidden, setHidden] = useState(false);
	const [lang] = useLang();

	if (hidden)
		return ;

	return (
		<div onClick={() => setHidden(true)} className={clsx(
			"z-50 fixed flex flex-row gap-4 p-2 cursor-pointer w-[376px] max-w-[90svw] min-h-[65px] m-2 bottom-0 right-0 box-border outline-none border rounded-medium shadow-small bg-warning-50 border-warning-100",
			hidden && "hidden"
		)}>
			<Image alt="Upupa under building icon" radius={null} removeWrapper className="w-[65px] h-auto my-auto"
			       src="/images/CBBDB-under-construction.png"/>
			<div className="flex-grow text-sm my-auto border-s border-warning-600 ps-3">
				<p className="text-warning-600 font-medium">{t(lang, "components.wipToast.title")}</p>
				<p className="text-warning-500 leading-4 text-pretty">{t(lang, "components.wipToast.subtitle")}</p>
			</div>
		</div>
	)
}
"use client";

import clsx from "clsx";
import {useLang} from "@/contexts/LangContext";
import {t} from "@/i18n/i18n";
import {useCallback} from "react";

export default function SwitchButton({label, isPushed, onPush, className}) {
	const [lang, _] = useLang();

	const isPushedCallback = useCallback(() => {
		onPush(!isPushed);
	}, [onPush, isPushed]);

	return (
		<span onClick={isPushedCallback}
			className={clsx(
				"text-center cursor-pointer px-4 text-white font-light rounded-full transition-all",
				isPushed ? "!bg-accent" : "bg-slate-300",
				"hover:bg-accent/30",
				className
			)}
			>
			{t(lang, label)}
		</span>
	);
}

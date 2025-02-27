"use client";

import clsx from "clsx";
import {useLang} from "@/contexts/LangContext";
import {t} from "@/i18n/i18n";
import {useCallback} from "react";

export default function PushButton({label, isPushed, onPush, icon, className}) {
	const [lang, _] = useLang();

	const isPushedCallback = useCallback(() => {
		onPush(!isPushed);
	}, [onPush, isPushed]);

	return (
		<button onClick={isPushedCallback}
			className={clsx(
				"cursor-pointer px-5 py-2 text-white font-light rounded-full transition duration-600 ease-in-out",
				isPushed ? "bg-primary" : "bg-slate-400/70",
				"hover:bg-primary/80",
				className
			)}
			>
			<span>
				{t(lang, label)}
			</span>
			{icon}
		</button>
	);
}

import React, {useMemo} from "react";
import {t} from "@/i18n/i18n";
import clsx from "clsx";

export default function StatusPill({lang, taxon, className}) {
	const statusLabel = useMemo(() => {
		if (taxon.accepted)
			return {
				label: t(lang, 'general.taxonStatus.accepted'),
				className: "bg-accent/10 border-accent text-accent",
			}
		else
			return {
				label: t(lang, 'general.taxonStatus.synonym'),
				className: "bg-secondary/30 border-secondary text-secondary",
			}
	}, [taxon, lang]);

	return (
		<span className={clsx(statusLabel.className, className, 'px-1 py-[0.025rem] text-center text-xs font-semibold rounded-3xl border')}>
			{statusLabel.label}
		</span>
	);
}
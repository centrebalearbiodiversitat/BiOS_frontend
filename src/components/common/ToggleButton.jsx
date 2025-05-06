"use client";

import {useLang} from "@/contexts/LangContext";
import {t} from "@/i18n/i18n";
import {useCallback} from "react";
import {Switch} from "@heroui/switch";

export default function ToggleButton({label, isEnabled, onToggle}) {
	const [lang] = useLang();

	const onToggleCallback = useCallback((value) => {
		onToggle(value);
	}, [onToggle]);

	return (
		<div className="flex items-center gap-2">
			<label className="font-light text-sm">
				{t(lang, label)}
			</label>
			<Switch isSelected={isEnabled} size="sm"
			        onValueChange={onToggleCallback}
			        color="primary">
			</Switch>
		</div>
	);
}

"use client";

import {useLang} from "@/contexts/LangContext";
import {t} from "@/i18n/i18n";
import {useCallback} from "react";
import {Switch} from "@nextui-org/react";

export default function ToggleButton({label, isEnabled, onToggle}) {
	const [lang, _] = useLang();

	const onToggleCallback = useCallback(() => {
		onToggle(!isEnabled);
	}, [onToggle, isEnabled]);

	return (
		<div className="flex items-center gap-2">
			<label className="font-light">
				{t(lang, label)}
			</label>
			<Switch isSelected={isEnabled}
			        onValueChange={onToggleCallback}
			        color="primary"/>
		</div>
	);
}

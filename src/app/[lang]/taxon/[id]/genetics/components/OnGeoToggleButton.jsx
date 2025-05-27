"use client"

import React, {useCallback, useMemo} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getParam} from "@/utils/utils";
import ToggleButton from "@/components/common/ToggleButton";

export default function OnGeoToggleButton({}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const inGeographyScope = getParam(searchParams, "inGeographyScope", undefined);

	const onGeographyToggle = useCallback((value) => {
		const params = new URLSearchParams();

		if (value) {
			params.set("inGeographyScope", true);
		} else {
			params.delete("inGeographyScope");
		}
		router.push(`?${params.toString()}`);
	}, [router]);

	return (
		<ToggleButton label="taxon.genetics.filter.inGeographyScope" onToggle={onGeographyToggle}
		              className="m-auto flex flex-row items-center gap-4" isEnabled={!!inGeographyScope}/>
	)
}

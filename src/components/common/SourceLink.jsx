import React, {useMemo} from "react";
import Link from "next/link";
import {generateSourceUrl} from "@/utils/utils";

export default function SourceLink({source, children, ...extra}) {
	const url = useMemo(() => {
		return generateSourceUrl(source);
	}, [source]);

	if (url) {
		return <Link href={url} target="_blank" {...extra}>{children}</Link>
	} else {
		return children;
	}
}
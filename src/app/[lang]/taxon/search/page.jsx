"use client"

import React, {use, useEffect} from "react";
import taxonomy from "@/API/taxonomy";
import {useRouter, useSearchParams} from "next/navigation";
import {Spinner} from "@heroui/spinner";


export default function Search({params}) {
	const {lang} = use(params);

	const router = useRouter();
	const searchParams = useSearchParams()

	useEffect(() => {
		const query = searchParams.get('q');
		if (query)
			taxonomy.search(query, true)
				.then(r => {
					if (r && r.length === 1) {
						router.replace(`/${lang}/taxon/${r[0].id}`);
					} else {
						router.replace(`/${lang}/404`);
					}
				})
		else
			router.replace(`/${lang}/404`);
	}, [router, searchParams, lang]);

    return (
		<div className="flex w-full min-h-[inherit]">
			<Spinner className="m-auto" size={"lg"}/>
		</div>
    );
}

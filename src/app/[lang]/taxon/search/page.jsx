"use client"

import React, {useEffect, useState} from "react";
import taxonomy from "@/API/taxonomy";
import {useRouter, useSearchParams} from "next/navigation";
import {Spinner} from "@nextui-org/react";


export default function About({params: {lang}}) {
	const router = useRouter();
	const searchParams = useSearchParams()
	const [results, setResults] = useState({});

	useEffect(() => {
		const query = searchParams.get('q');
		taxonomy.search(query, true)
			.then(r => {
				if (r && r.length === 1) {
					router.replace(`/${lang}/taxon/${r[0].id}`);
				} else {
					router.replace(`/${lang}/404`);
				}
			})
	}, [router, searchParams, lang]);

    return (
		<div className="flex w-full h-full">
			<Spinner className="m-auto" size={"lg"}/>
		</div>
    );
}

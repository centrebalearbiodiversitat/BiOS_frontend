"use client"

import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {AVAILABLE_LOCALES, DEFAULT_LOCALE} from "@/i18n/i18n";

export function CanonicalHead({lang}) {
	const pathname = usePathname();
	const [domain, setDomain] = useState(null);

	useEffect(() => {
		setDomain(window.location.origin);
	}, []);

	if (domain === null)
		return <></>
	const segments = pathname.split('/').filter(Boolean).slice(1);
	const newPath = segments.join('/');
	const alternateLocales = AVAILABLE_LOCALES.filter(locale => locale !== lang);

	return (
		<>
			<link rel="canonical" href={`${domain}/${lang}/${newPath}`}/>
			{
				alternateLocales.map(locale => (
					<link key={locale} rel="alternate" hrefLang={locale} href={`${domain}/${locale}/${newPath}`}/>
				))
			}
			<link rel="alternate" hrefLang="x-default" href={`${domain}/${DEFAULT_LOCALE}/${newPath}`}/>
		</>
	)
}
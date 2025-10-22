"use client"

import React, {useMemo} from "react";
import {Link} from "@heroui/link";
import {t} from "@/i18n/i18n";


export default function SiteMap({lang}) {
	const links = useMemo(() => [
		{path: `/${lang}`, text: t(lang, "footer.sitemap.home")},
		{path: `/${lang}/map`, text: t(lang, "footer.sitemap.map")},
		{path: "/method/index.html", text: t(lang, "footer.sitemap.methodology")},
		{path: `/method/team/team.html`, text: t(lang, "footer.sitemap.team")},
	], [lang])

	return (
		<nav className="space-y-2">
			<p className="uppercase font-medium text-slate-500">{t(lang, "footer.sitemap.title")}</p>
			<ul className="flex flex-col space-y-1">
			{
				links.map((link) => (
					<li key={link.path}>
						<Link href={link.path} className="text-sm font-extralight hover:underline text-slate-500">
							{link.text}
						</Link>
					</li>
				))
			}
			</ul>
		</nav>
	)
}
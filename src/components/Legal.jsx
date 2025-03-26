import React, {useMemo} from "react";
import {Link} from "@heroui/react";
import {t} from "@/i18n/i18n";


export default function Legal({lang}) {
	const links = useMemo(() => [
		{path: `/${lang}/legal/disclaimer`, text: t(lang, "footer.legal.disclaimer")},
		{path: `/${lang}/legal/privacy`, text: t(lang, "footer.legal.privacy")},
		{path: `/${lang}/legal/cookies`, text: t(lang, "footer.legal.cookies")},
	], [lang])

	return (
		<nav className="space-y-2">
			<p className="uppercase font-medium text-slate-500">{t(lang, "footer.legal.title")}</p>
			<ul className="flex flex-col space-y-1">
			{
				links.map((link) => (
					<li key={link.path}>
						<Link href={link.path} className="!text-sm font-extralight hover:underline text-slate-500">
							{link.text}
						</Link>
					</li>
				))
			}
			</ul>
		</nav>
	)
}
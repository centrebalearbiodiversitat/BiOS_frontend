import React, {useMemo} from "react";
import {Link} from "@nextui-org/react";
import {t} from "@/i18n/i18n";


export default function Legal({lang}) {
	const links = useMemo(() => [
		{path: `/${lang}/disclaimer`, text: t(lang, "footer.legal.disclaimer")},
		{path: `/${lang}/privacy`, text: t(lang, "footer.legal.privacy")},
		{path: `/${lang}/cookies`, text: t(lang, "footer.legal.cookies")},
	], [lang])

	return (
		<nav className="space-y-1">
			<p className="uppercase font-medium text-slate-500">{t(lang, "footer.legal.title")}</p>
			<ul className="flex flex-col">
			{
				links.map((link) => (
					<li key={link.path}>
						<Link href={link.path} className="font-extralight hover:underline text-slate-500">
							{link.text}
						</Link>
					</li>
				))
			}
			</ul>
		</nav>
	)
}
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
		<div className="space-y-2">
			<p className="font-bold text-slate-400">{t(lang, "footer.legal.title")}</p>
			<ul className="flex flex-col">
			{
				links.map((link) => (
					<li key={link.path}>
						<Link href={link.path} className="hover:underline text-slate-400">
							{link.text}
						</Link>
					</li>
				))
			}
			</ul>
		</div>
	)
}
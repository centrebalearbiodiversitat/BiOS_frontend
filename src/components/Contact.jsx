import React, {useMemo} from "react";
import {Link} from "@heroui/react";
import {t} from "@/i18n/i18n";


export default function Contact({lang}) {
	const links = useMemo(() => [
		{path: `https://www.google.com/maps/search/Centre+Balear+de+Biodiversitat/`, text: "Complex Balear de R+D+I", target: "_blank"},
		{path: `mailto:centre.biodiversitat@uib.es`, text: "centre.biodiversitat@uib.es"},
		{path: `tel:+34971173000`, text: "(+34) 971 17 30 00"},
	], [])

	return (
		<nav className="space-y-1">
			<p className="uppercase font-medium text-slate-500">{t(lang, "footer.contact.title")}</p>
			<ul className="flex flex-col">
			{
				links.map((link) => (
					<li key={link.path}>
						<Link href={link.path} className="!text-sm font-extralight hover:underline text-slate-500" target={link.target || "_self"}>
							{link.text}
						</Link>
					</li>
				))
			}
			</ul>
		</nav>
	)
}
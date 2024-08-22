import React, {useMemo} from "react";
import {Link} from "@nextui-org/react";
import {t} from "@/i18n/i18n";


export default function Contact({lang}) {
	const links = useMemo(() => [
		{path: `https://maps.app.goo.gl/ia6BJbnyGt2kwk3HAr`, text: "Complex Balear de R+D+I"},
		{path: `mailto:centre.biodiversitat@uib.es`, text: "centre.biodiversitat@uib.es"},
		{path: `tel:+34971173000`, text: "(+34) 971 17 30 00"},
	], [lang])

	return (
		<div className="space-y-2">
			<p className="font-bold text-slate-400">{t(lang, "footer.contact.title")}</p>
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
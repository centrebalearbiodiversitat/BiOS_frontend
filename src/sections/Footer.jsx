import React from "react";
import {Image} from "@nextui-org/react";
import SiteMap from "@/components/SiteMap";
import Legal from "@/components/Legal";
import Contact from "@/components/Contact";

export default function Footer({lang}) {
	return (
		<footer className="w-full px-10 pt-10 pb-3 md:px-16">
			<div className="border-t-1 border-slate-200 py-6 flex flex-col-reverse sm:flex-row">
				<Image className="justify-self-start mt-4 md:mt-0" src="/images/cbb-logo.png" alt={"CBB logo"} width="400px" radius={null}/>
				<div className="flex flex-row flex-wrap ms-auto !text-sm space-x-8">
					<SiteMap lang={lang}/>
					<Legal lang={lang}/>
					<Contact lang={lang}/>
				</div>
			</div>
		</footer>
	);
}
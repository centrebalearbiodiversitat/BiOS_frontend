import React from "react";
import {Image} from "@nextui-org/react";
import SiteMap from "@/components/SiteMap";
import Legal from "@/components/Legal";
import Contact from "@/components/Contact";

export default function Footer({lang}) {
	return (
		<footer className="w-full px-10 pt-10 pb-3 md:px-16">
			<div className="border-t-1 border-slate-200 py-6 flex flex-col-reverse md:flex-row">
				<Image className="justify-self-start mt-4 md:mt-0" src="/images/cbb-logo.png" alt={"CBB logo"} width="400px" radius={null}/>
				<div className="flex flex-col !text-sm space-y-3 md:space-y-0 align-top md:ms-auto md:flex-row md:space-x-8">
					<SiteMap lang={lang}/>
					<Legal lang={lang}/>
					<Contact lang={lang}/>
				</div>
			</div>
		</footer>
	);
}
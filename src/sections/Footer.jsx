import React from "react";
import {Image} from "@nextui-org/react";
import SiteMap from "@/components/SiteMap";
import Legal from "@/components/Legal";
import Contact from "@/components/Contact";

export default function Footer({lang}) {
	return (
		<footer className="px-10 md:px-16 py-10 w-full">
			<div className="border-t-1 border-slate-200 py-6 flex flex-col-reverse md:flex-row">
				<Image className="justify-self-start" src="/images/cbb-logo.png" alt={"CBB logo"} width="400px" radius={null}/>
				<div className="flex flex-col align-top md:ms-auto md:flex-row md:space-x-8">
					<div className="grid grid-cols-2 md:space-x-8">
						<SiteMap lang={lang}/>
						<Legal lang={lang}/>
					</div>
					<Contact lang={lang}/>
				</div>
			</div>
		</footer>
	);
}
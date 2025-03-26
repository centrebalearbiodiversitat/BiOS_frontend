import React from "react";
import {Accordion, AccordionItem, Image} from "@heroui/react";
import SiteMap from "@/components/SiteMap";
import Legal from "@/components/Legal";
import Contact from "@/components/Contact";

export default function Footer({lang}) {
	return (
		<footer className="w-full px-5 pt-10 pb-3 md:px-16">
			<div className="border-t-1 border-slate-200 py-6 flex flex-row flex-wrap-reverse justify-center gap-x-52">
				<Image className="hidden sm:block mt-4 sm:mt-0" src="/images/logos/cbb-logo.png" alt={"CBB logo"} width="400px" radius={null}/>
				{/*<div className="w-[400px]">*/}
				{/*	<CBBLogo className="w-full h-[px] flex justify-center items-center" imageProps={{className: "w-full h-auto"}}/>*/}
				{/*</div>*/}
				<div className="grid grid-cols-2 sm:flex sm:flex-row !text-sm gap-x-8 justify-center gap-y-6">
					<SiteMap lang={lang}/>
					<Legal lang={lang}/>
					<Contact lang={lang}/>
					<div className="sm:hidden space-y-2 flex flex-col justify-center items-center">
						<Image src="/images/logos/cbb-logo-split.png" alt={"CBB logo"} className="" width="205px" height="51px" radius={null}/>
					</div>
				</div>
			</div>
		</footer>
	);
}
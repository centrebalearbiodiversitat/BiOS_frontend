import React from "react";
import {Image} from "@nextui-org/react";
import SiteMap from "@/components/SiteMap";
import Legal from "@/components/Legal";
import Contact from "@/components/Contact";

export default function Footer({lang}) {
	return (
		<footer className="w-full px-5 pt-10 pb-3 md:px-16">
			<div className="border-t-1 border-slate-200 py-6 flex flex-row flex-wrap-reverse justify-center gap-x-52">
				<Image className="mt-4 md:mt-0" src="/images/cbb-logo.png" alt={"CBB logo"} width="400px" radius={null}/>
				{/*<div className="w-[400px]">*/}
				{/*	<CBBLogo className="w-full h-[px] flex justify-center items-center" imageProps={{className: "w-full h-auto"}}/>*/}
				{/*</div>*/}
				<div className="flex flex-wrap !text-sm gap-x-6 justify-center gap-y-4">
					<SiteMap lang={lang}/>
					<Legal lang={lang}/>
					<Contact lang={lang}/>
				</div>
			</div>
		</footer>
	);
}
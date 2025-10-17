import React from "react";
import SiteMap from "@/components/SiteMap";
import Legal from "@/components/Legal";
import Contact from "@/components/Contact";
import Image from "next/image";

export default function Footer({lang}) {
	return (
		<footer className="w-full p-10 md:pt-16 md:pb-16 md:px-16">
			<div className="flex flex-row flex-wrap-reverse justify-center items-stretch gap-x-40 gap-y-12">
				<div className="flex flex-row w-[360px] gap-10 md:gap-10 px-6 md:px-0 ">
					<div className="w-full h-full basis-[40%]">
						<Image className="w-full h-full object-contain" src="/images/logos/balearica-logo-full.png"
						       alt={"Balearica full logo"} width={181} height={91}/>
					</div>
					<div className="w-full h-full basis-[60%]">
						<Image className=" w-full h-full object-contain" src="/images/logos/cbb-logo.png"
						       alt={"CBB logo"} width={339} height={120}/>
					</div>
				</div>
				<div className="grid grid-cols-2 sm:flex sm:flex-row !text-sm gap-x-8 justify-center gap-y-6">
					<SiteMap lang={lang}/>
					<Legal lang={lang}/>
					<Contact lang={lang}/>
				</div>
			</div>
		</footer>
	);
}
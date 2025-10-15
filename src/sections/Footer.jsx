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
				{/*<div className="w-[400px]">*/}
				{/*	<CBBLogo className="w-full h-[px] flex justify-center items-center" imageProps={{className: "w-full h-auto"}}/>*/}
				{/*</div>*/}
				<div className="grid grid-cols-2 sm:flex sm:flex-row !text-sm gap-x-8 justify-center gap-y-6">
					<SiteMap lang={lang}/>
					<Legal lang={lang}/>
					<Contact lang={lang}/>
					{/*<div className="sm:hidden gap-4 flex flex-col items-center w-full">*/}
					{/*	<Image className="object-contain" src="/images/logos/balearica-logo-full_small.png" alt={"Balearica full logo"} width={101} height={51}/>*/}
					{/*	<hr className=" border-slate-200 w-full"/>*/}
					{/*	<div className="flex flex-col w-full">*/}
					{/*		<Image src="/images/logos/uib-logo-split.png" className="w-full object-contain" alt={"UIB logo"} width={160} height={51} style={{scale: 0.8}}/>*/}
					{/*		<Image src="/images/logos/cbb-logo-split.png" className="w-full object-contain" alt={"CBB logo"} width={196} height={43}/>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>
			</div>
		</footer>
	);
}
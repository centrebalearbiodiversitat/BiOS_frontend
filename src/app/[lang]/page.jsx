import {t} from "@/i18n/i18n";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import {Image} from "@nextui-org/react";
import React from "react";
import Statistics from "@/components/Statistics";


export default function Home({params: {lang}}) {

	return (
		<>
			<div className="absolute top-0 w-full min-h-full flex flex-col justify-center items-center lg:grid lg:grid-cols-12"
			     style={{
				     backgroundRepeat: 'no-repeat',
				     backgroundSize: 'cover',
				     backgroundPosition: 'center',
				     backgroundImage: "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('/images/pages/home/home.jpg')"
			     }}>
				<div className="bottom-0 right-0 absolute text-slate-200 text-sm font-extralight backdrop-blur-xl px-3 py-1">
				       (c) Lioneska, some rights reserved (CC BY-NC)
				</div>
				<div className="flex flex-col m-8 mt-16 space-y-2 max-w-[675px] lg:max-w-none lg:col-start-2 lg:col-span-6">
					<header className="flex flex-col justify-center items-center space-y-4">
						<h2 className="w-full font-normal text-xl text-white-drop-shadow">
							{t(lang, "home.subtitle")}
						</h2>
						<h1 className="w-full text-pretty font-normal text-4xl md:font-light md:text-6xl text-white-drop-shadow">
							{t(lang, "home.title")}
						</h1>
					</header>
					<div className="space-y-2 py-12">
						<FullCBBSearchBar lang={lang} showFilters={false} rounded={false}/>
						<div className="">
							<Statistics lang={lang} className="grid grid-cols-3"/>
						</div>
						<div className="grid grid-cols-4 my-auto gap-2 justify-center items-center pt-4">
							<Image src="/images/partners/eu_next_gen.png" alt={"Partner NextGenerationEU"}
                                   removeWrapper={true}
                                   className="m-auto" radius={null}/>
							<Image src="/images/partners/gob_es.png" alt={"Partners logos"} className="m-auto"
                                   removeWrapper={true}
							       radius={null}/>
							<Image src="/images/partners/plan-recuperacion.png" alt={"Partners logos"}
							       className="m-auto"
                                   removeWrapper={true}
							       radius={null}/>
							<Image src="/images/partners/goib.png" alt={"Partners logos"} className="m-auto"
                                   removeWrapper={true}
							       radius={null}/>
						</div>
					</div>
				</div>
			</div>
			<div className="h-full min-h-full"/>
		</>
	)
}
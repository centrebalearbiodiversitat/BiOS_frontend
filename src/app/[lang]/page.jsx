import {t} from "@/i18n/i18n";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import {Button} from "@heroui/button";
import React, {use} from "react";
import Statistics from "@/components/Statistics";
import Link from "next/link";
import Image from "next/image";
import {MdTune} from "react-icons/md";

export async function generateMetadata(props) {
	const {lang} = await props.params;
	const title = t(lang, 'web.title');

	return {
		title,
		openGraph: {
			title,
			images: [
				{url: "https://balearica.uib.cat/images/pages/home/home.jpg"},
			]
		}
	}
}

export default function Home({params}) {
	const {lang} = use(params);

	return (
		<>
			<div className="absolute top-0 w-full min-h-full flex flex-col justify-center items-center lg:grid lg:grid-cols-12"
			     style={{
				     backgroundRepeat: 'no-repeat',
				     backgroundSize: 'cover',
				     backgroundPosition: 'center',
				     backgroundImage: "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('/images/pages/home/home.jpg')"
			     }}>
				<div className="bottom-0 right-0 absolute text-slate-200 text-sm font-normal backdrop-blur-sm px-3 py-1">
				       © Gabi Rusu, some rights reserved (CC BY-NC)
				</div>
				<div className="flex flex-col m-8 mt-[calc(64px+12px*2)] space-y-2 max-w-[675px] lg:max-w-none lg:col-start-2 lg:col-span-6">
					<header className="flex flex-col justify-center items-center space-y-4">
						<h2 className="w-full font-normal text-xl text-white-drop-shadow">
							{t(lang, "home.subtitle")}
						</h2>
						<h1 className="w-full text-pretty font-normal text-4xl md:font-light md:text-5xl 2xl:text-6xl text-white-drop-shadow">
							{t(lang, "home.title")}
						</h1>
					</header>
					<div className="space-y-2 py-8">
						<div className="flex flex-row gap-1.5 h-[56px]">
							<FullCBBSearchBar lang={lang} showFilters={false} rounded={true}/>
							<Button as={Link} href={`/${lang}/taxon/list`} className="h-full rounded-full bg-white border text-2xl text-foreground-500">
								<MdTune/>
							</Button>
						</div>
						<Statistics lang={lang}/>
						<div className="grid grid-cols-4 my-auto gap-2 justify-center items-center pt-4">
							<Image src="/images/partners/eu_next_gen.png" alt={"Partner NextGenerationEU"}
                                   width={261} height={63} style={{scale: 0.85}}
                                   className="m-auto w-auto max-h-[50px]" radius={null}/>
							<Image src="/images/partners/gob_es.png" alt={"Partners logos"} className="m-auto w-auto max-h-[50px]"
                                   width={366} height={118} style={{scale: 1.05}}
							       radius={null}/>
							<Image src="/images/partners/plan-recuperacion.png" alt={"Partners logos"}
							       className="m-auto w-auto max-h-[50px]"
                                   width={181} height={58}
							       radius={null}/>
							<Image src="/images/partners/goib.png" alt={"Partners logos"} className="m-auto w-auto max-h-[50px]"
                                   width={368} height={152} style={{scale: 1.05}}
							       radius={null}/>
						</div>
					</div>
				</div>
			</div>
			<div className="h-full min-h-full"/>
		</>
	)
}
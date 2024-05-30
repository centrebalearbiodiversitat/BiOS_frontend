import CBBCard from "@/components/Card";
import HoverLink from "@/components/HoverLink";
import {Fragment} from "react";
import {t} from "@/i18n/i18n";
import CBBSearchBar from "@/components/CBBSearchBar";
import MapLibre from "@/components/MapLibre";
import Link from "next/link";


export default function Home({params: {lang}}) {

	return (
		<Fragment>
			<div className="basis-3/5">

				<Link href={`${lang}/map`}>
					<MapLibre nav={false}>
						<div className="absolute w-full flex bottom-0 justify-center">
							<CBBSearchBar label={t(lang, "components.searchbar.label")}
							              lang={lang}
							              className="rounded w-[40%] max-w-[500px] mb-3"/>
						</div>
					</MapLibre>
				</Link>
			</div>
			<div className="basis-2/5 grid grid-cols-3">
				<HoverLink href={`${lang}/map`}>
					<CBBCard upperTitle="Search" title={t(lang, 'home.cards.taxa.title')} background="primary"/>
				</HoverLink>
				<HoverLink href={`${lang}/genetics/gene/COI`}>
					<CBBCard upperTitle="Search" title={t(lang, 'home.cards.genetics.title')} background="secondary"/>
				</HoverLink>
				<HoverLink href={`${lang}/taxon`}>
					<CBBCard upperTitle="Search" title={t(lang, 'home.cards.statistics.title')} background="accent"/>
				</HoverLink>
			</div>
		</Fragment>
	);
}

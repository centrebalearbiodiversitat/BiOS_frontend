import CBBCard from "@/components/Card";
import Map from "@/components/Map";
import HoverLink from "@/components/HoverLink";
import SearchBar from "@/components/SearchBar";
import {Fragment} from "react";
import {t} from "@/i18n/i18n";

// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

export default function Home({params: {lang}}) {
	return (
		<Fragment>
			<div className="relative h-[40%] w-full">
				<HoverLink className="flex h-full" href={`${lang}/map`}>
					<Map lang={lang}/>
				</HoverLink>
				<div className="absolute w-full flex bottom-0 justify-center">
					<SearchBar label={t(lang, "components.searchbar.label")} className="rounded w-[40%] max-w-[500px] mb-3"/>
				</div>
			</div>
			<div className="m-auto grid grid-cols-1 md:grid-cols-3">
				<HoverLink href={`${lang}/map`}>
					<CBBCard upperTitle="Search" title={t(lang, 'home.cards.taxa.title')} background="primary"/>
				</HoverLink>
				<HoverLink href={`${lang}/genetics/gene/COI`}>
					<CBBCard upperTitle="Search" title={t(lang, 'home.cards.genetics.title')} background="secondary"/>
				</HoverLink>
				<HoverLink href={`${lang}/taxon`}>
					<CBBCard upperTitle="Search" title={t(lang, 'home.cards.statistics.title')} background="accent"/>
				</HoverLink>
				{/*<CBBCard upperTitle="Map" title="Discover the biodiversity"/>*/}
				{/*<CBBCard upperTitle="Curated taxa list" title="Search taxa in Balearic Islands"/>*/}
			</div>
		</Fragment>
	);
}

import CBBCard from "@/components/Card";
import Map from "@/components/Map";
import HoverLink from "@/components/HoverLink";

// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

export default function Home({params: {lang}}) {
	return (
		<>
			<HoverLink className="flex" href={`${lang}/map`}>
				<Map className="min-h-[300px]"/>
			</HoverLink>
			<div className="m-auto grid grid-cols-1 md:grid-cols-3">
				<HoverLink href={`${lang}/map`}>
					<CBBCard upperTitle="Search" title="Curated taxa list" background="primary"/>
				</HoverLink>
				<HoverLink href={`${lang}/genetics/COI`}>
					<CBBCard upperTitle="Search" title="Genetics" background="secondary"/>
				</HoverLink>
				<HoverLink href={`${lang}/taxon`}>
					<CBBCard upperTitle="Search" title="Taxa" background="accent"/>
				</HoverLink>
				{/*<CBBCard upperTitle="Map" title="Discover the biodiversity"/>*/}
				{/*<CBBCard upperTitle="Curated taxa list" title="Search taxa in Balearic Islands"/>*/}
			</div>
		</>
	);
}

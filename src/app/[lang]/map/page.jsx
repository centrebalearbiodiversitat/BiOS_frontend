// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

import Map from "@/components/Map";

export default function MapPage({}) {
	return (
		<Map className="min-w-full h-full">
		</Map>
	);
}

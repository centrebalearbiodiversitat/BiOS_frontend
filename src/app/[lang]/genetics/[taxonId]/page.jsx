// const languages = ['en', 'de']
//
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

export default function Gene({params: {taxonId}}) {

	return (
		<div className="flex h-full">
			<h1 className="m-auto font-bold text-6xl">
				{gene}
			</h1>
		</div>
	);
}

export default function RootLayout({children}) {
	return (
		<article className="w-full text-pretty break-words max-w-[900px] mx-auto space-y-6 py-[3vh]">
			{children}
		</article>
	);
}

export default function Layout({children}) {
	return (
		<div className="flex justify-center mx-[10vw] my-[3vh] md:my-[8vh]">
			<article className="min-h-full max-w-[800px] text-pretty whitespace-pre-line flex flex-col gap-y-8">
				{children}
			</article>
		</div>
	);
}

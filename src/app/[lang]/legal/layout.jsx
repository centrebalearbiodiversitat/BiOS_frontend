export default function Layout({children}) {
	return (
		<div className="flex justify-center mx-[4vw] md:mx-[10vw] py-[3vh] md:py-[8vh] mt-4 md:mt-10 border border-slate-200 shadow-md">
			<article className="min-h-full max-w-[800px] mx-[8vw] xl:mx-0 text-pretty whitespace-pre-line flex flex-col gap-y-8">
				{children}
			</article>
		</div>
	);
}

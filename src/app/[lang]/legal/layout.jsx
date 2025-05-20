export default function Layout({children}) {
	return (
		<div className="flex justify-center mx-[4vw] py-[3vh] md:py-[8vh]">
			<article className="min-h-full max-w-[800px] mx-[8vw] xl:mx-0 text-pretty whitespace-pre-line flex flex-col gap-y-8">
				{children}
			</article>
		</div>
	);
}

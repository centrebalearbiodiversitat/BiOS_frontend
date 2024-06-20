import {t} from "@/i18n/i18n";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";


export default function Home({params: {lang}}) {

	return (
		<div className="h-full w-full grid grid-cols-12 absolute top-0"
		     style={{
			     backgroundRepeat: 'no-repeat',
			     backgroundSize: 'cover',
			     backgroundPosition: 'center',
			     backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/9/92/Darter_August_2007-22_edit.jpg')"
		     }}>
			<div
				className="col-start-4 col-span-6 2xl:col-start-5 2xl:col-span-4 flex flex-col justify-center items-center">
				<header className="flex flex-col justify-center items-center mb-[100px] space-y-2">
					<h3 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
						{t(lang, "home.subtitle")}
					</h3>
					<h2 className="text-white text-center font-bold text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
						{t(lang, "home.title")}
					</h2>
				</header>
				<FullCBBSearchBar lang={lang}/>
			</div>
		</div>
	);
}

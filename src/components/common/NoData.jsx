import {useLang} from "@/contexts/LangContext";
import {t} from "@/i18n/i18n";


export default function NoData({isDataAvailable, children}) {
	const [lang, _] = useLang();

	if (isDataAvailable) {
		return children;
	} else {
		return (
			<div className="relative flex flex-row w-full h-full" data-nosnippet="true">
				<div className="blur-sm w-full h-full">
					{children}
				</div>
				<div className="absolute w-full h-full flex flex-row justify-center items-center">
					<p className="bg-white text-sm px-4 py-1 border border-slate-200 rounded-full shadow-md">
						{t(lang, "components.no_data")}
					</p>
				</div>
			</div>
		)
	}
}
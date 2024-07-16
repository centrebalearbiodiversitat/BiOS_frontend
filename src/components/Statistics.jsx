import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import Loading from "@/components/Loading";


function DataCard({lang, title, icon, fetchData}) {
	const [data, setData] = useState(null);


	useEffect(() => {
		fetchData().then(payload => setData(payload))
	}, [fetchData]);

	return (
		<div className="flex-1 h-full py-1">
			<div className="flex flex-col xl:flex-row justify-center flex-wrap overflow-hidden m-auto">
				<div className="text-5xl xl:me-3 text-black flex justify-center items-center">
					<Loading loading={data === null} width="54px" height="54px">
						{icon}
					</Loading>
				</div>
				<div className="flex flex-col justify-center xl:justify-start">
					<Loading loading={data === null} width="150px" height="14px">
						<h4 className="font-light text-center xl:text-start">{t(lang, title)}</h4>
					</Loading>
					<Loading loading={data === null} width="150px" height="40px">
						<h3 className="font-semibold text-4xl text-center xl:text-start">
							{data}
						</h3>
					</Loading>
			</div>
		</div>
</div>
)
}


export default function Statistics({lang, className, data}) {

	return (
		<div className={`bg-white/100 py-2 divide-y md:divide-x md:divide-y-0 container flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 rounded-md ${className}`}>
			{data &&
				data.map((item, index) => <DataCard {...item} key={index} lang={lang}/>)
			}
		</div>
	);
}
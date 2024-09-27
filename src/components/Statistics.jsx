"use client"

import React, {useEffect, useState} from "react";
import {t} from "@/i18n/i18n";
import Loading from "@/components/common/Loading";


function DataCard({lang, title, icon, fetchData}) {
	const [data, setData] = useState(undefined);


	useEffect(() => {
		fetchData().then(payload => setData(payload))
	}, [fetchData]);

	return (
		<div className="flex-1 w-full h-full py-1">
			<div className="flex flex-col md:flex-row justify-center flex-wrap overflow-hidden m-auto">
				<div className="hidden md:block my-auto me-4 text-5xl text-black justify-center items-center">
					{icon}
				</div>
				<div className="flex flex-col justify-center">
					<div className="flex justify-center">
						<Loading loading={data} className="" width="60px" height="40px">
							<h3 className="font-semibold text-2xl text-center">
								{data}
							</h3>
						</Loading>
					</div>
					<h4 className="font-light text-center">{t(lang, title)}</h4>
				</div>
			</div>
		</div>
	)
}


export default function Statistics({lang, className, data}) {

	return (
		<div className={`bg-white/100 py-2 divide-x container flex flex-col md:flex-row rounded-md ${className}`}>
			{data &&
				data.map((item, index) => <DataCard {...item} key={index} lang={lang}/>)
			}
		</div>
	);
}
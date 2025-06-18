import React from "react";
import {Image} from "@heroui/image";
import CBBLink from "@/components/common/CBBLink";
import clsx from "clsx";
import {t} from "@/i18n/i18n";
import {ICON_BASIS_TYPE} from "@/utils/icons";

function SourceCard({lang, source}) {
	const size = "50px"

	return (
		<div className="p-5 border border-slate-200 rounded-lg hover:shadow-md hover:shadow-slate-300 transition delay-300 duration-300 ease-out">
			<div className="@container flex gap-3">
				<div className="flex justify-center items-center rounded-full border border-slate-300 overflow-hidden" style={{
					width: size,
					height: size,
					maxWidth: size,
					maxHeight: size,
					minWidth: size,
					minHeight: size,
				}}>
					{source.image ?
						<Image className="m-auto" radius="none" removeWrapper src={source.image}/> :
						<span className="text-lg text-slate-600">{ICON_BASIS_TYPE[source.type]()}</span>
					}
				</div>
				<p className={clsx(
					"text-sm my-auto font-bold",
				)}>
					{source.name}
				</p>
			</div>
			<div className="flex flex-col flex-grow">
				<p className="my-4 text-sm font-light text-pretty line-clamp-3 h-[4.5em] leading-[1.5em]">
					{source.description}
				</p>
				<div className="mt-auto ms-auto">
					<CBBLink href={`/${lang}/sources/${source.id}`}>
						{t(lang, "sources.learn_more")} &gt;
					</CBBLink>
				</div>
			</div>
		</div>
	)
}

export function SourceTab({lang, data}) {
	return (
		<div className="container gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			{
				data.map(
					s => (
						<SourceCard key={s.id} lang={lang} source={s}/>
					)
				)
			}
		</div>
	)
}
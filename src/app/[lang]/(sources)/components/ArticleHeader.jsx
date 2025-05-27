"use client"

import React, {useMemo} from "react";
import {Link} from "@heroui/link";
import {t} from "@/i18n/i18n";
import {Image} from "@heroui/image";
import {useLang} from "@/contexts/LangContext";


export default function ArticleHeader({header, subheader, redirect, image: {alt, src, title}}) {
	const [lang] = useLang();

	return (
		<header className="w-full pt-8 mx-auto">
			<h1 className="text-4xl font-extralight">{t(lang, header)}</h1>
			<h2 className="text-lg font-extralight">{t(lang, subheader)}</h2>
			<div className="w-full mx-auto">
				<Link href={redirect} className="w-full">
					<Image alt={alt} removeWrapper={true}
					       src={src}
					       title={title}
					       className="object-cover w-full h-full max-h-[400px] rounded-none saturate-[120%] brightness-110"/>
				</Link>
			</div>
		</header>
	)
}
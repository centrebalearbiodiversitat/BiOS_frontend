"use client"

import React from "react";
import {usePathname} from "next/navigation";

export default function FooterSeparator({lang}) {
	const pathname = usePathname();

	if (pathname === `/${lang}`) {
		return null;
	}

	return <hr className="mx-auto w-[80%] max-w-4xl mt-20"/>
}
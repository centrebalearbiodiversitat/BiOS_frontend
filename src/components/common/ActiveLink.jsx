"use client"

import React from "react";
import CBBButton from "@/components/common/CBBButton";
import {Link} from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function ActiveLink({children, href, ...props}) {
	const pathName = usePathname();

	return (
		<Link href={href}>
			<CBBButton {...props} variant={"bordered"} className={`navbar-button border-${pathName === href ? 'black' : 'transparent'} hover:border-black border-1`}>
				{children}
			</CBBButton>
		</Link>
	);
}
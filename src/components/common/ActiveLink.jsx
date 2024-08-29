"use client"

import React from "react";
import CBBButton from "@/components/common/CBBButton";
import {Link} from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function ActiveLink({children, href, ...props}) {
	const pathName = usePathname();

	return (
		<Link href={href}>
			<CBBButton {...props} variant={"light"} className={`!bg-transparent !opacity-1 hover:text-primary/90 text-lg font-light navbar-button ${pathName === href ? ' font-normal text-primary' : 'text-black'}`}>
				{children}
			</CBBButton>
		</Link>
	);
}
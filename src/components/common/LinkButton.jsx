"use client"

import React from "react";
import {Button} from "@heroui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function LinkButton({href, children, ...extra}) {
	const pathname = usePathname();

	return (
		<Button href={href} radius="full" className="min-w-[150px] py-5" as={Link}
		        color={href === pathname ? "primary" : "default"} {...extra}>
			{children}
		</Button>
	);
}
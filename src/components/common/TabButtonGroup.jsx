"use client"

import React, {useCallback, useEffect, useState} from "react";
import {Button} from "@heroui/button";
import Link from "next/link";
import clsx from "clsx";
import {useParams, usePathname} from "next/navigation";

export function TabButton({href, text, icon, small = false}) {
	const pathname = usePathname();
	const params = useParams();
	const [fullPath, setFullPath] = useState(undefined);

	const updatePath = useCallback(() => {
		setFullPath(window.location.pathname + window.location.search + window.location.hash)
	}, []);

	useEffect(() => {
		updatePath();
	}, [updatePath, pathname, params]);

	return (
		<Button as={Link} radius="full" href={href} key={href}
		        className={clsx(
			        "w-[50px] max-w-[50px] text-center text-lg font-extralight",
			        !small && "md:w-[150px] md:max-w-[150px]",
			        href === pathname || href === fullPath ? "text-white bg-primary" : "text-black bg-gray-100"
		        )}>
			{icon}{text && <span className="hidden md:block">{text}</span>}
		</Button>
	)
}

export function TabButtonGroup({children}) {
	return (
		<div className="flex flex-row gap-2 justify-center">
			{children}
		</div>
	)
}
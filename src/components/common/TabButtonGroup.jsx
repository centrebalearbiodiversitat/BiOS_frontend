"use client"

import React, {useCallback, useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import clsx from "clsx";
import {useParams, usePathname} from "next/navigation";


export default function TabButtonGroup({buttons, colorPrimary, colorSecondary, small = false, ...extra}) {
	const [fullPath, setFullPath] = useState(undefined)
	const pathname = usePathname();
	const params = useParams();

	const updatePath = useCallback(() => {
		setFullPath(window.location.pathname + window.location.search + window.location.hash)
	}, []);

	useEffect(() => {
		updatePath();
	}, [updatePath, pathname, params]);

	return (
		<div className="flex flex-row gap-2 justify-center">
			{
				buttons.map((button) => {
					return (
						<Button as={Link} radius="full" href={button.href} key={button.href}
						        className={clsx(
							        "w-[50px] max-w-[50px] text-center text-lg font-extralight",
							        !small && "md:w-[150px] md:max-w-[150px]",
							        button.href === pathname || button.href === fullPath ? "text-white bg-primary" : "text-black bg-gray-100"
						        )}>
							{button.icon}{button.text && <span className="hidden md:block">{button.text}</span>}
						</Button>
					)
				})
			}
		</div>
	)
}
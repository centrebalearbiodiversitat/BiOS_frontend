import React from "react";
import {Button, Tab, Tabs} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";

function TabButton({href, children, type, className, ...extra}) {
	let borders = 'rounded-none';

	switch (type) {
		case "first":
			borders = 'rounded-b-none rounded-tr-none rounded-tl-xl';
			break;
		case "last":
			borders = 'rounded-b-none rounded-tl-none rounded-tr-xl';
			break;
	}

	return (
		<Button href={href} as={Link} radius={"sm"}
		        className={`min-w-[150px] p-4 ${borders} ${className}`}
		        {...extra}>
			{children}
		</Button>
	);
}

export default function TabButtonGroup({buttons, colorPrimary, colorSecondary, ...extra}) {
	const pathname = usePathname();

	return (
		<div className="flex flex-row flex-wrap md:grid-cols-6 justify-center md:mt-4">
		{
			buttons.map((button) => {
				return (
					<Button as={Link} radius="full" className={`mb-2 me-2 w-[50px] max-w-[50px] md:w-[150px] md:max-w-[150px] py-4 md:py-6 text-center text-lg font-extralight ${button.href === pathname ? "text-white bg-primary" : "text-black bg-gray-100"}`} href={button.href} key={button.href}>
						{button.icon}<span className="hidden md:block">{button.text}</span>
					</Button>
				)
			})
		}
		</div>
	)
}
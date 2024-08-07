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
	const last = buttons.length - 1;

	return (
		<div className="flex flex-row rounded-t-2xl divide-x divide-gray-300">
			<Tabs selectedKey={pathname} aria-label="Options" color="primary" variant="underlined">
				{
					buttons.map((button, index) => {
						// const type = index === 0 ? "first" : (index === last ? "last" : "between");

						// return (
						// 	<TabButton key={index} href={button.href} type={type}
						// 	           className={`${button.href === pathname ? colorPrimary : colorSecondary}`}
						// 	           {...extra}>
						// 		{button.text}
						// 	</TabButton>
						// )
						return (
							<Tab key={button.href} href={button.href}
							     title={
								     <div className="flex items-center space-x-2">
									     <span>{button.text}</span>
								     </div>
							     }
							/>
						)
					})
				}
			</Tabs>
		</div>
	)
}
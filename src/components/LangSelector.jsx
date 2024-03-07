"use client"

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useRouter, usePathname} from "next/navigation";

export default function LangSelector({locales, lang}) {
	const router = useRouter();
	const pathname = usePathname();

	const redirect = (locale) => {
		router.push(pathname.replace(`/${lang}`, `/${locale}`))
	}

	return (
		<Dropdown className="min-w-[100px]">
			<DropdownTrigger>
				<Button variant="bordered">
					{lang}
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Change language" onAction={redirect}>
				{
					locales.map((locale) =>
						<DropdownItem key={locale} hidden={false} className="text-center">
							{locale}
						</DropdownItem>
					)
				}
			</DropdownMenu>
		</Dropdown>
	)
}
"use client"

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useRouter, usePathname} from "next/navigation";
import {IoIosArrowDown} from "react-icons/io";

export default function LangSelector({locales, lang}) {
	const router = useRouter();
	const pathname = usePathname();

	const redirect = (locale) => {
		router.push(
			pathname.replace(`/${lang}`, `/${locale}`),
			undefined,
			{shallow: true}
		)
	}

	return (
		<Dropdown className="min-w-[100px]">
			<DropdownTrigger>
				<Button radius="full" className="uppercase bg-white/60 border-0 backdrop-blur-2xl">
					{lang} <IoIosArrowDown/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Change language" onAction={redirect}>
				{
					locales.map((locale) =>
						<DropdownItem key={locale} hidden={false} className="text-center uppercase">
							{locale}
						</DropdownItem>
					)
				}
			</DropdownMenu>
		</Dropdown>
	)
}
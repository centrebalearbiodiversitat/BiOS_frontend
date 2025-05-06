"use client"

import React, {useEffect} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import {useRouter, usePathname, useSearchParams, notFound} from "next/navigation";
import {IoIosArrowDown} from "react-icons/io";
import {AVAILABLE_LOCALES} from "@/i18n/i18n";

export default function LangSelector({locales, lang}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const pathnameLocale = AVAILABLE_LOCALES.find(
	       locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
		)

		if (!pathnameLocale) {
			notFound();
		}
	}, [pathname]);

	const redirect = (locale) => {
		const newPath = pathname.replace(`/${lang}`, `/${locale}`);

		router.push(
			`${newPath}?${searchParams.toString()}`,
			undefined,
			{shallow: true}
		)

	}

	return (
		<Dropdown className="min-w-[100px]" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button radius="full" className="uppercase bg-white border-0">
					{lang} <IoIosArrowDown/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu itemClasses={{wrapper: "rounded-full"}} aria-label="Change language" onAction={redirect}>
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
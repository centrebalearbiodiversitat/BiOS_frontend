"use client"

import React, {useMemo} from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@heroui/navbar";
import {Link} from "@heroui/link";
import Image from "next/image";
import LangSelector from "@/components/LangSelector";
import {t} from "@/i18n/i18n";
import clsx from "clsx";
import {LuExternalLink} from "react-icons/lu";
import {usePathname} from "next/navigation";

export default function Header({lang, locales, className}) {
	const pathname = usePathname();

	const menuItems = useMemo(() => {
		return [
			{text: t(lang, "components.header.button.home"), href: `/${lang}`},
			{text: t(lang, "components.header.button.map"), href: `/${lang}/map`},
			{text: t(lang, "components.header.button.about"), href: `/${lang}/about`},
			{text: t(lang, "components.header.button.sources"), href: `/${lang}/sources`},
			{text: t(lang, "components.header.button.API"), href: `${process.env.API_BASE_URL}/api/docs`, external: true},
			// {text: t(lang, "components.header.button.taxonomy"), href: `/${lang}/taxon`},
			// {text: t(lang, "components.header.button.genetics"), href: `/${lang}/genetics`},
		]
	}, [lang]);

	const isHome = pathname === `/${lang}`;

	return (
		<Navbar maxWidth="full" shouldHideOnScroll={false} position="sticky" classNames={{wrapper: "md:px-14"}} className={clsx(
			"transition-all z-50 shadow-sm backdrop-blur-sm hover:backdrop-blur-xl border-b-1 border-white/10",
			isHome ? "bg-transparent" : "bg-white/60",
			className
		)}>
			<NavbarBrand className="w-full h-full">
				<div className="flex flex-row w-full h-full">
					<Link href={`/${lang}`} className="transition-all h-full justify-start">
						<Image src={isHome ? "/images/logos/balearica-logo.png" : "/images/logos/balearica-logo-dark.png"} width={1130} height={382}
						       className="contrast-125 w-auto h-full " alt={"CBB logo"} priority={true}
						       style={{scale: 0.8}} radius={null}/>
					</Link>
				</div>
			</NavbarBrand>
			<NavbarContent className="hidden md:flex gap-8" justify="end">
				{
					menuItems.map(
						(section) => (
							<NavbarItem key={section.href}>
								<Link href={section.href} target={section.external ? "_blank" : "_self"}
								      className={clsx(
										  "hover:text-primary font-normal hover:font-medium transition-all text-md navbar-button",
									      isHome && "text-white",
									      !isHome && "text-black"
								      )}>
									{section.text} {section.external && <LuExternalLink className="text-xs mb-auto ms-1"/>}
								</Link>
							</NavbarItem>
						)
					)
				}
				<NavbarItem>
					<LangSelector locales={locales} lang={lang}/>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenuToggle className={clsx("md:hidden", isHome ? "text-white" : "text-black")}/>
			<NavbarMenu className={clsx("flex flex-col justify-center items-center gap-6", isHome ? "bg-black" : "bg-white")}>
				{
					menuItems.map((section, idx) => (
						<NavbarMenuItem key={section.href} className="w-full">
							<Link href={section.href} target={section.external ? "_blank" : "_self"}
							      className={clsx("w-full justify-center text-3xl font-extralight", isHome ? "!text-white" : "!text-black")}>
								{section.text} {section.external && <LuExternalLink className="mb-auto ms-1"/>}
							</Link>
						</NavbarMenuItem>
					))
				}
				<NavbarItem className="mt-12">
					<LangSelector locales={locales} lang={lang}/>
				</NavbarItem>
			</NavbarMenu>
		</Navbar>
	);
}
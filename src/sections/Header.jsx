import React, {useMemo} from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import LangSelector from "@/components/LangSelector";
import HoverLink from "@/components/common/HoverLink";
import {t} from "@/i18n/i18n";
import ActiveLink from "@/components/common/ActiveLink";
import clsx from "clsx";

export default function Header({lang, locales, className}) {
	const menuItems = useMemo(() => {
		return [
			{text: t(lang, "components.header.button.home"), href: `/${lang}`},
			{text: t(lang, "components.header.button.map"), href: `/${lang}/map`},
			{text: t(lang, "components.header.button.about"), href: `/${lang}/about`},
			{text: t(lang, "components.header.button.sources"), href: `/${lang}/sources`},
			// {text: t(lang, "components.header.button.taxonomy"), href: `/${lang}/taxon`},
			// {text: t(lang, "components.header.button.genetics"), href: `/${lang}/genetics`},
		]
	}, [lang]);

	return (
		<Navbar maxWidth="full" shouldHideOnScroll={false} position="sticky" className={clsx("z-50 py-3 bg-white/60 shadow-sm backdrop-blur-sm", className)}>
			<NavbarContent>
				<NavbarBrand>
					<HoverLink href={`/${lang}`}>
						<Image src="/images/cbb-logo.png" className="brightness-95" alt={"CBB logo"} width="400px" radius={null}/>
						{/*<CBBLogo className="w-full h-[6svw] sm:h-[8svw] md:h-[11svw] min-h-[38px] max-h-[48px] brightness-95"/>*/}
					</HoverLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden md:flex gap-4" justify="end">
				{
					menuItems.map(
						({text, href}) => (
							<NavbarItem key={href}>
								<ActiveLink href={href}>
									{text}
								</ActiveLink>
							</NavbarItem>
						)
					)
				}
				<NavbarItem>
					<LangSelector locales={locales} lang={lang}/>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenuToggle className="md:hidden text-black"/>
			<NavbarMenu className="flex flex-col justify-center items-center bg-white">
				{
					menuItems.map(({text, href}, idx) => (
						<NavbarMenuItem key={href} className="w-full">
							<Link color={idx === 0 ? "primary" : "foreground"} href={href}
							      className="w-full justify-center">
								{text}
							</Link>
						</NavbarMenuItem>
					))
				}
				<NavbarItem className="mt-3">
					<LangSelector locales={locales} lang={lang}/>
				</NavbarItem>
			</NavbarMenu>
		</Navbar>
	);
}
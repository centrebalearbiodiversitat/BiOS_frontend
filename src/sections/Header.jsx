import React from "react";
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
import HoverLink from "@/components/HoverLink";
import {t} from "@/i18n/i18n";
import ActiveLink from "@/components/ActiveLink";

export default function Header({lang, locales}) {
	const menuItems = [
		{text: t(lang, "components.header.button.home"), href: `/${lang}`},
		{text: t(lang, "components.header.button.map"), href: `/${lang}/map`},
		{text: t(lang, "components.header.button.taxonomy"), href: `/${lang}/taxon`},
		{text: t(lang, "components.header.button.genetics"), href: `/${lang}/genetics`},
	];

	return (
		<Navbar maxWidth="full" className="py-3 shadow-sm backdrop-blur-2xl" >
			<NavbarContent>
				<NavbarMenuToggle
					className="md:hidden text-black"
				/>
				<NavbarBrand>
					<HoverLink href={`/${lang}`} className="flex gap-2">
						<Image src="/images/cbb-logo.png" alt={"CBB logo"} width="400px" radius={null}/>
						{/*<Image className="hidden md:flex" src="/images/cbb-text.png" width="120px" radius={null}/>*/}
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
			<NavbarMenu>
				{
					menuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
									}
									className="w-full"
									href="#"
									size="lg"
								>
									{item}
								</Link>
							</NavbarMenuItem>
						)
					)
				}
			</NavbarMenu>
		</Navbar>
	);
}
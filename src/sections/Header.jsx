'use client'

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
	Button
} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import LangSelector from "@/components/LangSelector";
import HoverLink from "@/components/HoverLink";

export default function Header({lang, locales}) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];

	return (
		<Navbar maxWidth="full" className="my-2 shadow-sm" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="md:hidden text-black"
				/>
				<NavbarBrand>
					<HoverLink href={`/${lang}`} className="flex gap-2">
						<Image src="/images/cbb-logo.png" width="100px" radius={null}/>
						<Image className="hidden md:flex" src="/images/cbb-text.png" width="120px" radius={null}/>
					</HoverLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden md:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Features
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Customers
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<LangSelector locales={locales} lang={lang}/>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
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
				))}
			</NavbarMenu>
		</Navbar>
	);
}
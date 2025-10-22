'use client'

import {HeroUIProvider} from "@heroui/system"
import {LangProvider} from "@/contexts/LangContext";

export function Providers({children, lang}) {
	return (
		<HeroUIProvider>
			<LangProvider initialState={lang}>
				{children}
			</LangProvider>
		</HeroUIProvider>
	)
}
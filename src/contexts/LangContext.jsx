"use client"

import {createContext, useContext, useEffect, useState} from "react";

const LangContext = createContext();

export function LangProvider({children, initialState}) {
	const [lang, setLang] = useState(initialState);

	useEffect(() => {
		setLang(initialState)
	}, [initialState]);

	return (
		<LangContext.Provider value={[lang, setLang]}>
			{children}
		</LangContext.Provider>
	);
}

export const useLang = () => useContext(LangContext);

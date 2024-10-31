import {createContext, useContext, useEffect, useState} from "react";

const TaxonContext = createContext();

export function TaxonProvider({children, initialState}) {
	const [taxon, setTaxon] = useState(initialState);

	useEffect(() => {
		setTaxon(initialState)
	}, [initialState]);

	return (
		<TaxonContext.Provider value={[taxon, setTaxon]}>
			{children}
		</TaxonContext.Provider>
	);
}

export const useTaxon = () => useContext(TaxonContext);

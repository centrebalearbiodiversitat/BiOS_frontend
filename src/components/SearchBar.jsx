"use client"

import React, {useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Truculenta} from "next/dist/compiled/@next/font/dist/google";


function SearchBarIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
		     className="w-6 h-6">
			<path strokeLinecap="round" strokeLinejoin="round"
			      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
		</svg>
	)
}

export default function SearchBar({className, label='Search...'}) {
	const [isFocused, setIsFocused] = useState(false)
	const elements = [
		{'key': 1, 'label': 'Sharpia rubida'},
		{'key': 2, 'label': 'Mus musculus'},
		{'key': 3, 'label': 'Bela graphica'},
	]

	return (
		<div className={`${className}`}>
			<Autocomplete variant={"faded"} defaultItems={elements} onFocusChange={(focus) => setIsFocused(focus)}
			              label={label} onSelectionChange={(selected) => console.log(selected)}
			              className={`w-full ${isFocused ? "" : "opacity-85"} hover:opacity-100 transition-all text-center`}
			              selectorIcon={<SearchBarIcon/>} disableSelectorIconRotation={true}>
				{(animal) => <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>}
			</Autocomplete>
		</div>
	);
}

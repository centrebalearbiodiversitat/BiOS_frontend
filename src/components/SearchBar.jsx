"use client"

import React, {useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";


function SearchBarIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
		     className="w-6 h-6">
			<path strokeLinecap="round" strokeLinejoin="round"
			      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
		</svg>
	)
}

const Highlight = ({text, highlight}) => {
	// Check if the highlight string is empty
	if (!highlight.trim()) {
		return <span>{text}</span>;
	}

	// Split the text into parts around the highlight string
	const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

	return (
		<span>
			{parts && parts.map((part, index) =>
				part.toLowerCase() === highlight.toLowerCase() ? (
					<span key={index} className="bg-primary bg-opacity-80">
				{part}
				</span>
				) : (
					part
				)
			)}
	    </span>
	);
};


export default function SearchBar({className, data, onSelected, onInput, label = 'Search...', rounded = true, border= false}) {
	const [isFocused, setIsFocused] = useState(false);
	const [search, setSearch] = useState('');

	function onInputChange(input) {
		if (input)
			setSearch(input);
		else
			setSearch('');

		onInput(input);
	}

	function onFocusChange(focus) {
		setIsFocused(focus);
		if (!focus) {
			setSearch('');
		}
	}

	return (
		<div className={`${className}`}>
			<Autocomplete variant={"faded"} defaultItems={data} onFocusChange={onFocusChange}
			              label={label} onSelectionChange={onSelected} onInputChange={onInputChange}
			              className={`w-full transition-all text-center`} radius={rounded ? "full" : "sm"}
			              inputProps={{
				              classNames: {
					              input: "ml-1",
					              inputWrapper: `bg-white border-${border ? 1 : 0}`,
				              },
			              }}
			              selectorIcon={<SearchBarIcon/>} disableSelectorIconRotation={true}>
				{
					(obj) => (
						<AutocompleteItem key={obj.id} textValue={obj.name}>
							<Highlight text={obj.name} highlight={search}/>
						</AutocompleteItem>
					)
				}
			</Autocomplete>
		</div>
	);
}

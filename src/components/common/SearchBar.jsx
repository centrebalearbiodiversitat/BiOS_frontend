"use client"

import React, {useCallback, useMemo, useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import HighlightText from "@/components/common/HighlightText";
import {t} from "@/i18n/i18n";


function SearchBarIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
		     className="w-6 h-6">
			<path strokeLinecap="round" strokeLinejoin="round"
			      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
		</svg>
	)
}


const defaultChildren = (obj, search) => {
	return (
		<HighlightText text={obj.name} highlight={search}/>
	)
}


export default function SearchBar({
	className, data, onSelected, onInput, children = defaultChildren,
	label, placeholder, rounded = true, border = false, lang
}) {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(null);
	const [acFocus, setAcFocus] = useState(false);

	const onInputChange = useCallback((input) => {
		// if (input !== "") {
		onInput(input);
		setSearch(input);
		// }
	}, [onInput]);

	const onFocusChange = useCallback((focus) => {
		setAcFocus(focus);
		if (!focus) {
			onInput("");
			setSearch("");
			setSelected(null);
		}
	}, [onInput]);

	const _onSelected = useCallback((payload) => {
		if (payload) {
			onSelected(payload);
			setSelected(payload);
			setSearch('');
		}
	}, [onSelected]);

	const labelText = useMemo(() => {
		return t(lang, label)
	}, [lang, label]);

	const placeholderText = useMemo(() => {
		return t(lang, placeholder)
	}, [lang, placeholder]);

	const onDefaultSelected = useCallback((e) => {
		if (e.key === "ArrowRight" && !search) {
			onInputChange(placeholderText);
		} else if (data && data.length === 1 && e.key === "Enter")  {
			_onSelected(data[0].id)
		}
	}, [data, onInputChange, search, placeholderText, _onSelected]);

	return (
		<div className={className}>
			<Autocomplete variant={"faded"} defaultItems={data} onFocusChange={onFocusChange} inputValue={search}
			              selectedKey={selected} label={labelText} placeholder={acFocus ? `${placeholderText} →` : null}
			              onSelectionChange={_onSelected} onInputChange={onInputChange} onKeyDown={onDefaultSelected}
			              className={`w-full transition-all text-center`} radius={rounded ? "full" : "sm"}
			              listboxProps={{
				              shouldHighlightOnFocus: true,
			              }}
			              inputProps={{
				              classNames: {
					              input: "",
					              inputWrapper: `min-h-[50px] bg-white border-${border ? 1 : 0}`,
				              },
			              }}
			              selectorIcon={<SearchBarIcon/>} disableSelectorIconRotation={true}>
				{obj => (
					<AutocompleteItem key={obj.id} textValue={obj.name}>
						{children(obj, search)}
					</AutocompleteItem>
				)}
			</Autocomplete>
		</div>
	);
}

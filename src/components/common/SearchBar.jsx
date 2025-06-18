"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react";
import HighlightText from "@/components/common/HighlightText";
import {t} from "@/i18n/i18n";
import clsx from "clsx";
import {Autocomplete, AutocompleteItem} from "@heroui/autocomplete";


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
	className, data, onSelected, onInput, onSubmit, children = defaultChildren,
	label, placeholder, rounded = true, border = false, lang,
	isLoading = false
}) {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(null);
	const [showPlaceholder, setShowPlaceholder] = useState(false);

	useEffect(() => {
		function handleScroll() {
			setSearch("")
			setSelected(null)
		}
		
		window.addEventListener('scroll', handleScroll);

	    return () => {
	      window.removeEventListener('scroll', handleScroll);
	    };
	}, []);
	
	const onInputChange = useCallback((input) => {
		onInput(input);
		setSearch(input);
	}, [onInput]);

	// const onFocusChange = useCallback((focus) => {
	// 	setShowPlaceholder(focus);
	// }, []);

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
		if (e.key === "ArrowRight") {
			if (!search)
				onInputChange(placeholderText);
		} else if (e.key === "Enter")  {
			if (data) {
				if (data.length === 1) {
					_onSelected(data[0].id)
				}
				// else if (!selected) {
				// 	onSubmit(search);
				// }
			}
		}
	}, [data, onInputChange, search, placeholderText, _onSelected]);

	return (
		<div className={className}>
			<Autocomplete variant={"faded"} defaultItems={data} inputValue={search}
			              defaultFilter={(e) => true}
			              // renderInput={(props) => (
				          //     <div className="relative">
					      //         <Input {...props} className="pl-10"/>
					      //         <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						  //             🔍 <span className="text-sm">Search here...</span>
					      //         </div>
				          //     </div>
			              // )}
						  onFocusChange={setShowPlaceholder}
			              selectedKey={selected} label={labelText}
			              placeholder={showPlaceholder ? `${placeholderText} →` : null}
			              onSelectionChange={_onSelected} onInputChange={onInputChange} onKeyDown={onDefaultSelected}
			              className={`w-full transition-all text-center`} radius={rounded ? "full" : "sm"}
			              listboxProps={{
				              shouldHighlightOnFocus: true,
				              emptyContent: t(lang, 'taxon.list.notFound'),
			              }}
			              isLoading={isLoading}
			              classNames={{popoverContent: "rounded-2xl"}}
			              inputProps={{
				              classNames: {
					              input: "text-base font-light md:text-small kbd-rght-arrow",
					              inputWrapper: clsx('min-h-[50px] bg-white', border ? 'border-1' : 'border-0'),
				              },
			              }}
			              isClearable={true}
			              selectorIcon={<SearchBarIcon/>} disableSelectorIconRotation={true}>
				{obj => (
					<AutocompleteItem key={obj.id} textValue={obj.name} className="rounded-xl">
						{children(obj, search)}
					</AutocompleteItem>
				)}
			</Autocomplete>
		</div>
	);
}

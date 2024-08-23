"use client"

import React, {useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import HighlightText from "@/components/common/HighlightText";


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
    label = 'Search...',
    rounded = true, border = false
}) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    function onInputChange(input) {
        onInput(input);
        setSearch(input);
    }

    function onFocusChange(focus) {
        if (!focus) {
        	onInput("");
            setSearch("");
        	setSelected(null);
        }
    }

    function _onSelected(payload) {
        if (payload) {
            onSelected(payload);
            setSelected(payload);
            setSearch('');
        } else {
            setSearch('');
            setSelected(null);
        }
    }

    return (
        <div className={`${className}`}>
            <Autocomplete variant={"faded"} defaultItems={data} onFocusChange={onFocusChange} inputValue={search}
                          selectedKey={selected}
                          label={label} onSelectionChange={_onSelected} onInputChange={onInputChange}
                          className={`w-full transition-all text-center`} radius={rounded ? "full" : "sm"}
                          inputProps={{
                              classNames: {
                                  input: "",
                                  inputWrapper: `bg-white border-${border ? 1 : 0}`,
                              },
                          }}
                          selectorIcon={<SearchBarIcon/>} disableSelectorIconRotation={true}>
                    {(obj) => (
                        <AutocompleteItem key={obj.id} textValue={obj.name}>
                            {children(obj, search)}
                        </AutocompleteItem>
                    )}
            </Autocomplete>
        </div>
    );
}

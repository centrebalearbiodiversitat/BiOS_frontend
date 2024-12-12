"use client"

import React, {useCallback, useState} from "react";
import SearchBar from "@/components/common/SearchBar";
import CBBButton from "@/components/common/CBBButton";
import {t} from "@/i18n/i18n";


export default function CBBSearchBar({lang, label, placeholder, filters, showFilters = true, border = true, rounded = true, children}) {
    const [query, setQuery] = useState([]);
    const [filter, setFilter] = useState(0);

    const onSelected = useCallback((payload) => {
        filters[filter].onSelected(payload)
    }, [filters, filter]);

    const onInput = useCallback((input) => {
        filters[filter].onInput(input).then(q => setQuery(q))
    }, [filters, filter]);

    const onSubmit = useCallback((input) => {
        if (filters[filter].onSubmit)
            filters[filter].onSubmit(input)
    }, [filters, filter]);

    return (
        <>
            {showFilters &&
                <div className="w-full flex flex-row space-x-2 mb-2">
                    {
                        filters.map((fbutton, idx) => (
                            <CBBButton key={idx} onPress={() => setFilter(idx)}
                                       className={`${idx === filter ? "bg-white text-black" : "text-white bg-black/20 backdrop-blur-sm"} font-medium !opacity-100 hover:bg-white px-8 hover:text-black border-0`}>
                                {t(lang, fbutton.textKey)}
                            </CBBButton>

                        ))
                    }
                </div>
            }
            <SearchBar data={query} onSelected={onSelected} rounded={rounded} className="w-[100%]"
                       label={label} placeholder={placeholder} lang={lang} border={border}
                       onSubmit={onSubmit} onInput={onInput}>
                {children}
            </SearchBar>
        </>
    )
}

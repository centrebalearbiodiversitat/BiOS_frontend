"use client"

import React, {useCallback, useRef, useState} from "react";
import SearchBar from "@/components/common/SearchBar";
import CBBButton from "@/components/common/CBBButton";
import {t} from "@/i18n/i18n";


export default function CBBSearchBar({lang, label, placeholder, filters, loadOnSubmit = true, showFilters = true, border = true, rounded = true, children}) {
    const [query, setQuery] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState(0);
    const timeoutRef = useRef(null);

    const onSelected = useCallback((payload) => {
        loadOnSubmit && setIsLoading(true);
        filters[filter].onSelected(payload)
        setQuery([]);
    }, [filters, filter, loadOnSubmit]);

    const onInput = useCallback((input) => {
        if (timeoutRef.current) {
            setIsLoading(false);
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsLoading(true);
            filters[filter].onInput(input).then(q => {
                setIsLoading(false);
                setQuery(q);
            })
        }, 250);

    }, [filters, filter]);

    const onSubmit = useCallback((input) => {
        if (filters[filter].onSubmit) {
            loadOnSubmit && setIsLoading(true);
            filters[filter].onSubmit(input)
            setQuery([]);
        }
    }, [filters, filter, loadOnSubmit]);

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
                       onSubmit={onSubmit} onInput={onInput} isLoading={isLoading}>
                {children}
            </SearchBar>
        </>
    )
}

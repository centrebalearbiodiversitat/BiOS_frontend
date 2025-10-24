"use client"

import React, {useCallback, useRef, useState} from "react";
import SearchBar from "@/components/common/SearchBar";
import CBBButton from "@/components/common/CBBButton";
import {t} from "@/i18n/i18n";
import clsx from "clsx";


export default function CBBSearchBar({lang, label, placeholder, filters, loadOnSubmit = true, showFilters = true, border = true, rounded = true, disableLoading = false, children}) {
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
        <SearchBar data={query} onSelected={onSelected} rounded={rounded} className="w-full"
                   label={label} placeholder={placeholder} lang={lang} border={border}
                   onSubmit={onSubmit} onInput={onInput} isLoading={!disableLoading && isLoading}>
            {children}
        </SearchBar>
    )
}

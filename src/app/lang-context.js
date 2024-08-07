import React, {createContext, useContext, useState} from 'react';

const LanguageContext = createContext('en');

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({lang, children}) => {

    return (
        <LanguageContext.Provider value={lang}>
            {children}
        </LanguageContext.Provider>
    );
};

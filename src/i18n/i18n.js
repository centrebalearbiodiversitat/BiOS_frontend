import en from './locales/en.json'
import es from './locales/es.json'
import ca from './locales/ca.json'

export const AVAILABLE_LOCALES = ["en", "es", "ca"]
export const DEFAULT_LOCALE = "en"

en.length = Object.keys(en).length
es.length = Object.keys(es).length
ca.length = Object.keys(ca).length

console.assert(en.length === es.length && es.length === ca.length, `Mismatch of locale lengths. EN:${en.length} ES:${es.length} CA:${ca.length}`)

const dictionaries = {
    en,
    es,
    ca,
}

export function t(locale, key) {
    if (!(locale in dictionaries)) {
        console.error(locale, 'not found in dictionaries')
        locale = DEFAULT_LOCALE
    }

    const translation = dictionaries[locale]?.[key] || dictionaries[DEFAULT_LOCALE]?.[key] || ''

    if (!translation) {
        console.error(`Translation not found for "${locale}:${key}"`)
    }

    return translation
}
import en from './locales/en.json'
import es from './locales/es.json'
import ca from './locales/ca.json'

export const AVAILABLE_LOCALES = ["en", "es", "ca"]
export const DEFAULT_LOCALE = "es"

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
  return key in dictionaries[locale]  ? dictionaries[locale][key] : dictionaries[DEFAULT_LOCALE][key]
}
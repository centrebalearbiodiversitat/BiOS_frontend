import {t} from "@/i18n/i18n";

export function generatePageTitle(lang, title) {
	return `${title} | ${t(lang, 'web.name')}`
}
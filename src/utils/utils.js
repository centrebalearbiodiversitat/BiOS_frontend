import {t} from "@/i18n/i18n";

export function generatePageTitle(lang, title) {
	return `${title} | ${t(lang, 'web.name')}`
}

export function handleScrollTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

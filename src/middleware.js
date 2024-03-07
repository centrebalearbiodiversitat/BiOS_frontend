import {DEFAULT_LOCALE} from "@/i18n/i18n";
import {NextResponse} from "next/server";

export function middleware(request) {
	const {pathname} = request.nextUrl

	// const parts = pathname.split('/')
	//
	// if (parts.length < 2) {
	// 	// Redirect to default locale
	// 	request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`
	// } else {
	// 	const locale = parts[1]
	// 	if (locale in AVAILABLE_LOCALES) {
	// 		i18n.changeLanguage(locale)
	// 	}
	// 	// else {
	// 	// 	i18n.changeLanguage(DEFAULT_LOCALE)
	// 	// 	request.nextUrl.pathname = pathname.replace(`/${locale}/`, `/${DEFAULT_LOCALE}/`)
	// 	// 	return NextResponse.redirect(request.nextUrl)
	// 	// }
	// }
	console.log(request.nextUrl.pathname)
	request.nextUrl.pathname = `/${DEFAULT_LOCALE}`
	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		// '/((?!_next).*)',
		// '/((?!images).*)',
		// Optional: only run on root (/) URL
		'/'
	],
}
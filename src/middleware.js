import {DEFAULT_LOCALE} from "@/i18n/i18n";
import {NextResponse} from "next/server";

export function middleware(request) {
	const locale = request.cookies.get('preferred_locale', DEFAULT_LOCALE)

	console.log(request.nextUrl.pathname, locale)
	request.nextUrl.pathname = `/${DEFAULT_LOCALE}`

	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		'/'
	],
}
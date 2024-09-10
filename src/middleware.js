import {DEFAULT_LOCALE, AVAILABLE_LOCALES} from "@/i18n/i18n";
import {NextResponse} from "next/server";
import { cookies } from 'next/headers'

export function middleware(request) {
	const preferredLocale = request.cookies.get('preferredLocale')?.value;
	const acceptLanguage = request.headers.get('accept-language')?.split(',')[0];
	const locale = preferredLocale || acceptLanguage || DEFAULT_LOCALE;
	const { pathname } = request.nextUrl;

	if (pathname === "/") {
		request.nextUrl.pathname = `/${locale}`;
	} else {
		const pathnameLocale = AVAILABLE_LOCALES.find(
	       locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
		)

		if (pathnameLocale) {
			const res = NextResponse.next();
			res.cookies.set('preferredLocale', pathnameLocale);
			return res;
		} else {
			request.nextUrl.pathname = `/${locale}/404`;
		}
	}

	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		'/((?!_next|.*\\..*).*)', '/'
	],
}
import {DEFAULT_LOCALE, AVAILABLE_LOCALES} from "@/i18n/i18n";
import {NextResponse} from "next/server";


const TRANSLATE_DOMAIN_ENDING = {
	'es': 'es',
	'cat': 'ca',
	'eu': 'en',
}


export function middleware(request) {
	// const preferredLocale = request.cookies.get('preferredLocale')?.value;
	// const acceptLanguage = request.headers.get('accept-language')?.split(',')[0];
	// const locale = preferredLocale || acceptLanguage || DEFAULT_LOCALE;
	console.log(request.headers.get('host'))
	// const host = (new URL(request.headers.get('host'))).hostname;
	// const domainLang = TRANSLATE_DOMAIN_ENDING[host.split('.')?.at(-1)];
	const domainLang = null;

	const fallbackLocale = domainLang || DEFAULT_LOCALE;
	const { pathname } = request.nextUrl;

	if (pathname === "/") {
		request.nextUrl.pathname = `/${fallbackLocale}`;
	} else {
		const pathnameLocale = AVAILABLE_LOCALES.find(
	       locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
		)

		if (pathnameLocale) {
			// const res = NextResponse.next();
			// res.cookies.set('preferredLocale', pathnameLocale);
			// return res;
			return NextResponse.next();
		} else {
			request.nextUrl.pathname = `/${fallbackLocale}`;
		}
	}

	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		'/((?!_next|.*\\..*).*)', '/'
	],
}
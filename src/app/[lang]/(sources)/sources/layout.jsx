import ArticleHeader from "@/app/[lang]/(sources)/components/ArticleHeader";
import React from "react";

export default async function RootLayout({params, children}) {
	const {lang} = await params;

	return (
		<>
			<ArticleHeader header="sources.title" subheader="sources.subtitle"
			               image={{
				               title: "Wikipedia | Albert Masats, public domain (PD)",
				               src: "/images/pages/sources/podarcis.png",
				               alt: "Sargantana de Formentera Podarcis pityusensis",
			               }}
			               redirect={`/${lang}/taxon/search?q=Podarcis pityusensis`}/>
			{children}
		</>
	);
}

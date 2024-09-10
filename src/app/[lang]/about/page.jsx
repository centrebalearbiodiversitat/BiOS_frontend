import React from "react";
import AboutApp from "@/sections/AboutApp";
import AboutBulletPoints from "@/sections/AboutBulletPoints";


export default function About({params: {lang}}) {

	return (
		<>
			<article className="h-full">
				<AboutApp lang={lang}/>
			</article>
			<article className="h-full">
				<AboutBulletPoints lang={lang}/>
			</article>
		</>
	);
}

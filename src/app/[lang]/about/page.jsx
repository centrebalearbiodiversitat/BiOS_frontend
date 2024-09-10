import React from "react";
import AboutApp from "@/sections/AboutApp";
import AboutBulletPoints from "@/sections/AboutBulletPoints";


export default function About({params: {lang}}) {

	return (
		<>
			<article className="min-h-full flex justify-center items-center">
				<AboutApp lang={lang}/>
			</article>
			<article className="min-h-full">
				<AboutBulletPoints lang={lang}/>
			</article>
		</>
	);
}

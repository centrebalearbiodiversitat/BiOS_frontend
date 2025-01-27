import React from "react";
import clsx from "clsx";

export default function MainContent({children, className}) {

	return (
		<div className={clsx("rounded-xl h-fit space-y-10 bg-gray-50 py-4 px-5 md:py-7 md:px-8 xl:px-12 xl:py-12 2xl:px-20 2xl:py-16", className)}>
			{children}
		</div>
	);
}
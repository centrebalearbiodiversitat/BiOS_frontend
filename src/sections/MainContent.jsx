import React from "react";
import clsx from "clsx";

export default function MainContent({children, className}) {

	return (
		<div className={clsx("flex flex-col rounded-xl h-fit gap-y-10 bg-gray-50 p-5 md:p-8 xl:p-12 2xl:px-14 2xl:py-12", className)}>
			{children}
		</div>
	);
}
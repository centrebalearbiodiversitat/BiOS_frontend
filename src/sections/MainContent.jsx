import React from "react";

export default function MainContent({children, className}) {

	return (
		<div className={`rounded-2xl h-fit bg-gray-100 px-16 py-12 space-y-5 ${className}`}>
			{children}
		</div>
	);
}
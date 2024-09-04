import React from "react";

export default function MainContent({children, className}) {

	return (
		<div className={`rounded-lg h-fit space-y-8 bg-gray-50 p-4 xl:px-12 xl:py-10 ${className}`}>
			{children}
		</div>
	);
}
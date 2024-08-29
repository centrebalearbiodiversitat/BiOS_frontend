import React from "react";

export default function MainContent({children, className}) {

	return (
		<div className={`rounded-lg h-fit bg-slate-100 p-6 xl:p-16 ${className}`}>
			{children}
		</div>
	);
}
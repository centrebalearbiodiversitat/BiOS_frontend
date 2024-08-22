import React from "react";

export default function MainContent({children, className}) {

	return (
		<div className={`rounded-2xl rounded-tl-none h-fit bg-slate-50 px-6 py-12 xl:px-16 xl:py-12 space-y-5 ${className}`}>
			{children}
		</div>
	);
}
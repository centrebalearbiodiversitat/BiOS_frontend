import React from "react";
import clsx from "clsx";

export default function SubSection({className, children}) {
	return (
		<div className={clsx("p-6 md:p-10 2xl:p-16 bg-white border-1 border-slate-200 rounded-xl", className)}>
			{children}
		</div>
	)
}
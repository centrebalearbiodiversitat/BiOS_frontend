import React from "react";
import clsx from "clsx";

export default function SubSection({className, padding = "p-6 md:p-10 2xl:p-16", children, style= {}}) {
	return (
		<div className={clsx("overflow-hidden bg-white outline outline-slate-200 rounded-xl", padding, className)} style={style}>
			{children}
		</div>
	)
}
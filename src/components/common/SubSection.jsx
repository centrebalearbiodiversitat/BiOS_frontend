import React from "react";
import clsx from "clsx";

export default function SubSection({className, children, style= {}}) {
	return (
		<div className={clsx("overflow-hidden p-6 md:p-10 2xl:p-16 bg-white outline outline-1 outline-slate-200 rounded-xl", className)} style={style}>
			{children}
		</div>
	)
}
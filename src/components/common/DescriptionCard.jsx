import clsx from "clsx";
import {VscGraph} from "react-icons/vsc";
import React from "react";

export function Card({children, className}) {
	return (
		<div className={clsx('w-full aspect-video rounded-xl border-1 border-slate-200', className)}>
			{children}
		</div>
	)
}

function Description({children}) {
	return (
		<p className="font-extralight text-gray-600 bg-slate-100 px-4 py-3 rounded-t-xl">
			<VscGraph className="inline-block me-2"/>
			{children}
		</p>
	)
}

function Body({className, children}) {
	return (
		<div className={clsx("w-full h-full", className)}>
			{children}
		</div>
	)
}

Card.Description = Description;
Card.Body = Body;
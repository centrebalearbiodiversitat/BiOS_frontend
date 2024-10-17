import React from "react";
import Link from "next/link";
import clsx from "clsx";

export default function HoverLink({children, href, className}) {
	return (
		<Link href={href} className={clsx("hover:brightness-95 hover:scale-y-[102%] transition-all", className)}>
			{children}
		</Link>
	);
}
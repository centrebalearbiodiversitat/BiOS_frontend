import React from "react";
import Link from "next/link";

export default function HoverLink({children, href, className}) {
	return (
		<Link href={href} className={`hover:brightness-95 hover:scale-y-[102%] transition-all ${className}`}>
			{children}
		</Link>
	);
}
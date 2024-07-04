import React from "react";

export default function Aside({children, className}) {

	return (
		<aside className={`max-w-[400px] h-full space-y-6 ${className}`}>
			{children}
		</aside>
	);
}
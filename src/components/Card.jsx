import React from "react";

export default function CBBCard({upperTitle, title, src, background= 'primary'}) {
	return (
		<div className={`min-h-[100%] bg-${background} border-1 flex`}>
			<p className="m-auto text-3xl">{title}</p>
		</div>
	);
}
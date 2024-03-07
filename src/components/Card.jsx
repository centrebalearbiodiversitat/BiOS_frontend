import React from "react";

export default function CBBCard({upperTitle, title, src, background= 'primary'}) {
	return (
		<div className={`min-h-[300px] bg-${background} border-1 flex`}>
			<p className="m-auto text-3xl">{title}</p>
		</div>
	);
}
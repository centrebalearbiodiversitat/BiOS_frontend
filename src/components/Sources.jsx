import React from "react";
import {Chip} from "@nextui-org/react";

export default function Sources({sources, className}) {
	return (
		<ul className={`flex flex-row flex-wrap gap-1 gap-y-2 ${className}`}>
		{
			sources.map(
				s => (
					<li key={s.id}>
						<Chip className="bg-accent">
							{s.source.name}:{s.originId}
						</Chip>
					</li>
				)
			)
		}
		</ul>

	)
		;
}
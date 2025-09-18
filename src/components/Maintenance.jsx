import React from 'react';
import {Image} from "@heroui/image";

export default function Maintenance({children}) {
	if (process.env.MAINTENANCE === "true") {
		return (
			<div className="z-0 absolute top-0 h-full w-full">
				<Image alt="Upupa under building icon" radius={null} removeWrapper
				       className="w-full h-full object-cover " src="/images/pages/maintenance/under_maintenance.webp"/>
			</div>
		)
	} else {
		return children;
	}
}
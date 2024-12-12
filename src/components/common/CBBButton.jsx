import React from "react";
import {Button} from "@nextui-org/react";

export default function CBBButton({children, className, variant = "bordered", ...extra}) {
	return (
		<Button radius="full" disableRipple={true} className={className} variant={variant} {...extra}>
			{children}
		</Button>
	);
}
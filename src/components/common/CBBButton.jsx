import React from "react";
import {Button} from "@nextui-org/react";

export default function CBBButton({children, variant = "bordered", ...extra}) {
	return (
		<Button radius="full" disableRipple={true} variant={variant} {...extra}>
			{children}
		</Button>
	);
}
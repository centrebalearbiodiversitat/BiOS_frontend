import React from "react";
import {Button} from "@nextui-org/react";

export default function CBBButton({children, ...extra}) {
	return (
		<Button radius="full" disableRipple={true} variant="bordered" {...extra}>
			{children}
		</Button>
	);
}
import React from "react";
import {Button} from "@nextui-org/react";

export default function CBBButton({children, ...params}) {
	return (
		<Button radius="full" disableRipple={true} variant="bordered" {...params}>
			{children}
		</Button>
	);
}
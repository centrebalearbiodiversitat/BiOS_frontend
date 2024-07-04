import React from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";

export default function LinkButton({href, children, ...extra}) {
	return (
		<Button href={href} radius="full" className="min-w-[150px] py-5" as={Link} {...extra}>
			{children}
		</Button>
	);
}
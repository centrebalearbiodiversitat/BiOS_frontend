import React from "react";
import {Button} from "@heroui/button";


/**
 * @typedef {import("@heroui/button").ButtonProps} ButtonProps
 */

/**
 * A custom styled HeroUI button.
 *
 * @param {ButtonProps & {
 *   variant?: string,
 *   extra?: {}
 * }} props - Props extending HeroUI ButtonProps with additional optional styling props.
 * @returns {JSX.Element} A styled HeroUI button component.
 */
export default function CBBButton({children, className, variant = "bordered", ...extra}) {
	return (
		<Button radius="full" disableRipple={true} className={className} variant={variant} {...extra}>
			{children}
		</Button>
	);
}
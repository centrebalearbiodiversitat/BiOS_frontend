import Link from "next/link";

export default function LinkWrapper({href, children, ...extra}) {
	if (href) {
		return (
			<Link href={href} {...extra}>
				{children}
			</Link>
		)
	} else {
		return children
	}
}
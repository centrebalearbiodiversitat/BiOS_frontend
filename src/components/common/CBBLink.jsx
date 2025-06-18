import Link from 'next/link';
import clsx from 'clsx'; // optional, for merging class names

/**
 * A custom styled Next.js link that supports all <a> tag props and Next.js Link props.
 *
 * @param className
 * @param {{ className?: string } & import('next/link').LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>} props
 * @returns {JSX.Element}
 */
export default function CBBLink({className, ...props}) {
	return (
		<Link className={clsx('link hover:underline transition', className)} {...props}/>
	);
}

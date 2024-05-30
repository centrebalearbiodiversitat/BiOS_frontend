'use client'

import {NextUIProvider} from '@nextui-org/react'

export default function Providers({children, className}) {
	return (
		<NextUIProvider className={className}>
			{children}
		</NextUIProvider>
	)
}
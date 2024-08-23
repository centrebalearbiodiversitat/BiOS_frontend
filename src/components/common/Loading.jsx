import React from "react";

export default function Loading({children, loading, className, width = '50px', height = null}) {
	if (loading === undefined ||
		(typeof loading === 'boolean' && loading) ||
		(Array.isArray(loading) && loading.some(element => element === undefined))
	) {
		return (
			<div className={`animate-pulse justify-center bg-slate-200 rounded-md ${className}`} style={{width, height}}/>
		)
	} else {
		return children;
	}
}
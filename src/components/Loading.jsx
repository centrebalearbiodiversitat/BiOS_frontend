import React from "react";

export default function Loading({children, loading, className, width = '50px', height = '50px'}) {
	if (loading) {
		// return <div className={`animate-pulse ${className ? "" : "w-[50px] h-[50px]"}`}/>
		return (
			<div className={`animate-pulse justify-center bg-slate-200 rounded-md ${className ? className : ""}`} style={{width, height}}>
				{/*<div className={` m-auto block`} />*/}
			</div>
		)
	} else {
		return children;
	}
}
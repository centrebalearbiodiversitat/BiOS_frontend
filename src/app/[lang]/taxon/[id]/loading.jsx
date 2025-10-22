import React from "react";
import Loading from "@/components/common/Loading";

export default function LoadingPage() {
	return (
		<div className="flex flex-col gap-4 rounded-xl overflow-hidden">
			<div className="animate-indeterminate-bar bg-primary h-px w-full"></div>
			<div className="flex flex-col grow gap-4 w-full h-screen">
				<div className="basis-2/6 w-full flex flex-row gap-4">
					<div className="basis-1/3">
						<Loading width="100%" height="100%"/>
					</div>
					<div className="basis-2/3">
						<Loading width="100%" height="100%"/>
					</div>
				</div>
				<div className="basis-4/6 w-full">
					<Loading width="100%" height="100%"/>
				</div>
			</div>
		</div>
	)
}
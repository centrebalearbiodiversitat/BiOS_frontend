import IUCN from "@/components/IUCN";
import NoData from "@/components/common/NoData";
import Loading from "@/components/common/Loading";

export default function IUCNCard({scopes}) {
	return (
		<NoData isDataAvailable={scopes}>
			<div className="divide-y xl:divide-y-0 sm:divide-x w-full m-auto h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
				<div className="col-span-1 sm:col-span-2 xl:col-span-1">
					<Loading loading={scopes}>
						<IUCN scope="global" status={scopes?.iucnGlobal} source={scopes?.sources[0]}/>
					</Loading>
				</div>
				<div className="col-span-1">
					<Loading loading={scopes} className="col-span-1">
						<IUCN scope="europe" status={scopes?.iucnEurope} source={scopes?.sources[0]}/>
					</Loading>
				</div>
				<div className="col-span-1">
					<Loading loading={scopes} className="col-span-1">
						<IUCN scope="mediterranean" status={scopes?.iucnMediterranean} source={scopes?.sources[0]}/>
					</Loading>
				</div>
			</div>
		</NoData>
	)
}
import IUCN from "@/components/IUCN";
import NoData from "@/components/common/NoData";
import Loading from "@/components/common/Loading";

export default function IUCNCard({scopes}) {
	return (
		<NoData isDataAvailable={scopes}>
			<div className="divide-y xl:divide-y-0 sm:divide-x w-full m-auto h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
				<div className="col-span-1 sm:col-span-2 xl:col-span-1">
					<Loading loading={scopes}>
						<IUCN title="taxon.overview.iucn_global" status={scopes?.iucnGlobal}/>
					</Loading>
				</div>
				<div className="col-span-1">
					<Loading loading={scopes} className="col-span-1">
						<IUCN title="taxon.overview.iucn_europe" status={scopes?.iucnEurope}/>
					</Loading>
				</div>
				<div className="col-span-1">
					<Loading loading={scopes} className="col-span-1">
						<IUCN title="taxon.overview.iucn_mediterranean" status={scopes?.iucnMediterranean}/>
					</Loading>
				</div>
			</div>
		</NoData>
	)
}
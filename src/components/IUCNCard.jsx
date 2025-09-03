import IUCN from "@/components/IUCN";
import NoData from "@/components/common/NoData";

export default function IUCNCard({lang, scopes}) {
	const scope_map = {
		global: null,
		europe: null,
		mediterranean: null,
	}

	for (const scope of scopes) {
		scope_map[scope.region] = scope;
	}

	return (
		<NoData lang={lang} isDataAvailable={scopes}>
			<div className="divide-y xl:divide-y-0 sm:divide-x w-full m-auto h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
				<div className="col-span-1 sm:col-span-2 xl:col-span-1">
					<IUCN scope="global" status={scope_map.global?.assessment} source={scope_map.global?.sources[0]}/>
				</div>
				<div className="col-span-1">
					<IUCN scope="europe" status={scope_map.europe?.assessment} source={scope_map.europe?.sources[0]}/>
				</div>
				<div className="col-span-1">
					<IUCN scope="mediterranean" status={scope_map.mediterranean?.assessment} source={scope_map.mediterranean?.sources[0]}/>
				</div>
			</div>
		</NoData>
	)
}
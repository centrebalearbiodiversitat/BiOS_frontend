import React from "react";
import Loading from "@/components/common/Loading";
import SubSection from "@/components/common/SubSection";
import {Divider} from "@nextui-org/react";


function Sequence({seq}) {
	const basis = seq.sources[0];

	return (
		<li className="flex flex-col gap-1 hover:bg-slate-50 py-4 border-b border-gray-200">
			{/*<p className="font-extralight">*/}
			{/*	{seq.definition}*/}
			{/*</p>*/}
			<div className="grid grid-cols-4 text-sm">
				<p>
					{basis.source?.name}
				</p>
				<p className="font-light">
					{basis.externalId}
				</p>
				<p>
					{seq.publishedDate ?? "-"}
				</p>
				<p>
					{seq.isolate ?? "-"}
				</p>
			</div>
			<div className="flex flex-wrap gap-2">
				{
					seq.markers.map(
						marker => (
							<p key={marker.id} className="rounded-full bg-black text-white text-sm px-3">
								{marker.name}
							</p>
						)
					)
				}
			</div>
		</li>
	)
}


export default function TaxonSequences({sequences}) {
	return (
		<Loading loading={sequences} width="100%" height="400px">
			<div className="grid grid-cols-4 font-semibold pb-4">
				<p>
					Source
				</p>
				<p>
					External ID
				</p>
				<p>
					Published date
				</p>
				<p>
					Isolate
				</p>
			</div>
			<ul className="flex flex-col">
				{sequences &&
					sequences.map(
						seq => <Sequence key={seq.id} seq={seq}/>
					)
				}
			</ul>
		</Loading>
	)
}
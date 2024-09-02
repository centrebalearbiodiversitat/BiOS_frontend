import React, {useMemo} from "react";
import Empty from "@/components/Empty";
import TaxonName from "@/components/common/TaxonName";
import LoadMore from "@/components/LoadMore";

export default function TaxonComposition({lang, composition}) {
	composition = composition || [];

	const compositionNorm = useMemo(() => {
		const totalSpecies = composition.reduce((acc, taxon) => acc + taxon.value, 0);

		return composition.map(taxon => ({
			total: totalSpecies,
			valueNorm: taxon.value * 100 / totalSpecies,
			valuePercent: (taxon.value * 100 / totalSpecies).toFixed(2),
			...taxon
		})).sort((a, b) => b.valueNorm - a.valueNorm);
	}, [composition]);

	return (
		<Empty isEmpty={composition.length === 0} lang={lang}>
		{composition &&
			<ul className="flex flex-col w-full gap-1">
				<LoadMore lang={lang} items={compositionNorm} overflow={true}>
					{
						taxon => (
							<li key={taxon.id} className={`flex flex-col py-0.5 rounded-full`}>
								<div className="text-black flex flex-row gap-3 basis-1/5 mx-1.5">
									<p className="  border-slate-200 flex justify-start text-sm w-full font-light items-center break-normal">
										<TaxonName taxon={{name: taxon.label, id: taxon.id}} />
									</p>
									<p className="container text-sm font-light text-end ">{taxon.valuePercent}%</p>
									{/*<p className="container text-end ">{taxon.value}</p>*/}
									{/*<p className="container text-end ">{taxon.total}</p>*/}
								</div>
								<div className="bg-white rounded-full w-full px-0.5 py-0.5 basis-4/5">
									<div className="h-full py-1 rounded-full bg-primary"
									     style={{width: `${taxon.valueNorm}%`}}/>
								</div>
							</li>
						)
					}
				</LoadMore>
			</ul>
		}
		</Empty>
	)
}
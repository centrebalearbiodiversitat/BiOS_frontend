import React, {useMemo} from "react";
import Empty from "@/components/Empty";
import TaxonName from "@/components/common/TaxonName";
import LoadMore from "@/components/LoadMore";

export default function TaxonPie({lang, composition}) {
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

	console.log(compositionNorm);

	return (
		<Empty isEmpty={!composition} lang={lang}>
		{composition &&
			// <PieChart skipAnimation={true} height={250}
		    //        series={[
			//            {
			// 	           innerRadius: 60,
			// 	           data: composition,
			// 	           // highlightScope: {faded: 'global', highlighted: 'item'},
			// 	           // faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
			//            },
		    //        ]}
		    //        slotProps={{
			//            legend: {
			// 	           // hidden: true
			// 	           hidden: composition.length > 16
			//            }
		    //        }}/>
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
								<div className="bg-white rounded-full w-full py-0.5 basis-4/5">
									<div className="h-full mx-0.5 py-1 rounded-full bg-primary"
									     style={{width: `${taxon.valueNorm}%`}}/>
								</div>
							</li>
						)
					}
				</LoadMore>
				{/*{*/}
				{/*	compositionNorm.map(*/}
				{/*		taxon => (*/}
				{/*			<li key={taxon.id} className={`flex flex-col py-0.5 rounded-full`}>*/}
				{/*				<div className="text-black flex flex-row gap-3 basis-1/5 mx-1.5">*/}
				{/*					<p className="  border-slate-200 flex justify-start text-sm w-full font-light items-center break-normal">*/}
				{/*						<TaxonName taxon={{name: taxon.label, id: taxon.id}} />*/}
				{/*					</p>*/}
				{/*					<p className="container text-sm font-light text-end ">{taxon.valuePercent}%</p>*/}
				{/*					/!*<p className="container text-end ">{taxon.value}</p>*!/*/}
				{/*					/!*<p className="container text-end ">{taxon.total}</p>*!/*/}
				{/*				</div>*/}
				{/*				<div className="bg-white rounded-full w-full py-0.5 basis-4/5">*/}
				{/*					<div className="h-full mx-0.5 py-1 rounded-full bg-primary"*/}
				{/*					     style={{width: `${taxon.valueNorm}%`}}/>*/}
				{/*				</div>*/}
				{/*			</li>*/}
				{/*		)*/}
				{/*	)*/}
				{/*}*/}
			</ul>
		}
		</Empty>
	)
}
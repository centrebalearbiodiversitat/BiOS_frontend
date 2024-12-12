import {Card, CardBody} from "@nextui-org/react";
import TaxonName from "@/components/common/TaxonName";
import Figure from "@/components/common/Figure";
import {t} from "@/i18n/i18n";
import {FaChevronRight} from "react-icons/fa";

export default function TaxonListCard({lang, taxon}) {

	return (
		<Card className="w-full shadow-none h-[180px]">
			<CardBody className="flex flex-row p-0">
				<div className="w-[300px] h-full overflow-hidden">
					<Figure alt={`Representative image of ${taxon.name}`}
					        className="rounded-lg h-full w-auto rounded-e-none"
					        images={taxon?.images}/>
				</div>
				<div className="p-6 flex flex-row border-2 border-slate-100 w-full rounded-e-xl">
					<div className="flex flex-col justify-center">
						<p className="first-letter:uppercase font-extralight text-3xl">
							{t(lang, `general.taxon_rank.${taxon.taxonRank}`)}
						</p>
						<TaxonName redirect={false} as="p" className="first-letter:uppercase font-normal text-3xl" taxon={taxon}/>
						{taxon.scientificNameAuthorship &&
							<p className="first-letter:uppercase font-normal text-xl">
								{taxon.scientificNameAuthorship}
							</p>
						}
					</div>
					<FaChevronRight className="ms-auto my-auto"/>
				</div>
			</CardBody>
		</Card>
	)
}
"use client"

import {Accordion, AccordionItem} from "@heroui/accordion";
import clsx from "clsx";
import {t} from "@/i18n/i18n";
import VerticalTaxonomy from "@/components/VerticalTaxonomy";

export function AccordionTaxonomy({lang, taxon, className, higherTaxonomy, descendants, synonyms, ...extra}) {
	return (
		<Accordion className={clsx(className, "!space-y-3")} {...extra}>
			<AccordionItem title={<h3 className="text-2xl font-extralight">{t(lang, 'taxon.sidebar.classification')}</h3>}
			               key="1" classNames={{trigger: "py-0"}}>
					{taxon && higherTaxonomy && <VerticalTaxonomy taxonomy={[...higherTaxonomy, taxon]} markLast={true}/>}
					<div className="mt-3">
						<h4 className="pt-2 text-lg font-extralight">{t(lang, 'taxon.sidebar.children')} ({descendants?.length ?? 0})</h4>
						{descendants && <VerticalTaxonomy overflow={true} taxonomy={descendants}/>}
					</div>
			</AccordionItem>
			<AccordionItem title={<h3 className="text-2xl font-extralight">{t(lang, 'taxon.sidebar.synonyms')} ({synonyms?.length ?? 0})</h3>}
			               key="3" classNames={{trigger: "py-0"}}>
				{synonyms && <VerticalTaxonomy title={`${t(lang, 'taxon.sidebar.synonyms')} (${synonyms.length})`}
				                   overflow={true} taxonomy={synonyms}/>}
			</AccordionItem>
		</Accordion>
	)
}
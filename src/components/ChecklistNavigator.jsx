"use client"

import React, {useEffect, useState} from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import TaxonName from "@/components/common/TaxonName";
import taxonomy, {children} from "@/API/taxonomy";


function RecursiveChecklistNav({checklist, updateChecklist, className}) {
	function fetchChildren(taxon, idx) {
		taxonomy.children(taxon.id).then(r => r && updateUpwards(r, idx))
	}

	function updateUpwards(r, idx) {
		console.log(r, idx)
		checklist[idx].children = r;
		updateChecklist([...checklist])
	}

	return (
		<Accordion isCompact selectionMode={"multiple"} className={className}>
			{
				checklist.map(
					(taxon, idx) => (
						<AccordionItem key={taxon.id} aria-label={`Accordion ${taxon.name}`}
						               onPress={e => !taxon.children && fetchChildren(taxon, idx)}
						               startContent={
							               <p className="font-light">
								               {taxon.taxonRank}
							               </p>
						               }
						               title={taxon.children ? `${taxon.name} (${taxon.children.length})` : `${taxon.name}`}>
							{taxon.children &&
								<RecursiveChecklistNav checklist={taxon.children}
						               className="border-gray-300 border-s-1 ps-4"
				                       updateChecklist={cl => updateUpwards(cl, idx)}/>
							}
						</AccordionItem>
					)
				)
			}
		</Accordion>
	)
}

export default function ChecklistNavigator({lang}) {
	const [checklist, setChecklist] = useState([]);

	useEffect(() => {
		taxonomy.search('Biota')
			.then(biota => setChecklist(biota))
	}, []);

	return (
		<RecursiveChecklistNav checklist={checklist} updateChecklist={cl => setChecklist([...cl])}/>
	);
}
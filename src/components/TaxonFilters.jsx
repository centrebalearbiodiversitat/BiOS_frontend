import {t} from "@/i18n/i18n";
import {RiParentFill} from "react-icons/ri";
import {Chip} from "@heroui/chip";
import {Divider} from "@heroui/divider";
import {Input} from "@heroui/input";
import TaxonName from "@/components/common/TaxonName";
import FullCBBSearchBar from "@/components/FullCBBSearchBar";
import {FaCamera, FaCheck, FaGavel, FaHighlighter, FaMapMarkerAlt} from "react-icons/fa";
import {TbHierarchy3} from "react-icons/tb";
import KeySelector from "@/components/common/KeySelector";
import CBBButton from "@/components/common/CBBButton";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import clsx from "clsx";
import {useLang} from "@/contexts/LangContext";
import {useRouter, useSearchParams} from "next/navigation";
import taxonomy from "@/API/taxonomy";
import {GiAlgae} from "react-icons/gi";
import SwitchButton from "@/components/common/SwitchButton";
import {Accordion, AccordionItem} from "@heroui/accordion";

const TAXON_RANKS = [
	{key: "kingdom", label: 'general.taxon_rank.kingdom'},
	{key: "phylum", label: 'general.taxon_rank.phylum'},
	{key: "class", label: 'general.taxon_rank.class'},
	{key: "order", label: 'general.taxon_rank.order'},
	{key: "family", label: 'general.taxon_rank.family'},
	{key: "genus", label: 'general.taxon_rank.genus'},
	{key: "species", label: 'general.taxon_rank.species'},
	{key: "subspecies", label: 'general.taxon_rank.subspecies'},
	{key: "variety", label: 'general.taxon_rank.variety'},
]

const TAXON_STATUS = [
	{key: true, label: 'general.taxonStatus.accepted'},
	{key: false, label: 'general.taxonStatus.synonym'},
]

const TAXON_IUCN = [
	{key: "EX", label: "components.iucn.EX"},
	{key: "EW", label: "components.iucn.EW"},
	{key: "CR", label: "components.iucn.CR"},
	{key: "EN", label: "components.iucn.EN"},
	{key: "VU", label: "components.iucn.VU"},
	{key: "NT", label: "components.iucn.NT"},
	{key: "LC", label: "components.iucn.LC"},
	{key: "DD", label: "components.iucn.DD"},
	{key: "NA", label: "components.iucn.NA"},
	{key: "NE", label: "components.iucn.NE"},
]

const HAS_IMAGE = [
	{key: true, label: 'taxon.list.aside.hasImage.value.withImages'},
	{key: false, label: 'taxon.list.aside.hasImage.value.noImages'},
]

const TAXON_DOE = [
	{key: 'unknown', label: "components.doe.unknown"},
	{key: 'doubtful', label: "components.doe.doubtful"},
	{key: 'absent', label: "components.doe.absent"},
	{key: 'native', label: "components.doe.native"},
	{key: 'endemic', label: "components.doe.endemic"},
	{key: 'captive', label: "components.doe.captive"},
	{key: 'cultivated', label: "components.doe.cultivated"},
	{key: 'released', label: "components.doe.released"},
	{key: 'failing', label: "components.doe.failing"},
	{key: 'casual', label: "components.doe.casual"},
	{key: 'reproducing', label: "components.doe.reproducing"},
	{key: 'established', label: "components.doe.established"},
	{key: 'colonising', label: "components.doe.colonising"},
	{key: 'invasive', label: "components.doe.invasive"},
	{key: 'widespreadInvasive', label: "components.doe.widespreadInvasive"},
]

function FilterLabel({lang, icon, label}) {
	const Icon = icon;

	return (
		<label className="font-extralight text-sm inline-flex gap-2 ps-1">
			<Icon className="text-gray-500 my-auto"/>
			{t(lang, label)}
		</label>
	)
}

function IUCNIcon({className}) {
	return (
		<span className={clsx("bg-gray-500 w-[14px] h-[14px] min-w-[14px] min-h-[14px] rounded-full rounded-tr-none", className)}></span>
	)
}

export default function TaxonFilters({className}) {
	const [lang, _] = useLang();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [ancestor, setAncestor] = useState();
	const qRef = useRef(null);

	useEffect(() => {
		const ancestorId = searchParams.get('ancestor')
		ancestorId ? taxonomy.get(ancestorId).then(r => {setAncestor(r)}) : setAncestor(null)
	}, [searchParams]);

	const generateSearchPath = useCallback((param= null, value = null) => {
		const params = new URLSearchParams(searchParams.toString());

		if (qRef.current.value)
			params.set('q', qRef.current.value);
		else
			params.delete('q');

		params.delete('page');

		if (param) {
			if (value === "" || value === undefined || value === null)
				params.delete(param);
			else
				params.set(param, value);
		}

		router.push(`?${params.toString()}`, { scroll: false })

		// handleScrollTop()
	}, [router, qRef, searchParams]);

	const ancestorSearch = useMemo(() => {
		return [
			{
				textKey: "components.searchbar.filter.taxonomy",
				onSelected: taxonId => generateSearchPath('ancestor', taxonId),
				onInput: e => taxonomy.search(e)
			}
		]
	}, [generateSearchPath])

	const handleSystem = useCallback((key, value) => {
		generateSearchPath(key, value ? value : null)
	}, [generateSearchPath]);

	return (
		<div className={clsx("bg-gray-50 rounded-2xl px-6 py-5 flex flex-col gap-4 border border-gray-200", className)}>
			<h3 className="text-2xl font-extralight text-start">
				{t(lang, "taxon.list.aside.title")}
			</h3>
			<form className="flex flex-col gap-6"
			      action={() => generateSearchPath()}>
				<CBBButton color="primary" onPress={() => generateSearchPath()} variant="solid"
				           type="submit" className="w-full col-span-full">
					{t(lang, 'taxon.list.aside.search')}
				</CBBButton>
				<div className="flex flex-col gap-5 pe-4">
					<hr className="col-span-full hidden lg:block"/>
					<div className="col-span-full">
						<FilterLabel lang={lang} label="taxon.list.aside.ancestor" icon={RiParentFill}/>
						{ancestor &&
							<div className="my-2 w-full">
								<Chip className="w-full max-w-none"
								      onClose={() => generateSearchPath('ancestor', null)}>
									<TaxonName taxon={ancestor} redirect={false}/>
								</Chip>
							</div>
						}
						<div className="rounded-full">
							<FullCBBSearchBar lang={lang} rounded={false} filters={ancestorSearch}
							                  showFilters={false}/>
						</div>
					</div>
					<div className="col-span-full">
						<FilterLabel lang={lang} label="taxon.list.search.term" icon={FaHighlighter}/>
						<Input ref={qRef} variant="bordered" type="text" autoComplete="off"
						       isClearable={true}
						       classNames={{label: "font-extralight", inputWrapper: "border border-gray-200"}}
						       labelPlacement="outside" onSubmit={() => generateSearchPath()}
						       placeholder={t(lang, "taxon.list.search.term.placeholder")}
						       defaultValue={searchParams.get('q')}/>
					</div>
					<hr className="col-span-full hidden lg:block"/>
					<Accordion className="col-span-full px-0" defaultExpandedKeys={searchParams.size > 0 && ["advanced_filters"]}>
						<AccordionItem classNames={{title: "font-extralight text-xl cursor-pointer", trigger: "py-0"}} key="advanced_filters"
						               title={t(lang, "components.header.button.advancedSearch")}>
							<div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
								<div>
									<FilterLabel lang={lang} label="taxon.list.aside.rankSelector" icon={TbHierarchy3}/>
									<KeySelector items={TAXON_RANKS} onSelected={r => generateSearchPath('rank', r)}
									             lang={lang} defaultValue={searchParams.get('rank')}
									             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}/>
								</div>
								<div>
									<FilterLabel lang={lang} label="taxon.list.aside.statusSelector" icon={FaCheck}/>
									<KeySelector items={TAXON_STATUS} lang={lang}
									             onSelected={s => generateSearchPath('accepted', s)}
									             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}
									             defaultValue={searchParams.get('accepted')}/>
								</div>
								<div>
									<FilterLabel lang={lang} label="taxon.list.aside.hasImage" icon={FaCamera}/>
									<KeySelector items={HAS_IMAGE} lang={lang}
									             onSelected={s => generateSearchPath('hasImage', s)}
									             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}
									             defaultValue={searchParams.get('hasImage')}/>
								</div>
								<div>
									<FilterLabel lang={lang} label="taxon.list.aside.doe" icon={FaMapMarkerAlt}/>
									<KeySelector items={TAXON_DOE} lang={lang}
									             onSelected={s => generateSearchPath('tag', s)}
									             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}
									             defaultValue={searchParams.get('tag')}/>
								</div>
								<div className="col-span-full">
									<FilterLabel lang={lang} label="taxon.list.aside.iucn.status" icon={IUCNIcon}/>
									<KeySelector items={TAXON_IUCN} lang={lang}
									             onSelected={s => generateSearchPath('assessment', s)}
									             placeHolder={t(lang, 'taxon.list.aside.defaultSelector')}
									             defaultValue={searchParams.get('assessment')}/>
								</div>
								<div className="col-span-full">
									<FilterLabel lang={lang} label="taxon.list.aside.directive" icon={FaGavel}/>
									<div className="flex flex-wrap gap-2">
										<SwitchButton label="components.directives.cites"
										              isPushed={searchParams.get('cites') === "true"}
										              onPush={s => handleSystem('cites', s)}/>
										<SwitchButton label="components.directives.lespre"
										              isPushed={searchParams.get('lespre') === "true"}
										              onPush={s => handleSystem('lespre', s)}/>
										<SwitchButton label="components.directives.ceea"
										              isPushed={searchParams.get('ceea') === "true"}
										              onPush={s => handleSystem('ceea', s)}/>
										<SwitchButton label="components.directives.directivaAves"
										              isPushed={searchParams.get('directivaAves') === "true"}
										              onPush={s => handleSystem('directivaAves', s)}/>
										<SwitchButton label="components.directives.directivaHabitats"
										              isPushed={searchParams.get('directivaHabitats') === "true"}
										              onPush={s => handleSystem('directivaHabitats', s)}/>
									</div>
								</div>
								<div className="col-span-full">
									<FilterLabel lang={lang} label="taxon.list.aside.system" icon={GiAlgae}/>
									<div className="flex flex-wrap gap-2">
										<SwitchButton label="component.system.marine"
										              isPushed={searchParams.get('marine') === "true"}
										              onPush={s => handleSystem('marine', s)}/>
										<SwitchButton label="component.system.terrestrial"
										              isPushed={searchParams.get('terrestrial') === "true"}
										              onPush={s => handleSystem('terrestrial', s)}/>
										<SwitchButton label="component.system.freshwater"
										              isPushed={searchParams.get('freshwater') === "true"}
										              onPush={s => handleSystem('freshwater', s)}/>
									</div>
								</div>
							</div>
						</AccordionItem>
					</Accordion>
				</div>
			</form>
		</div>
	)
}
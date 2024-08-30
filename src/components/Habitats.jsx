import React, {useMemo} from "react";
import {t} from "@/i18n/i18n";
import {
	FaBuilding,
	FaExclamationCircle,
	FaFish,
	FaMapMarkerAlt,
	FaQuestionCircle,
	FaSeedling, FaSun,
	FaTree,
	FaWater
} from "react-icons/fa";
import {GiFallingRocks, GiSharkFin, GiUndergroundCave, GiWaterfall, GiWaterSplash, GiWheat} from "react-icons/gi";
import Empty from "@/components/Empty";

const HABITAT_ICONS = {
	'taxon.overview.habitat_1': {group: 'forest', color: "#16a34a"},
	'taxon.overview.habitat_2': {group: 'savanna', color: "#f59e0b"},
	'taxon.overview.habitat_3': {group: 'grassland', color: "#22c55e"},
	'taxon.overview.habitat_4': {group: 'grassland', color: "#4adea0"},
	'taxon.overview.habitat_5': {group: 'wetland', color: "#38bdf8"},
	'taxon.overview.habitat_6': {group: 'rocky', color: "#525252"},
	'taxon.overview.habitat_7': {group: 'caves', color: "#1f2937"},
	'taxon.overview.habitat_8': {group: 'desert', color: "#ca8a04"},
	'taxon.overview.habitat_9': {group: 'marine', color: "#14b8a6"},
	'taxon.overview.habitat_10': {group: 'marine', color: "#2563eb"},
	'taxon.overview.habitat_11': {group: 'marine', color: "#1e3a8a"},
	'taxon.overview.habitat_12': {group: 'marine', color: "#3b82f6"},
	'taxon.overview.habitat_13': {group: 'marine', color: "#4f46e5"},
	'taxon.overview.habitat_14': {group: 'artificial', color: "#374151"},
	'taxon.overview.habitat_15': {group: 'artificial', color: "#68c4f1"},
	'taxon.overview.habitat_16': {group: 'grassland', color: "#86efac"},
	'taxon.overview.habitat_17': {group: 'other', color: "#f59e0b"},
	'taxon.overview.habitat_18': {group: 'other', color: "#9ca3af"},
};

const HABITAT_GROUPS = {
	marine: {icon: <FaWater/>, color: "#3b82f6"},
	wetland: {icon: <GiWaterfall/>, color: "#3DBBCC"},
	forest: {icon: <FaTree/>, color: "#16a34a"},
	grassland: {icon: <FaSeedling/>, color: "#94C635"},
	savanna: {icon: <GiWheat/>, color: "#f59e0b"},
	desert: {icon: <FaSun/>, color: "#ca8a04"},
	rocky: {icon: <GiFallingRocks/>, color: "#885000"},
	caves: {icon: <GiUndergroundCave/>, color: "#000000"},
	artificial: {icon: <FaBuilding/>, color: "#776f6f"},
	other: {icon: <FaQuestionCircle/>, color: "#b6b6b6"},
}

const HABITAT_MOCKUP = [
	{sources: [{originId: 1}]},
	{sources: [{originId: 2}]},
	{sources: [{originId: 3}]},
	{sources: [{originId: 4}]},
	{sources: [{originId: 5}]},
	{sources: [{originId: 6}]},
	{sources: [{originId: 7}]},
	{sources: [{originId: 8}]},
	{sources: [{originId: 9}]},
	{sources: [{originId: 10}]},
	{sources: [{originId: 11}]},
	{sources: [{originId: 12}]},
	{sources: [{originId: 13}]},
	{sources: [{originId: 14}]},
	{sources: [{originId: 15}]},
	{sources: [{originId: 16}]},
	{sources: [{originId: 17}]},
	{sources: [{originId: 18}]},
]

export default function Habitats({habitats, lang}) {
	habitats = habitats || [];
	// habitats = HABITAT_MOCKUP;

	const habitatStyles = useMemo(() => {
		return habitats.map(habitat => {
			const habitatKey = `taxon.overview.habitat_${habitat.sources[0].originId}`;

			return {
				habitatKey: habitatKey,
				...HABITAT_ICONS[habitatKey]
			}
		})
	}, [habitats]);

	const habitatGroupsEnabled = useMemo(() => {
		const groups = {};

		habitatStyles.forEach((habitat) => {
			groups[habitat.group] = true;
		});

		return groups;
	}, [habitatStyles]);

	return (
		<Empty isEmpty={habitats.length === 0} lang={lang}>
			<ul className="rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 m-auto py-5">
				{habitatStyles?.map((habitatStyle) => (
					<li key={habitatStyle.habitatKey} className="bg-white rounded-xl p-2 flex border-1 border-slate-200"
					    style={{
							 // border: `2px solid ${HABITAT_GROUPS[habitatStyle.group].color}44`,
					    }}>
						<div className="rounded-full text-lg flex justify-center items-center min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] relative -left-3 -top-5 -mx-3"
						     style={{
								 color: "white",
								 backgroundColor: HABITAT_GROUPS[habitatStyle.group].color,
						}}>
							{HABITAT_GROUPS[habitatStyle.group].icon}
						</div>
						<p className="w-full text-medium m-auto text-pretty text-center font-light ">
							{t(lang, habitatStyle.habitatKey)}
						</p>
					</li>
				))}
			</ul>
		</Empty>
	)
}
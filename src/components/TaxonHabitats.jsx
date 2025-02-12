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
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import {useLang} from "@/contexts/LangContext";

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
	{sources: [{externalId: 1}]},
	{sources: [{externalId: 2}]},
	{sources: [{externalId: 3}]},
	{sources: [{externalId: 4}]},
	{sources: [{externalId: 5}]},
	{sources: [{externalId: 6}]},
	{sources: [{externalId: 7}]},
	{sources: [{externalId: 8}]},
	{sources: [{externalId: 9}]},
	{sources: [{externalId: 10}]},
	{sources: [{externalId: 11}]},
	{sources: [{externalId: 12}]},
	{sources: [{externalId: 13}]},
	{sources: [{externalId: 14}]},
	{sources: [{externalId: 15}]},
	{sources: [{externalId: 16}]},
	{sources: [{externalId: 17}]},
	{sources: [{externalId: 18}]},
]

export default function TaxonHabitats({habitats}) {
	const [lang, _] = useLang();

	const isLoading = habitats === undefined;
	const noData = habitats === null;
	habitats = isLoading || noData ? HABITAT_MOCKUP.slice(0, 3) : habitats;
	// habitats = HABITAT_MOCKUP;

	const habitatStyles = useMemo(() => {
		return habitats.map(habitat => {
			const habitatKey = `taxon.overview.habitat_${habitat.sources[0].externalId}`;

			return {
				habitatKey: habitatKey,
				...HABITAT_ICONS[habitatKey]
			}
		})
	}, [habitats]);

	return (
			<NoData isDataAvailable={!noData}>
				<ul className="rounded-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 m-auto">
					{habitatStyles?.map((habitatStyle) => (
						<Loading key={habitatStyle.habitatKey} loading={isLoading} width="100%" height={280}>
							<HabitatCard lang={lang} hStyle={habitatStyle} group={HABITAT_GROUPS[habitatStyle.group]}/>
						</Loading>
					))}
				</ul>
			</NoData>
	)
}

function HabitatCard({hStyle, group, lang}) {
	return (
		<li className="space-y-6 rounded-xl p-8 border" style={{
		     borderColor: `${group.color}10`,
		     backgroundColor: `${group.color}10`,

		}}>
			<div className="rounded-full w-[50px] text-2xl flex justify-center border items-center aspect-square"
			     style={{
					color: group.color,
					borderColor: `${group.color}20`,
					backgroundColor: "white",
			     }}>
				{group.icon}
			</div>
			<div className="space-y-1">
				<p className="min-h-[1.5lh] w-full font-light text-3xl">
					{t(lang, hStyle.habitatKey)}
				</p>
				<p className="min-h-[4lh] w-full h-full text-medium m-auto text-pretty font-light">
					{t(lang, `${hStyle.habitatKey}.description`)}
				</p>
			</div>
		</li>
	)
}
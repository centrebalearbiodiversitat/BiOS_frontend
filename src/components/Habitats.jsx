import React from "react";
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
import {GiFallingRocks, GiSharkFin, GiUndergroundCave, GiWaterSplash, GiWheat} from "react-icons/gi";
import Empty from "@/components/Empty";

const HABITAT_ICONS = {
	'taxon.overview.habitat_1': {icon: <FaTree/>, color: "#16a34a"},
	'taxon.overview.habitat_2': {icon: <GiWheat/>, color: "#f59e0b"},
	'taxon.overview.habitat_3': {icon: <FaSeedling/>, color: "#22c55e"},
	'taxon.overview.habitat_4': {icon: <FaSeedling/>, color: "#4ade80"},
	'taxon.overview.habitat_5': {icon: <FaWater/>, color: "#38bdf8"},
	'taxon.overview.habitat_6': {icon: <GiFallingRocks/>, color: "#525252"},
	'taxon.overview.habitat_7': {icon: <GiUndergroundCave/>, color: "#1f2937"},
	'taxon.overview.habitat_8': {icon: <FaSun/>, color: "#ca8a04"},
	'taxon.overview.habitat_9': {icon: <FaFish/>, color: "#14b8a6"},
	'taxon.overview.habitat_10': {icon: <GiSharkFin/>, color: "#2563eb"},
	'taxon.overview.habitat_11': {icon: <FaFish/>, color: "#1e3a8a"},
	'taxon.overview.habitat_12': {icon: <GiWaterSplash/>, color: "#3b82f6"},
	'taxon.overview.habitat_13': {icon: <FaMapMarkerAlt/>, color: "#4f46e5"},
	'taxon.overview.habitat_14': {icon: <FaBuilding/>, color: "#374151"},
	'taxon.overview.habitat_15': {icon: <FaWater/>, color: "#7dd3fc"},
	'taxon.overview.habitat_16': {icon: <FaSeedling/>, color: "#86efac"},
	'taxon.overview.habitat_17': {icon: <FaExclamationCircle/>, color: "#f59e0b"},
	'taxon.overview.habitat_18': {icon: <FaQuestionCircle/>, color: "#9ca3af"},
};

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

	return (
		<Empty isEmpty={!habitats} lang={lang}>
			<ul className="m-5 capitalize grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
				{habitats?.map((habitat) => {
					const habitatKey = `taxon.overview.habitat_${habitat.sources[0].originId}`;
					const habitatStyle = HABITAT_ICONS[habitatKey];

					return (
						<li key={habitatKey}
							className="flex items-center p-3 rounded-lg shadow-sm"
							style={{color: habitatStyle.color, backgroundColor: `${habitatStyle.color}1A`}}>
							<span className="text-2xl mx-2">{habitatStyle.icon}</span>
							<p className="flex-1 text-center">{t(lang, habitatKey)}</p>
						</li>
					);
				})}
			</ul>
		</Empty>
	)
}
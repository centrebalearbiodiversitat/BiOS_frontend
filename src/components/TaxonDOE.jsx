import React from "react";
import {t} from "@/i18n/i18n";
import clsx from "clsx";
import Loading from "@/components/common/Loading";
import {
	AiOutlineCheckCircle, AiOutlineWarning,
	AiOutlineCloseCircle, AiOutlineEnvironment,
	AiOutlineGlobal, AiOutlineHome, AiOutlineLock,
	AiOutlineQuestionCircle, AiOutlineSmile, AiOutlineSync,
} from "react-icons/ai";
import {BiSolidInvader} from "react-icons/bi";
import {GiFlowerPot, GiShoonerSailboat} from "react-icons/gi";
import {RiCloseLargeFill} from "react-icons/ri";
import {MdForest} from "react-icons/md";
import {useLang} from "@/contexts/LangContext";

const DOE_DEFINITIONS = {
	"unknown": { "color": "#cfd8dc", "icon": <AiOutlineQuestionCircle/>, "text": "components.doe.unknown"},
	"doubtful": { "color": "#fbd86a", "icon": <AiOutlineWarning/>, "text": "components.doe.doubtful"},
	"absent": { "color": "#ef9a9a", "icon": <AiOutlineCloseCircle/>, "text": "components.doe.absent"},
	"native": { "color": "#a5d6a7", "icon": <AiOutlineHome/>, "text": "components.doe.native"},
	"endemic": { "color": "#81c784", "icon": <AiOutlineEnvironment/>, "text": "components.doe.endemic"},
	"captive": { "color": "#c1c1c1", "icon": <AiOutlineLock/>, "text": "components.doe.captive"},
	"cultivated": { "color": "#ecb563", "icon": <GiFlowerPot/>, "text": "components.doe.cultivated"},
	"released": { "color": "#82ea6d", "icon": <MdForest/>, "text": "components.doe.released"},
	"failing": { "color": "#ef4c5f", "icon": <RiCloseLargeFill/>, "text": "components.doe.failing"},
	"casual": { "color": "#e6d837", "icon": <AiOutlineSmile/>, "text": "components.doe.casual"},
	"reproducing": { "color": "#b2dfdb", "icon": <AiOutlineSync/>, "text": "components.doe.reproducing"},
	"established": { "color": "#88cc8b", "icon": <AiOutlineCheckCircle/>, "text": "components.doe.established"},
	"colonising": { "color": "#a98de4", "icon": <GiShoonerSailboat/>, "text": "components.doe.colonising"},
	"invasive": { "color": "#f37070", "icon": <BiSolidInvader/>, "text": "components.doe.invasive"},
	"widespreadInvasive": { "color": "#d32f2f", "icon": <AiOutlineGlobal/>, "text": "components.doe.widespreadInvasive"},
}

export default function TaxonDOE({doe, className}) {
	const [lang, _] = useLang();

	const doeDef = DOE_DEFINITIONS[doe ?  doe?.tag?.name : "unknown"]
	// var doeDef = DOE_DEFINITIONS["unknown"]
	// var doeDef = DOE_DEFINITIONS["doubtful"]
	// var doeDef = DOE_DEFINITIONS["absent"]
	// var doeDef = DOE_DEFINITIONS["native"]
	// var doeDef = DOE_DEFINITIONS["endemic"]
	// var doeDef = DOE_DEFINITIONS["captive"]
	// var doeDef = DOE_DEFINITIONS["cultivated"]
	// var doeDef = DOE_DEFINITIONS["released"]
	// var doeDef = DOE_DEFINITIONS["failing"]
	// var doeDef = DOE_DEFINITIONS["casual"]
	// var doeDef = DOE_DEFINITIONS["reproducing"]
	// var doeDef = DOE_DEFINITIONS["established"]
	// var doeDef = DOE_DEFINITIONS["colonising"]
	// var doeDef = DOE_DEFINITIONS["invasive"]
	// var doeDef = DOE_DEFINITIONS["widespreadInvasive"]

	return (
		<Loading loading={!doeDef} width="100%" height="100%">
			<div className="p-6 flex flex-col w-full h-full">
				<div className="flex flex-row">
					<p className="rounded-full p-1.5 text-2xl border"
					   style={{color: doeDef.color, borderColor: doeDef.color, backgroundColor: doeDef.color + "10"}}>
						{doeDef.icon}
					</p>
				</div>
				<div className="flex-grow flex justify-center items-center py-6">
					<p className="text-2xl font-extralight justify-center align-middle text-center">
						{t(lang, doeDef.text)}
					</p>
				</div>
				<p className="w-full text-end text-sm block">
					{t(lang, "components.doe")}
					{doe?.sources &&
						<span className="text-xs block text-gray-500 text-pretty">
							{t(lang, "components.doe.source")}
							{doe?.sources.map(
								s => s.source.name
							)}
						</span>
					}
				</p>
			</div>
		</Loading>
	)
}
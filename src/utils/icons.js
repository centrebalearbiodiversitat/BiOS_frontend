import React from "react";

import {FaBook, FaDatabase, FaFile, FaGlobe, FaLandmark, FaUser} from "react-icons/fa";
import {RiArticleFill} from "react-icons/ri";
import {defaultDict} from "@/utils/utils";

const BASIS_TYPE = {
	"database": () => <FaDatabase/>,
	"journal_article": () => <RiArticleFill/>,
	"book": () => <FaBook/>,
	"web_page": () => <FaGlobe/>,
	"document": () => <FaFile/>,
	"expert": () => <FaUser/>,
	"museum": () => <FaLandmark/>,
}

export const ICON_BASIS_TYPE = defaultDict(
	BASIS_TYPE,
	() => <FaDatabase/>
)
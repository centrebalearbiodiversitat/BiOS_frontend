const requests = require("@/API/requests");

const GENETICS_PATH = '/genetics'

function listMarkers(taxonomy, inGeographyScope) {
	return requests.GET(`${GENETICS_PATH}/marker/list`, {taxonomy, inGeographyScope})
}

function listSequences(taxonomy, marker, inGeographyScope) {
	return requests.GET(`${GENETICS_PATH}/sequence/list`, {taxonomy, marker, inGeographyScope});
}

function listCountSequences(taxonomy) {
	return requests.GET(`${GENETICS_PATH}/sequence/list/count`, {taxonomy})
}

module.exports = {
	listMarkers,
	listSequences,
	listCountSequences,
}
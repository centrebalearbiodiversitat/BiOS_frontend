const requests = require("@/API/requests");

const GENETICS_PATH = '/genetics'

function listMarkers(taxonomy) {
	return requests.GET(`${GENETICS_PATH}/marker/list`, {taxonomy})
}

function listSequences(taxonomy, marker) {
	return requests.GET(`${GENETICS_PATH}/sequence/list`, {taxonomy, marker});
}

function listCountSequences(taxonomy) {
	return requests.GET(`${GENETICS_PATH}/sequence/list/count`, {taxonomy})
}

module.exports = {
	listMarkers,
	listSequences,
	listCountSequences,
}
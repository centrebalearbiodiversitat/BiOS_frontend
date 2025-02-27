const requests = require("@/API/requests");

const GENETICS_PATH = '/genetics'

function getMarker(id) {
	return requests.GET(`${GENETICS_PATH}/marker`, {id})
}

function listMarkers(taxonomy, params = {}) {
	return requests.GET(`${GENETICS_PATH}/marker/list`, {taxonomy, ...params})
}

function listSequences(taxonomy, marker, inGeographyScope, page) {
	return requests.GET(`${GENETICS_PATH}/sequence/list`, {taxonomy, marker, inGeographyScope, page});
}

function listCountSequences(taxonomy, params= {}) {
	return requests.GET(`${GENETICS_PATH}/sequence/list/count`, {taxonomy, ...params})
}

async function listSequenceDownload(id, params = {}) {
	return requests.URL(`${GENETICS_PATH}/sequence/list/csv`, {taxonomy: id, ...params})
}

module.exports = {
	getMarker,
	listMarkers,
	listSequences,
	listCountSequences,
	listSequenceDownload,
}
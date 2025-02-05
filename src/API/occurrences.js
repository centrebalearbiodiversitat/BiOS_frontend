const requests = require("@/API/requests");

const OCCURRENCES_PATH = '/occurrences'

function get(id) {
	return requests.GET(`${OCCURRENCES_PATH}`, {id})
}

function list(taxonomyId, geographicalLocationId, hasSequence) {
	return requests.GET(
		`${OCCURRENCES_PATH}/list`,
		{
			taxonomy: taxonomyId,
			hasSequence: hasSequence,
			geographicalLocation: geographicalLocationId ? geographicalLocationId : '',
		}
	)
}

async function listDownload(id) {
	return requests.URL(`${OCCURRENCES_PATH}/list/download`, {taxonomy: id})
}

function listCount(taxonomyId, geographicalLocationId) {
	return requests.GET(
		`${OCCURRENCES_PATH}/list/count`,
		{
			taxonomy: taxonomyId,
			geographicalLocation: geographicalLocationId ? geographicalLocationId : ''
		}
	)
}

function statsByMonth(taxonomy) {
	return requests.GET(`${OCCURRENCES_PATH}/stats/month`, {taxonomy})
}

function statsByYear(taxonomy) {
	return requests.GET(`${OCCURRENCES_PATH}/stats/year`, {taxonomy})
}

function statsBySource(taxonomy) {
	return requests.GET(`${OCCURRENCES_PATH}/stats/source`, {taxonomy})
}

module.exports = {
	get,
	list,
	listDownload,
	listCount,
	statsByMonth,
	statsByYear,
	statsBySource,
}
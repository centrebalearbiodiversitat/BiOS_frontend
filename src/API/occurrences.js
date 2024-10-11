const requests = require("@/API/requests");

const OCCURRENCES_PATH = '/occurrences'

function get(id) {
	return requests.GET(`${OCCURRENCES_PATH}`, {id})
}

function list(taxonomyId, geographicalLocationId) {
	return requests.GET(
		`${OCCURRENCES_PATH}/list`,
		{
			taxonomy: taxonomyId,
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
			geographicalLocation: geographicalLocationId ? geographicalLocationId : '',
		}
	)
}

module.exports = {
	get,
	list,
	listDownload,
	listCount,
}
const requests = require("@/API/requests");

const OCCURRENCES_PATH = '/occurrences'

function get(id) {
	return requests.GET(`${OCCURRENCES_PATH}`, {id})
}

function list(taxonomyId, geographicalLocationId) {
	return requests.GET(
		`${OCCURRENCES_PATH}/list`,
		{taxonomy: taxonomyId, geographicalLocation: geographicalLocationId}
	)
}

module.exports = {
	get,
	list,
}
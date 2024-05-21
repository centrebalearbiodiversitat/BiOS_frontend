const requests = require("@/API/requests");

const OCCURRENCES_PATH = '/occurrences'

function get(id) {
	return requests.GET(`${OCCURRENCES_PATH}`, {id})
}

function list(taxonomy, geographicalLocation) {
	return requests.GET(`${OCCURRENCES_PATH}/list`, {taxonomy, geographicalLocation})
}

module.exports = {
	get,
	list,
}
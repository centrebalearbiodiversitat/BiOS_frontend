const requests = require("@/API/requests");

const GEOGRAPHY_PATH = '/geography'

async function search(name) {
	if (name) {
		return requests.GET(`${GEOGRAPHY_PATH}/search`, {name})
	} else {
		return []
	}
}

function get(id) {
	return requests.GET(`${GEOGRAPHY_PATH}/level`, {id})
}

module.exports = {
	search,
	get,
}

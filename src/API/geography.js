const requests = require("@/API/requests");

const GEOGRAPHY_PATH = '/geography'

function list() {
	return requests.GET(`${GEOGRAPHY_PATH}/list`)
}

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
	list,
	search,
	get,
}

const requests = require("@/API/requests");

const VERSIONING_PATH = '/versioning'

function list() {
	return requests.GET(`${VERSIONING_PATH}/source/list`)
}

async function search(name) {
	if (name) {
		return requests.GET(`${VERSIONING_PATH}/search`, {name})
	} else {
		return []
	}
}

function get(id) {
	return requests.GET(`${VERSIONING_PATH}`, {id})
}

module.exports = {
	list,
	search,
	get,
}

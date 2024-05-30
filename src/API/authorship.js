const requests = require("@/API/requests");

const AUTHORSHIP_PATH = '/taxonomy/authorship'

function list() {
	return requests.GET(`${AUTHORSHIP_PATH}/list`)
}

function search(name) {
	return requests.GET(`${AUTHORSHIP_PATH}/search`, {name})
}

function get(id) {
	return requests.GET(`${AUTHORSHIP_PATH}`, {id})
}

module.exports = {
	list,
	search,
	get,
}

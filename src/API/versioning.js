const requests = require("@/API/requests");

const VERSIONING_PATH = '/versioning'

function getBasis(id) {
	return requests.GET(`${VERSIONING_PATH}/basis`, {id})
}

function basisStats(id) {
	return requests.GET(`${VERSIONING_PATH}/basis/statistics`, {id})
}

function basisList(type) {
	return requests.GET(`${VERSIONING_PATH}/basis/list`, {type})
}

function sourceList() {
	return requests.GET(`${VERSIONING_PATH}/source/list`)
}

async function search(name) {
	if (name) {
		return requests.GET(`${VERSIONING_PATH}/search`, {name})
	} else {
		return []
	}
}

module.exports = {
	getBasis,
	basisList,
	sourceList,
	basisStats,
	search,
}

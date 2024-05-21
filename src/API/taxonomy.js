const requests = require("@/API/requests");

const TAXONOMY_PATH = '/taxonomy'

function list() {
	return requests.GET(`${TAXONOMY_PATH}/list`)
}

function search(name) {
	return requests.GET(`${TAXONOMY_PATH}/search`, {name})
}

function taxon(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon`, {id})
}

function parent(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/parent`, {id})
}

function children(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/children`, {id})
}

module.exports = {
	list,
	search,
	taxon,
	parent,
	children,
}
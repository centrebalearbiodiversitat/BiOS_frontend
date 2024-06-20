const requests = require("@/API/requests");

const TAXONOMY_PATH = '/taxonomy'

function list() {
	return requests.GET(`${TAXONOMY_PATH}/list`)
}

function search(name) {
	return requests.GET(`${TAXONOMY_PATH}/search`, {name})
}

function get(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon`, {id})
}

function parent(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/parent`, {id})
}

function children(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/children`, {id})
}

function synonyms(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/synonyms`, {id})
}

function sources(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/sources`, {id})
}

module.exports = {
	list,
	search,
	get,
	parent,
	children,
	synonyms,
	sources,
}
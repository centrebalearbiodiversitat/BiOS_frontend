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

function childrenCount(id, childrenRank = null) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/children/count`, {id, childrenRank})
}

function composition(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/composition`, {id})
}

function synonyms(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/synonyms`, {id})
}

function sources(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/sources`, {id})
}

async function checklist(id) {
	return requests.URL(`${TAXONOMY_PATH}/taxon/checklist`, {id})
}

module.exports = {
	list,
	search,
	get,
	parent,
	children,
	childrenCount,
	composition,
	synonyms,
	sources,
	checklist,
}
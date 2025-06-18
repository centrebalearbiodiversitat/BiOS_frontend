const requests = require("@/API/requests");

const TAXONOMY_PATH = '/taxonomy'

function list(params) {
	return requests.GET(`${TAXONOMY_PATH}/list`, params)
}

function search(name, exact = false) {
	if (name) {
		return requests.GET(`${TAXONOMY_PATH}/search`, {name, exact});
	} else {
		return Promise.resolve([]);
	}
}

function get(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon`, {id})
}

function parent(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/parent`, {id})
}

function children(id, accepted_only) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/children`, {id, accepted_only})
}

function childrenCount(id, childrenRank = null, acceptedOnly = true) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/children/count`, {id, childrenRank, acceptedOnly})
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

function checklist(id) {
	return requests.URL(`${TAXONOMY_PATH}/taxon/checklist`, {id})
}

function listExport(params) {
	return requests.URL(`${TAXONOMY_PATH}/list/csv`, params)
}

function descendantCount(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/descendants/count`, {id})
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
	listExport,
	descendantCount,
}
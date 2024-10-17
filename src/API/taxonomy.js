const requests = require("@/API/requests");

const TAXONOMY_PATH = '/taxonomy'

function list() {
	return requests.GET(`${TAXONOMY_PATH}/list`)
}

async function search(name, exact = false) {
	if (name) {
		return requests.GET(`${TAXONOMY_PATH}/search`, {name, exact})
	} else {
		return []
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

async function taxonData(taxonomy) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/data`, {taxonomy})
}

async function descendantCount(id) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/descendants/count`, {id})
}

async function habitats(taxonomy) {
	return requests.GET(`${TAXONOMY_PATH}/taxon/data/habitats`, {taxonomy})
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
	taxonData,
	descendantCount,
	habitats,
}
const requests = require("@/API/requests");

const API_PATH = '/tags'

function listTagsByTaxon(id) {
	return requests.GET(`${API_PATH}`, {taxonomy: id})
}

function listDirectives(id) {
	return requests.GET(`${API_PATH}/directives`, {taxonomy: id})
}

function listSystem(id) {
	return requests.GET(`${API_PATH}/system`, {taxonomy: id})
}

function listHabitats(id) {
	return requests.GET(`${API_PATH}/habitats`, {taxonomy: id})
}

function taxonIUCN(taxonomy) {
	return requests.GET(`${API_PATH}/iucn`, {taxonomy})
}

module.exports = {
	listTagsByTaxon,
	listDirectives,
	listSystem,
	listHabitats,
	taxonIUCN,
}

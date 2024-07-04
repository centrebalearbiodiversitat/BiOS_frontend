const requests = require("@/API/requests");

const GENETICS_PATH = '/genetics'
const SEQUENCES_PATH = `${GENETICS_PATH}/sequence`
const GENES_PATH = `${GENETICS_PATH}/gene`

function listGenes(taxonomy) {
	return requests.GET(`${GENES_PATH}/list`, {taxonomy})
}

function listSequences(taxonomy) {
	return requests.GET(`${SEQUENCES_PATH}/list`, {taxonomy})
}

module.exports = {
	listGenes,
	listSequences,
}
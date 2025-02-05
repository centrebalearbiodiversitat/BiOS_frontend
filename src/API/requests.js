"use client"

function request(method) {
	return (path, params = null, body = null) => {
		const requestOptions = {
			method,
			headers: authHeader(),
			// cache: 'no-store',
		};
		const url = new URL(`${process.env.API_BASE_URL}${process.env.API_PATH}${path}`);

		if (params)
			Object.keys(params).forEach(key => {
				if (params[key] !== null && params[key] !== undefined) {
					url.searchParams.append(key, params[key])
				}
			});

		if (body)
			requestOptions.body = JSON.stringify(body);

		if (method === 'URL')
			return url

		return fetch(url, requestOptions).then(handleResponse)
	}
}

// helper functions

function authHeader() {
	// const token = getSessionToken();
	const heads = {
		'accept': 'application/json',
		'content-Type': 'application/json',
	}
	// if (token !== null) {
	//     heads['Authorization'] = `Token ${token}`
	// }

	return heads;
}

async function handleResponse(response) {
	const isJson = response.headers?.get('content-type')?.includes('application/json');
	const data = isJson ? await response.json() : null;

	// check for error response
	if (!response.ok) {
		// if ([401, 403].includes(response.status)) {
		// 	// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
		// 	deleteSessionToken()
		// }

		// get error message from body or default to response status
		if (400 <= response.status && response.status < 500) {
			return null;
		} else {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
	}

	return data;
}

module.exports = {
	GET: request('GET'),
	POST: request('POST'),
	PUT: request('PUT'),
	DELETE: request('DELETE'),
	URL: request('URL')
}
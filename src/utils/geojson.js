
export function occurrencesToGeoJson(occurrences) {
	return {
		type: "FeatureCollection",
		crs: {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
		features: occurrences.map(
			occurrence => {
				return {
					id: occurrence.id,
					properties: occurrence,
					geometry: {
						type: "Point",
						coordinates: [
							occurrence.decimalLongitude,
							occurrence.decimalLatitude
						]
					}
				}
			}
		)
	}
}
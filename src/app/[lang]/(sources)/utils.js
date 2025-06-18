export function groupByKey(sources, key, groupKey, unique = false) {
	const groups = groupKey.reduce((acc, key) => {
		acc[key] = [];

		return acc;
	}, {});

	sources?.forEach(source => {
		if (groups.hasOwnProperty(source[key]))
			if (unique) {
				groups[source[key]].push(source);
			} else {
				groups[source[key]].push(source);
			}
	});

	return groups;
}
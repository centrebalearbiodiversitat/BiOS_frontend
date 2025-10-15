'use client';

import {useState, useEffect} from 'react';

export function useLocalStorageState(key, initialValue, defaultValue= false) {
	const [value, setValue] = useState(() => {
		if (typeof window === 'undefined') return initialValue;
		const saved = localStorage.getItem(key);
		return saved !== null ? saved === 'true' : defaultValue;
	});

	useEffect(() => {
		localStorage.setItem(key, String(value));
	}, [key, value]);

	return [value, setValue];
}

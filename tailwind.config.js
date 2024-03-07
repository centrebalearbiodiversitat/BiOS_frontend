import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: '#8cc47b',
				secondary: '#ec8c54',
				accent: '#34bccc',
				neutral: '#edf2ee',
				dark: '#1F2937',
				light: '#F5F7FA',
			}
		},
	},
	plugins: [nextui()],
};

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
		API_PATH: process.env.API_PATH,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	reactStrictMode: true
};

export default nextConfig;

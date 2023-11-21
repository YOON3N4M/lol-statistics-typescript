/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: false,
	env: {
		API_KEY: process.env.NEXT_PUBLIC_API_KEY,
		AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
		PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
		STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
		MESSAGING_ID: process.env.NEXT_PUBLIC_MESSAGING_ID,
		APP_ID: process.env.NEXT_PUBLIC_APP_ID,
		RIOT_API_KEY: process.env.NEXT_PUBLIC_RIOT_API_KEY,
	},
	compiler: {
		styledComponents: true,
	},
}

module.exports = nextConfig

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
	experimental: {
		optimizeCss: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},

	serverRuntimeConfig: {
		PROJECT_URL: "http://localhost:3000",
		BACKEND_URL: "https://mink-corner-backend.npbwebdev.com",
		JWT_SECRET: "jKgs4Qdj4UdjvGCIg_u5FkERmLcsuky5",
		BACKEND_USER: "kenjoo1303@gmail.com",
		BACKEND_PASSWORD: "f^TauFQHaMv5",
		API_URL: "https://mink-corner-backend.npbwebdev.com/graphql",
		ENABLE_MOCK: "true",
		SECRET_COOKIE_PASSWORD: "5qRYJn22dEyHrPFG47VAUvA3DL8RJNuHQ746vtE",
	},
	env: {
		PROJECT_URL: "http://localhost:3000",
		BACKEND_URL: "https://mink-corner-backend.npbwebdev.com",
		JWT_SECRET: "jKgs4Qdj4UdjvGCIg_u5FkERmLcsuky5",
		BACKEND_USER: "kenjoo1303@gmail.com",
		BACKEND_PASSWORD: "f^TauFQHaMv5",
		API_URL: "https://mink-corner-backend.npbwebdev.com/graphql",
		ENABLE_MOCK: "true",
		SECRET_COOKIE_PASSWORD: "5qRYJn22dEyHrPFG47VAUvA3DL8RJNuHQ746vtE",
	},
}

module.exports = nextConfig

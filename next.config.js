// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
	experimental: {
		optimizeCss: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
	},

	serverRuntimeConfig: {},
	env: {},
}

module.exports = nextConfig

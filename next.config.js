/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.dummyjson.com",
				port: "",
			},
		],
	},
	experimental: {
		optimizeCss: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
}

module.exports = nextConfig

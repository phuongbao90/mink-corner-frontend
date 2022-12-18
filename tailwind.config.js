/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			maxWidth: {
				"8xl": "1920px",
			},
			boxShadow: {
				sm: "4px 4px",
				md: "6px 6px",
			},
			borderWidth: {
				3: "3px",
			},
		},
	},
	plugins: [],
}

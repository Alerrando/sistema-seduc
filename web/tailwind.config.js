/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"principal": "#222831",
				"modal": "rgba(0, 0, 0, 0.5)",
			},
			gridTemplateColumns: {
				"report-teacher": "repeat(5, minmax(80px, 1fr))",
			},
		},
	},
	plugins: [],
};

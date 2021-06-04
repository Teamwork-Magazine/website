const serifFallbacks = ["Georgia", "'Times New Roman'", "Times", "serif"];

module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			body: ["Newsreader", ...serifFallbacks],
			headline: ["Newsreader", ...serifFallbacks],
			accent: [
				"'DM Sans'",
				"-apple-system",
				"BlinkMacSystemFont",
				"'Helvetica Neue'",
				"Helvetica",
				"Arial",
				"sans-serif",
			],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};

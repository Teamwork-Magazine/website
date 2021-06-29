const colors = require("tailwindcss/colors");

const serifFallbacks = ["Georgia", "'Times New Roman'", "Times", "serif"];

module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: "transparent",
			currentColor: "currentColor",
			gray: colors.coolGray,
			black: colors.black,
			white: colors.white,
			red: {
				50: "#FFF6F1",
				100: "#FFE8E0",
				200: "#FFC9B8",
				300: "#FCAA91",
				400: "#F38B6A",
				500: "#E25F36",
				600: "#CD3A0C",
				700: "#A82800",
				800: "#821700",
				900: "#661200",
			},
		},
		fontFamily: {
			body: ["Spectral", ...serifFallbacks],
			headline: ["Spectral", ...serifFallbacks],
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
		extend: {
			maxWidth: {
				"8xl": "88rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};

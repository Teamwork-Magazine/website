import "../styles/globals.css";

import * as nextImage from "next/image";

Object.defineProperty(nextImage, "default", {
	configurable: true,
	value: (props) => (
		<img {...props} style={{ height: "auto", width: "100%", ...props.style }} />
	),
});

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	layout: "centered",
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

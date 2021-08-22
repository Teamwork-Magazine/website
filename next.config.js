const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	images: {
		domains: [
			"images.prismic.io",
			"images.unsplash.com",
			"source.unsplash.com",
			"unsplash.com",
		],
	},
});

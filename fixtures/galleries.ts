import { Elements } from "prismic-reactjs";
import { unsplash } from "../lib/fixtures/unsplash";
import { ImagesSlice, ImageWithCaption } from "../prismic/types/slices/images";

const images: ImageWithCaption[] = [
	{
		...unsplash("f0BcqYl_5NY", 1920, 2876),
		alt: "",
		caption: null,
		credit: null,
	},
	{
		...unsplash("KL_ZvHvig8k", 1920, 2385),
		alt: "",
		caption: null,
		credit: "Hayes Potter",
	},
	{
		...unsplash("ipG2Dvts5Ns", 1920, 2557),
		alt: "",
		caption: [
			{
				type: Elements.paragraph,
				text: "Swans in the lake.",
				spans: [],
			},
		],
		credit: "Maksim Samuilionak",
	},
	{
		...unsplash("VvQSzMJ_h0U", 1920, 1283),
		alt: "",
		caption: [
			{
				type: Elements.paragraph,
				text: "Toronto Blue Jays stadium",
				spans: [],
			},
		],
		credit: "Tim Gouw",
	},
];

export const OneColumn: ImagesSlice = {
	type: "images",
	layout: "one-column",
	alignImages: "top",
	extraWide: false,
	gallery: images,
};

export const OneColumnExtraWide: ImagesSlice = {
	...OneColumn,
	extraWide: true,
};

export const TwoColumns: ImagesSlice = {
	...OneColumnExtraWide,
	layout: "two-column",
};

export const ThreeColumns: ImagesSlice = {
	...OneColumnExtraWide,
	layout: "three-column",
};

export const FourColumns: ImagesSlice = {
	...OneColumnExtraWide,
	layout: "four-column",
};

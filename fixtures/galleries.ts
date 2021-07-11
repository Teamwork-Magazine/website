import { Elements } from "prismic-reactjs";
import { ImagesSlice, ImageWithCaption } from "../prismic/types/slices/images";

const images: ImageWithCaption[] = [
	{
		src:
			"https://images.unsplash.com/photo-1625149982605-4d60e9144650?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920",
		alt: "",
		width: 1920,
		height: 2880,
		caption: null,
		credit: "Samuel Regan-Asante",
	},
	{
		src: "https://unsplash.com/photos/KL_ZvHvig8k/download?w=1920",
		alt: "",
		width: 1920,
		height: 2385,
		caption: null,
		credit: "Hayes Potter",
	},
	{
		src: "https://unsplash.com/photos/ipG2Dvts5Ns/download?w=1920",
		alt: "",
		width: 1920,
		height: 2557,
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
		src: "https://unsplash.com/photos/VvQSzMJ_h0U/download?w=1920",
		alt: "",
		width: 1920,
		height: 1283,
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

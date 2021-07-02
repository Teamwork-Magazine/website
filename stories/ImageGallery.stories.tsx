import { ComponentStory, Meta } from "@storybook/react";
import ImageGallery from "../components/molecules/ImageGallery";

export default {
	component: ImageGallery,
	title: "Image Gallery",
} as Meta;

const Template: ComponentStory<typeof ImageGallery> = (args) => (
	<ImageGallery {...args} />
);

export const OneColumn = Template.bind({});
OneColumn.args = {
	layout: "one-column",
	alignImages: "top",
	images: [
		{
			src:
				"https://images.unsplash.com/photo-1625149982605-4d60e9144650?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920",
			alt: "",
			width: 1920,
			height: 2880,
			credit: "Samuel Regan-Asante",
		},
		{
			src: "https://unsplash.com/photos/KL_ZvHvig8k/download?w=1920",
			alt: "",
			width: 1920,
			height: 2385,
			credit: "Hayes Potter",
		},
		{
			src: "https://unsplash.com/photos/ipG2Dvts5Ns/download?w=1920",
			alt: "",
			width: 1920,
			height: 2557,
			caption: "Swans in the lake.",
			credit: "Maksim Samuilionak",
		},
		{
			src: "https://unsplash.com/photos/VvQSzMJ_h0U/download?w=1920",
			alt: "",
			width: 1920,
			height: 1283,
			caption: "Toronto Blue Jays stadium",
			credit: "Tim Gouw",
		},
	],
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
	...OneColumn.args,
	layout: "two-column",
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
	...OneColumn.args,
	layout: "three-column",
};

export const FourColumns = Template.bind({});
FourColumns.args = {
	...OneColumn.args,
	layout: "four-column",
};

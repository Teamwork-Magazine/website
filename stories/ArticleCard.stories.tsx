import { ComponentStory, Meta } from "@storybook/react";
import { Elements } from "prismic-reactjs";
import ArticleCard from "../components/molecules/ArticleCard";

export default {
	component: ArticleCard,
	title: "ArticleCard",
} as Meta;

const Template: ComponentStory<typeof ArticleCard> = (args) => (
	<ArticleCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
	uid: "the-odyssey",
	title: "The Odyssey",
	section: {
		uid: "classics",
		name: "Classics",
	},
	blurb: [
		{
			type: Elements.paragraph,
			text: `Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy.`,
			spans: [],
		},
	],
	featured: false,
	featuredImage: {
		src: "https://unsplash.com/photos/vhUQqymqGZ4/download?w=640",
		width: 640,
		height: 427,
		alt: "",
	},
	variant: "standard",
};

export const Condensed = Template.bind({});
Condensed.args = {
	...Default.args,
	variant: "condensed",
};

export const Featured = Template.bind({});
Featured.args = {
	...Default.args,
	featured: true,
	variant: "featured",
};
Featured.parameters = {
	layout: "padded",
};

export const WithoutFeaturedImage = Template.bind({});
WithoutFeaturedImage.args = {};

export const WithoutSection = Template.bind({});
WithoutSection.args = {};

export const WithoutBlurb = Template.bind({});
WithoutBlurb.args = {};

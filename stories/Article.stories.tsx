import { ComponentStory, Meta } from "@storybook/react";
import Article from "../components/templates/Article";
import * as Stories from "../fixtures/stories";

export default {
	component: Article,
	title: "Article",
	parameters: {
		layout: "fullscreen",
	},
} as Meta;

const Template: ComponentStory<typeof Article> = (args) => (
	<Article {...args} />
);

export const Default = Template.bind({});
Default.args = {
	story: Stories.AliceInWonderland,
	recommendedStories: [
		Stories.TheOdyssey,
		Stories.PrideAndPrejudice,
		Stories.TheGreatGatsby,
		Stories.GrimmsFairyTales,
	],
};

export const WithFeaturedImage = Template.bind({});
WithFeaturedImage.args = {
	...Default.args,
	story: {
		...Default.args.story,
		coverImage: {
			src: "https://unsplash.com/photos/jBohRHjmLeo/download?w=1920",
			alt: "",
			width: 1920,
			height: 1280,
			credit: "Paolo Nicolello, Unsplash",
		},
	},
};

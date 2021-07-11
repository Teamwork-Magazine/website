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

export const NoCoverImage = Template.bind({});
NoCoverImage.args = {
	...Default.args,
	story: {
		...Default.args.story,
		coverImage: null,
	},
};

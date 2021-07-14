import { ComponentStory, Meta } from "@storybook/react";
import { Elements } from "prismic-reactjs";
import ArticleCard from "../components/molecules/ArticleCard";
import * as Stories from "../fixtures/stories";

export default {
	component: ArticleCard,
	title: "Article Card",
} as Meta;

const Template: ComponentStory<typeof ArticleCard> = (args) => (
	<ArticleCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
	story: Stories.TheOdyssey,
	layout: "normal",
};

export const Featured = Template.bind({});
Featured.args = {
	...Default.args,
	layout: "featured",
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

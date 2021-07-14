import { ComponentStory, Meta } from "@storybook/react";
import Header from "../components/organisms/Header";

export default {
	component: Header,
	title: "Header",
	parameters: {
		layout: "fullscreen",
	},
} as Meta;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
	sections: [
		{
			slug: "longform",
			name: "Longform",
		},
		{
			slug: "profile",
			name: "Profile",
		},
		{
			slug: "photo-essay",
			name: "Photo Essay",
		},
	],
	pages: [
		{
			slug: "about-us",
			title: "About Us",
		},
	],
};

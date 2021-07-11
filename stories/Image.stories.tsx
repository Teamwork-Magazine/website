import { ComponentStory, Meta } from "@storybook/react";
import Image from "../components/molecules/Image";

export default {
	component: Image,
	title: "Image",
} as Meta;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Standalone = Template.bind({});
Standalone.args = {
	src: "https://source.unsplash.com/WUehAgqO5hE/1400x800",
	width: 1400,
	height: 800,
	alt: "Bike racers",
};

export const WithCaption = Template.bind({});
WithCaption.args = {
	...Standalone.args,
	caption:
		"Bavarian Road Cycling Championship 2017 in Baiersdorf (Middle Franconia)",
};

export const WithCredit = Template.bind({});
WithCredit.args = {
	...Standalone.args,
	credit: "Markus Spiske",
};

export const WithCaptionAndCredit = Template.bind({});
WithCaptionAndCredit.args = {
	...WithCaption.args,
	...WithCredit.args,
};

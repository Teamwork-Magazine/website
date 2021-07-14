import { ComponentStory, Meta } from "@storybook/react";
import ImageGallery from "../components/molecules/ImageGallery";
import * as Galleries from "../fixtures/galleries";

export default {
	component: ImageGallery,
	title: "Image Gallery",
} as Meta;

const Template: ComponentStory<typeof ImageGallery> = (args) => (
	<ImageGallery {...args} />
);

export const OneColumn = Template.bind({});
OneColumn.args = Galleries.OneColumn;

export const TwoColumns = Template.bind({});
TwoColumns.args = Galleries.TwoColumns;

export const ThreeColumns = Template.bind({});
ThreeColumns.args = Galleries.ThreeColumns;

export const FourColumns = Template.bind({});
FourColumns.args = Galleries.FourColumns;

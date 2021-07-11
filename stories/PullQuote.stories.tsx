import { ComponentStory, Meta } from "@storybook/react";
import PullQuote from "../components/molecules/PullQuote";

export default {
	component: PullQuote,
	title: "Pull Quote",
	parameters: {
		layout: "centered",
	},
} as Meta;

const Template: ComponentStory<typeof PullQuote> = (args) => (
	<PullQuote {...args} />
);

export const Default = Template.bind({});
Default.args = {
	quote: (
		<p>
			She was now more than nine feet high, and she at once took up the little
			golden key and hurried off to the garden door.
		</p>
	),
};

export const WithAttribution = Template.bind({});
WithAttribution.args = {
	...Default.args,
	attribution: (
		<p>
			Lewis Carroll, <cite>The Adventures of Alice in Wonderland</cite>
		</p>
	),
};

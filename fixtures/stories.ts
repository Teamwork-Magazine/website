import { Elements } from "prismic-reactjs";
import { unsplash } from "../lib/fixtures/unsplash";
import { Story } from "../prismic/types/story";
import * as Galleries from "./galleries";
import * as Tags from "./tags";

export const AliceInWonderland: Story = {
	id: "S1",
	slug: "down-the-rabbit-hole",
	title: "Down the Rabbit-Hole",
	blurb: [
		{
			type: Elements.paragraph,
			text: `“Oh, I’ve had such a curious dream!” said Alice, and she told her sister, as well as she could remember them, all these strange Adventures of hers that you have just been reading about.`,
			spans: [],
		},
	],
	featured: false,
	coverImage: {
		...unsplash("jBohRHjmLeo", 1920, 1280),
		alt: "",
		credit: "Paolo Nicolello, Unsplash",
	},
	thumbnail: null,
	section: {
		slug: "literature",
		name: "Literature",
	},
	authors: [
		{
			name: "Lewis Carroll",
			slug: "lewis-carroll",
		},
	],
	photographers: null,
	tags: [Tags.Literature, Tags.Novels],
	body: [
		{
			type: "rich-text",
			blocks: [
				{
					type: Elements.paragraph,
					text: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”`,
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.`,
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`,
					spans: [
						{
							start: 21,
							end: 25,
							type: Elements.em,
						},
					],
				},
			],
		},
		{
			...Galleries.OneColumn,
			gallery: Galleries.OneColumn.gallery.slice(2, 3),
		},
		{
			type: "rich-text",
			blocks: [
				{
					type: Elements.paragraph,
					text: `In another moment down went Alice after it, never once considering how in the world she was to get out again.`,
					spans: [],
				},
			],
		},
		{
			...Galleries.TwoColumns,
			gallery: Galleries.TwoColumns.gallery.slice(0, 2),
		},
		{
			type: "rich-text",
			blocks: [
				{
					type: Elements.paragraph,
					text: `The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well. `,
					spans: [],
				},
				{
					type: Elements.heading2,
					text: "Chapter II. The Pool of Tears",
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `“Curiouser and curiouser!” cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); “now I’m opening out like the largest telescope that ever was! Good-bye, feet!” (for when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off). “Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears? I’m sure I shan’t be able! I shall be a great deal too far off to trouble myself about you: you must manage the best way you can;—but I must be kind to them,” thought Alice, “or perhaps they won’t walk the way I want to go! Let me see: I’ll give them a new pair of boots every Christmas.”`,
					spans: [],
				},
			],
		},
		{
			type: "pull-quote",
			quote: [
				{
					type: Elements.paragraph,
					text: `She was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.`,
					spans: [],
				},
			],
			attribution: [
				{
					type: Elements.paragraph,
					text: `Lewis Carroll, The Adventures of Alice in Wonderland`,
					spans: [
						{
							type: Elements.em,
							start: 15,
							end: 52,
						},
					],
				},
			],
		},
		{
			type: "rich-text",
			blocks: [
				{
					type: Elements.paragraph,
					text: `And she went on planning to herself how she would manage it. “They must go by the carrier,” she thought; “and how funny it’ll seem, sending presents to one’s own feet! And how odd the directions will look!`,
					spans: [],
				},
				{
					type: Elements.heading3,
					text: "Alice’s Right Foot, Esq.",
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.`,
					spans: [],
				},
				{
					type: Elements.heading4,
					text: "How doth the little—",
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `Poor Alice! It was as much as she could do, lying down on one side, to look through into the garden with one eye; but to get through was more hopeless than ever: she sat down and began to cry again.`,
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `“You ought to be ashamed of yourself,” said Alice, “a great girl like you,” (she might well say this), “to go on crying in this way! Stop this moment, I tell you!” But she went on all the same, shedding gallons of tears, until there was a large pool all round her, about four inches deep and reaching half down the hall.`,
					spans: [],
				},
				{
					type: Elements.paragraph,
					text: `After a time she heard a little pattering of feet in the distance, and she hastily dried her eyes to see what was coming. It was the White Rabbit returning, splendidly dressed, with a pair of white kid gloves in one hand and a large fan in the other: he came trotting along in a great hurry, muttering to himself as he came, “Oh! the Duchess, the Duchess! Oh! won’t she be savage if I’ve kept her waiting!” Alice felt so desperate that she was ready to ask help of any one; so, when the Rabbit came near her, she began, in a low, timid voice, “If you please, sir—” The Rabbit started violently, dropped the white kid gloves and the fan, and skurried away into the darkness as hard as he could go.`,
					spans: [],
				},
				{
					type: Elements.oListItem,
					text: `How doth the little crocodile / Improve his shining tail, / And pour the waters of the Nile / On every golden scale!`,
					spans: [],
				},
				{
					type: Elements.oListItem,
					text: `How cheerfully he seems to grin, / How neatly spread his claws, / And welcome little fishes in / With gently smiling jaws!`,
					spans: [],
				},
			],
		},
	],
	publishedAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	socialTitle: null,
	socialDescription: null,
};

export const TheOdyssey: Story = {
	id: "S2",
	slug: "the-odyssey",
	title: "The Odyssey",
	section: {
		slug: "classics",
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
	coverImage: null,
	thumbnail: {
		...unsplash("vhUQqymqGZ4", 640, 427),
		alt: "",
		credit: "",
	},
	authors: [
		{
			name: "Homer",
			slug: "homer",
		},
	],
	photographers: null,
	tags: [],
	body: [],
	publishedAt: new Date().toISOString(),
	updatedAt: null,
	socialTitle: null,
	socialDescription: null,
};

export const PrideAndPrejudice: Story = {
	id: "S3",
	slug: "pride-and-prejudice",
	title: "Pride and Prejudice",
	section: {
		slug: "novels",
		name: "Novels",
	},
	blurb: [
		{
			type: Elements.paragraph,
			text: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.`,
			spans: [],
		},
	],
	featured: false,
	thumbnail: {
		...unsplash("eNMMw7ihJ2Y", 640, 427),
		alt: "",
		credit: "",
	},
	coverImage: null,
	authors: [
		{
			name: "Jane Austen",
			slug: "jane-austen",
		},
	],
	photographers: [
		{
			name: "Ane Justen",
			slug: "ane-justen",
		},
	],
	tags: [],
	body: [],
	publishedAt: new Date().toISOString(),
	updatedAt: null,
	socialTitle: null,
	socialDescription: null,
};

export const TheGreatGatsby: Story = {
	id: "S4",
	slug: "the-great-gatsby",
	title: "The Great Gatsby",
	section: null,
	blurb: [
		{
			type: Elements.paragraph,
			text: `In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.`,
			spans: [],
		},
	],
	featured: false,
	coverImage: null,
	thumbnail: {
		...unsplash("4kEW68FZ154", 640, 427),
		alt: "",
		credit: "",
	},
	authors: [
		{
			name: "F. Scott Fitzgerald",
			slug: "f-scott-fitzgerald",
		},
	],
	photographers: [],
	tags: [],
	body: [],
	publishedAt: new Date().toISOString(),
	updatedAt: null,
	socialTitle: null,
	socialDescription: null,
};

export const GrimmsFairyTales: Story = {
	id: "S5",
	slug: "grimms-fairy-tales",
	title: "Grimms’ Fairy Tales",
	section: {
		slug: "germany",
		name: "Germany",
	},
	blurb: [
		{
			type: Elements.paragraph,
			text: `Some men are born to good luck: all they do or try to do comes right—all that falls to them is so much gain.`,
			spans: [],
		},
	],
	featured: false,
	coverImage: null,
	thumbnail: {
		...unsplash("vK8JWr6j15c", 640, 427),
		alt: "",
		credit: "",
	},
	authors: [
		{
			name: "Jacob Grimm",
			slug: "jacob-grimm",
		},
		{
			name: "Wilhelm Grimm",
			slug: "wilhelm-grimm",
		},
	],
	photographers: null,
	tags: [],
	body: [],
	publishedAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	socialTitle: null,
	socialDescription: null,
};

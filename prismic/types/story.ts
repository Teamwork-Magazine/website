import { Document } from "@prismicio/client/types/documents";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { LinkedDocument } from "../interfaces";
import { Schema } from "../schema";
import { Image, PrismicImage, ImageSchema } from "./image";
import { PersonLink, PersonSchema } from "./person";
import { CategoryLink, CategorySchema } from "./category";
import {
	ImagesSlice,
	ImagesSliceSchema,
	PrismicImagesSlice,
} from "./slices/images";
import {
	PrismicPullQuoteSlice,
	PullQuoteSlice,
	PullQuoteSliceSchema,
} from "./slices/pull-quote";
import {
	PrismicRichTextSlice,
	RichTextSlice,
	RichTextSliceSchema,
} from "./slices/rich-text";
import { Tag, TagSchema } from "./tag";

export interface Story {
	id: string;
	title: string;
	slug: string;
	featured: boolean;
	section: CategoryLink | null;
	coverImage: Image | null;
	thumbnail: Image | null;
	blurb: RichTextBlock[] | null;
	authors: PersonLink[] | null;
	photographers: PersonLink[] | null;
	tags: Tag[];
	body: StorySlice[];
	socialTitle: string | null;
	socialDescription: string | null;
}

export type PrismicStorySlice =
	| PrismicRichTextSlice
	| PrismicPullQuoteSlice
	| PrismicImagesSlice;
export type StorySlice = RichTextSlice | PullQuoteSlice | ImagesSlice;

export const StorySchema = new Schema<Document, Story>({
	id(doc) {
		return doc.id;
	},
	title(doc) {
		const { title = [] } = doc.data;
		return RichText.asText(title);
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
	featured(doc) {
		return Boolean(doc.data.featured);
	},
	section(doc) {
		const section: LinkedDocument = doc.data.section;
		return section?.isBroken === false
			? CategorySchema.cast(section, ["name", "slug"])
			: null;
	},
	coverImage(doc) {
		const coverImage: PrismicImage = doc.data.featured_image?.Default;
		return coverImage ? ImageSchema.cast(coverImage) : null;
	},
	thumbnail(doc) {
		const thumbnail: PrismicImage = doc.data.featured_image?.Thumbnail;
		return thumbnail ? ImageSchema.cast(thumbnail) : null;
	},
	blurb(doc) {
		const { blurb = [] } = doc.data as { blurb?: RichTextBlock[] };
		return blurb.length ? blurb : null;
	},
	authors(doc) {
		const { authors = [] } = doc.data as { authors?: LinkedDocument[] };
		return authors
			.filter((author) => author.isBroken === false)
			.map((author) => PersonSchema.cast(author, ["name", "slug"]));
	},
	photographers(doc) {
		const { photographers = [] } = doc.data as {
			photographers?: LinkedDocument[];
		};
		return photographers
			.filter((photographer) => photographer.isBroken === false)
			.map((photographer) => PersonSchema.cast(photographer, ["name", "slug"]));
	},
	tags(doc) {
		return doc.tags.map((tag) => TagSchema.cast(tag));
	},
	body(doc) {
		if (!Array.isArray(doc.data.body)) {
			return [];
		}

		return (doc.data.body as PrismicStorySlice[]).reduce((slices, slice) => {
			switch (slice.slice_type) {
				case "rich_text":
					slices.push(RichTextSliceSchema.cast(slice));
					break;
				case "pullquote":
					slices.push(PullQuoteSliceSchema.cast(slice));
					break;
				case "images":
					slices.push(ImagesSliceSchema.cast(slice));
					break;
			}

			return slices;
		}, [] as StorySlice[]);
	},
	socialTitle(doc) {
		return (doc.data?.social_title as string) || null;
	},
	socialDescription(doc) {
		return (doc.data?.social_description as string) || null;
	},
});

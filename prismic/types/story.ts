import { Document } from "@prismicio/client/types/documents";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { Schema } from "../schema";
import { Image, PrismicImage, ImageSchema } from "./image";
import { Tag, TagSchema } from "./tag";

export interface Story {
	title: string;
	thumbnail: Image | null;
	blurb: RichTextBlock[] | null;
	tags: Tag[];
}

export const StorySchema = new Schema<Document, Story>({
	title(doc) {
		const { title = [] } = doc.data;
		return RichText.asText(title);
	},
	thumbnail(doc) {
		const thumbnail: PrismicImage = doc.data.featured_image?.Thumbnail;
		return thumbnail ? ImageSchema.cast(thumbnail) : null;
	},
	blurb(doc) {
		const { blurb = [] } = doc.data;
		return blurb.length ? blurb : null;
	},
	tags(doc) {
		return doc.tags.map((tag) => TagSchema.cast(tag));
	},
});

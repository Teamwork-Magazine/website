import { Document } from "@prismicio/client/types/documents";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { Schema } from "prismic/schema";
import { AuthorLink, AuthorSchema } from "./author";
import { CategoryLink, CategorySchema, UNCATEGORIZED } from "./category";

export interface Article {
	id: string;
	slug: string;
	title: string;
	authors: AuthorLink[];
	category: CategoryLink;
	blurb: RichTextBlock[] | null;
}

export const ArticleSchema = new Schema<Article>({
	id(doc) {
		return doc.id;
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
	title(doc) {
		const { title = [] } = doc.data;
		return RichText.asText(title);
	},
	authors(doc) {
		const { authors = [] } = doc.data;
		return authors.map(({ author }) =>
			AuthorSchema.cast(author, ["slug", "name"])
		);
	},
	category(doc) {
		const { category } = doc.data;
		return category
			? CategorySchema.cast(category, ["slug", "name"])
			: UNCATEGORIZED;
	},
	blurb(doc) {
		const { blurb = [] } = doc.data;
		return blurb.length ? blurb : null;
	},
});

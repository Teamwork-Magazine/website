import { Document } from "@prismicio/client/types/documents";
import { RichText } from "prismic-reactjs";
import { Schema } from "prismic/schema";

export interface Category {
	id: string;
	slug: string;
	name: string;
}

export type CategoryLink = Pick<Category, "name" | "slug">;

export const CategorySchema = new Schema<Document, Category>({
	id(doc) {
		return doc.id;
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
	name(doc) {
		const { name = [] } = doc.data;
		return RichText.asText(name);
	},
});

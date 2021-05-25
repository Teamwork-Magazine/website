import { RichText } from "prismic-reactjs";
import { Schema } from "prismic/schema";

export interface Category {
	id: string;
	slug: string;
	name: string;
}

export type CategoryLink = Pick<Category, "name" | "slug">;

export const UNCATEGORIZED: CategoryLink = {
	slug: "uncategorized",
	name: "Uncategorized",
};

export const CategorySchema = new Schema<Category>({
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

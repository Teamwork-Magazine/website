import { Schema } from "prismic/schema";

export interface Author {
	id: string;
	slug: string;
	name: string;
}

export type AuthorLink = Pick<Author, "name" | "slug">;

export const AuthorSchema = new Schema<Author>({
	id(doc) {
		return doc.id;
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
	name(doc) {
		const { name = "" } = doc.data;
		return name;
	},
});

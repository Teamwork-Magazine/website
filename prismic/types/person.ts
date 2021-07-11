import { Document } from "@prismicio/client/types/documents";
import { Schema } from "../schema";

export interface Person {
	id: string;
	slug: string;
	name: string;
}

export type PersonLink = Pick<Person, "name" | "slug">;

export const PersonSchema = new Schema<Document, Person>({
	id(doc) {
		return doc.id;
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
	name(doc) {
		const { name } = doc.data;
		return typeof name === "string" ? name : "Unknown";
	},
});

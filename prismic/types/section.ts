import { Document } from "@prismicio/client/types/documents";
import { RichText } from "prismic-reactjs";
import { Schema } from "../schema";

export interface Section {
	id: string;
	slug: string;
	name: string;
}

export type SectionLink = Pick<Section, "name" | "slug">;

export const SectionSchema = new Schema<Document, Section>({
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

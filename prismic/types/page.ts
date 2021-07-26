import { Document } from "@prismicio/client/types/documents";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { Schema } from "../schema";

export interface Page {
	id: string;
	title: string;
	slug: string;
}

export type PageLink = Pick<Page, "title" | "slug">;

export const PageSchema = new Schema<Document, Page>({
	id(doc) {
		return doc.id;
	},
	title(doc) {
		const { title = [] } = doc.data as { title?: RichTextBlock[] };
		return RichText.asText(title) || "Untitled";
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
});

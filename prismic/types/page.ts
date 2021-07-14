import { Document } from "@prismicio/client/types/documents";
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
		const { title = "" } = doc.data as { title?: string };
		return title || "Untitled";
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
});

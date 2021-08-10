import { Document } from "@prismicio/client/types/documents";
import { Schema } from "../schema";

export interface Site {
	title: string;
	description: string;
	url: string;
}

export const SiteSchema = new Schema<Document, Site>({
	title(doc) {
		const { title } = doc.data as { title?: string };
		return title ?? "Untitled";
	},
	description(doc) {
		const { description } = doc.data as { description?: string };
		return description ?? "No description provided";
	},
	url() {
		return process.env.URL ?? "";
	},
});

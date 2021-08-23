import { Document } from "@prismicio/client/types/documents";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { Schema } from "../schema";

export interface Stockist {
	id: string;
	name: string;
	location: string;
}

export const StockistSchema = new Schema<Document, Stockist>({
	id(doc) {
		return doc.id;
	},
	name(doc) {
		const { name = [] } = doc.data as { name?: RichTextBlock[] };
		return RichText.asText(name) || null;
	},
	location(doc) {
		const { location } = doc.data as { location?: string };
		return location || null;
	},
});

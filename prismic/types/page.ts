import { Document } from "@prismicio/client/types/documents";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { Schema } from "../schema";
import {
	PrismicRichTextSlice,
	RichTextSlice,
	RichTextSliceSchema,
} from "./slices/rich-text";

export interface Page {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	body: PageSlice[];
	publishedAt: string | null;
	updatedAt: string | null;
	socialTitle: string | null;
	socialDescription: string | null;
}

export type PrismicPageSlice = PrismicRichTextSlice;
export type PageSlice = RichTextSlice;

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
		if (doc.type === "privacy_policy") return "privacy";
		if (doc.type === "issues_page") return "issues";
		if (doc.type === "stockists_page") return "stockists";

		return doc.uid ?? doc.id;
	},
	description(doc) {
		const { description } = doc.data as { description?: string };
		return description || null;
	},
	body(doc) {
		if (!Array.isArray(doc.data.body)) {
			return [];
		}

		return (doc.data.body as PrismicPageSlice[]).reduce((slices, slice) => {
			switch (slice.slice_type) {
				case "rich_text":
					slices.push(RichTextSliceSchema.cast(slice));
					break;
			}

			return slices;
		}, [] as PageSlice[]);
	},
	publishedAt(doc) {
		return doc.first_publication_date;
	},
	updatedAt(doc) {
		return doc.last_publication_date;
	},
	socialTitle(doc) {
		return (doc.data?.social_title as string) || null;
	},
	socialDescription(doc) {
		return (doc.data?.social_description as string) || null;
	},
});

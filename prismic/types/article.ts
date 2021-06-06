import { Document } from "@prismicio/client/types/documents";
import { Schema } from "../schema";
import { Story, StorySchema } from "./story";

export interface Article extends Story {
	id: string;
	slug: string;
}

export const ArticleSchema: Schema<Document, Article> = StorySchema.extend({
	id(doc) {
		return doc.id;
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
});

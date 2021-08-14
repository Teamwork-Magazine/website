import { Schema } from "../schema";

export interface Tag {
	slug: string;
	name: string;
}

export const TagSchema = new Schema<string, Tag>({
	slug(tag) {
		return encodeURIComponent(tag);
	},
	name(tag) {
		return tag;
	},
});

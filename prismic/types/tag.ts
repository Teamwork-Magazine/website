import slugify from "slugify";
import { Schema } from "prismic/schema";

export interface Tag {
	slug: string;
	name: string;
}

export const TagSchema = new Schema<string, Tag>({
	slug(tag) {
		return slugify(tag);
	},
	name(tag) {
		return tag;
	},
});

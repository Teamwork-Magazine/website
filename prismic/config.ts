import { Document } from "@prismicio/client/types/documents";
import { StorySchema } from "./types/story";
import { CategorySchema } from "./types/category";
import { Routes } from "./routes";
import { PageSchema } from "./types/page";

export const apiEndpoint = "https://teamwork-magazine.cdn.prismic.io/api/v2";

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export const linkResolver = (doc: Document): string => {
	switch (doc.type) {
		case "story":
			return Routes.story(StorySchema.cast(doc, ["slug"]));
		case "section":
			return Routes.category(CategorySchema.cast(doc, ["slug"]));
		case "page":
			return Routes.page(PageSchema.cast(doc, ["slug"]));
		case "privacy":
		case "issues":
		case "stockists":
			return Routes[doc.type];
		default:
			return Routes.catchAll({ slug: doc.uid ?? doc.id });
	}
};

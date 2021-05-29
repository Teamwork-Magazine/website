import { Document } from "@prismicio/client/types/documents";
import { AuthorSchema } from "./types/author";
import { ArticleSchema } from "./types/article";
import { CategorySchema } from "./types/category";
import * as Links from "./links";

export const apiEndpoint = "https://teamwork-magazine.cdn.prismic.io/api/v2";

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export const linkResolver = (doc: Document) => {
	if (doc.type === "article") {
		const article = ArticleSchema.cast(doc, ["slug"]);
		return Links.article(article);
	}

	if (doc.type === "author") {
		const author = AuthorSchema.cast(doc, ["slug"]);
		return Links.author(author);
	}

	if (doc.type === "category") {
		const category = CategorySchema.cast(doc, ["slug"]);
		return Links.category(category);
	}

	return `/${doc.uid ?? doc.id}`;
};

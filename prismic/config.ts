import { Document } from "@prismicio/client/types/documents";
import { AuthorSchema } from "./types/author";
import { ArticleSchema } from "./types/article";
import { SectionSchema } from "./types/category";
import { Routes } from "./routes";

export const apiEndpoint = "https://teamwork-magazine.cdn.prismic.io/api/v2";

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export const linkResolver = (doc: Document) => {
	if (doc.type === "article") {
		const article = ArticleSchema.cast(doc, ["slug"]);
		return Routes.article(article);
	}

	if (doc.type === "author") {
		const author = AuthorSchema.cast(doc, ["slug"]);
		return Routes.author(author);
	}

	if (doc.type === "category") {
		const category = SectionSchema.cast(doc, ["slug"]);
		return Routes.category(category);
	}

	return `/${doc.uid ?? doc.id}`;
};

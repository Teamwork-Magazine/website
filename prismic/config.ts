import { Document } from "@prismicio/client/types/documents";
import { PersonSchema } from "./types/person";
import { StorySchema } from "./types/story";
import { CategorySchema } from "./types/category";
import { Routes } from "./routes";

export const apiEndpoint = "https://teamwork-magazine.cdn.prismic.io/api/v2";

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export const linkResolver = (doc: Document) => {
	if (doc.type === "story") {
		const story = StorySchema.cast(doc, ["slug"]);
		return Routes.story(story);
	}

	if (doc.type === "person") {
		const person = PersonSchema.cast(doc, ["slug"]);
		return Routes.person(person);
	}

	if (doc.type === "section") {
		const section = CategorySchema.cast(doc, ["slug"]);
		return Routes.section(section);
	}

	return `/${doc.uid ?? doc.id}`;
};

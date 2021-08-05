import { Document } from "@prismicio/client/types/documents";
import { PersonSchema } from "./types/person";
import { StorySchema } from "./types/story";
import { SectionSchema } from "./types/section";
import { Routes } from "./routes";

export const apiEndpoint = "https://teamwork-magazine.cdn.prismic.io/api/v2";

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export const linkResolver = (doc: Document) => {
	if (doc.type === "story") {
		const story = StorySchema.castSync(doc, ["slug"]);
		return Routes.story(story);
	}

	if (doc.type === "person") {
		const person = PersonSchema.castSync(doc, ["slug"]);
		return Routes.person(person);
	}

	if (doc.type === "section") {
		const section = SectionSchema.castSync(doc, ["slug"]);
		return Routes.section(section);
	}

	return `/${doc.uid ?? doc.id}`;
};

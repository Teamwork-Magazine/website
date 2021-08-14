import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "../../lib/async/collect";
import { withFetchLinks } from "../fetch-links";
import { fetchAll } from "../fetchAll";
import { Category } from "../types/category";
import { Story, StorySchema } from "../types/story";

const transformOptions = withFetchLinks(["section.name", "person.name"]);

export async function getAllStories(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Story[]> {
	const query = [
		Prismic.predicates.at("document.type", "story"),
		...predicates,
	];

	const docs = await collect(
		fetchAll(
			client,
			query,
			transformOptions({
				orderings: "[document.first_publication_date desc]",
				...options,
			})
		)
	);

	return docs.map((doc) => StorySchema.cast(doc));
}

export async function getStoriesByCategory(
	client: DefaultClient,
	category: Category | string,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Story[]> {
	const categoryId = typeof category === "string" ? category : category.id;
	const query = [
		Prismic.predicates.at("my.story.section", categoryId),
		...predicates,
	];

	return getAllStories(client, query, options);
}

export async function getUncategorizedStories(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Story[]> {
	const query = [Prismic.predicates.missing("my.story.section"), ...predicates];

	return getAllStories(client, query, options);
}

export async function getFeaturedStories(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Story[]> {
	const query = [
		Prismic.predicates.at("my.story.featured", true),
		...predicates,
	];

	return getAllStories(client, query, options);
}

export async function getLeadStory(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Story | null> {
	const latestQuery = [
		Prismic.predicates.at("document.type", "story"),
		...predicates,
	];
	const featuredQuery = [
		...latestQuery,
		Prismic.predicates.at("my.story.featured", true),
	];

	options = transformOptions({
		...options,
		orderings: "[document.first_publication_date desc]",
	});

	let doc = await client.queryFirst(featuredQuery, options);

	if (!doc) {
		doc = await client.queryFirst(latestQuery, options);
	}

	if (!doc) {
		return null;
	}

	return StorySchema.cast(doc);
}

export async function getLatestStories(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
) {
	const query = [
		Prismic.predicates.at("document.type", "story"),
		...predicates,
	];

	const { results: docs } = await client.query(
		query,
		transformOptions({
			...options,
			orderings: "[document.first_publication_date desc]",
		})
	);

	return docs.map((doc) => StorySchema.cast(doc));
}

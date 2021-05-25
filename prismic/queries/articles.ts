import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "lib/async/collect";
import { Article, ArticleSchema } from "prismic/types/article";
import { fetchAll } from "../fetchAll";

export async function all(
	client: DefaultClient,
	options?: QueryOptions
): Promise<Article[]> {
	const docs = await collect(
		fetchAll(client, Prismic.predicates.at("document.type", "article"), {
			...options,
			fetchLinks: "author.name,category.name",
		})
	);

	return docs.map((doc) => ArticleSchema.cast(doc));
}

export async function find(
	client: DefaultClient,
	uid: string,
	options?: QueryOptions
): Promise<Article | null> {
	const doc = await client.getByUID("article", uid, {
		...options,
		fetchLinks: "author.name,category.name",
	});

	if (!doc) {
		return null;
	}

	return ArticleSchema.cast(doc);
}

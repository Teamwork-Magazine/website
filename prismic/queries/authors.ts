import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { Author, AuthorSchema } from "../types/author";
import { collect } from "../../lib/async/collect";
import { fetchAll } from "../fetchAll";

export async function all(
	client: DefaultClient,
	options?: QueryOptions
): Promise<Author[]> {
	const docs = await collect(
		fetchAll(client, Prismic.predicates.at("document.type", "author"), options)
	);

	return Promise.all(docs.map((doc) => AuthorSchema.cast(doc)));
}

export async function find(
	client: DefaultClient,
	uid: string,
	options: QueryOptions = {}
): Promise<Author | null> {
	const doc = await client.getByUID("author", uid, options);

	if (!doc) {
		return null;
	}

	return AuthorSchema.cast(doc);
}

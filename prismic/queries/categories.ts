import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "../../lib/async/collect";
import { fetchAll } from "../fetchAll";
import { Category, CategorySchema } from "../types/category";

export async function all(
	client: DefaultClient,
	options?: QueryOptions
): Promise<Category[]> {
	const docs = await collect(
		fetchAll(
			client,
			Prismic.predicates.at("document.type", "category"),
			options
		)
	);

	return docs.map((doc) => CategorySchema.cast(doc));
}

export async function find(
	client: DefaultClient,
	uid: string,
	options?: QueryOptions
): Promise<Category | null> {
	const doc = await client.getByUID("category", uid, options);

	if (!doc) {
		return null;
	}

	return CategorySchema.cast(doc);
}

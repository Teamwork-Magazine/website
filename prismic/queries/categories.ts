import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "../../lib/async/collect";
import { fetchAll } from "../fetchAll";
import { Category, CategorySchema } from "../types/category";

export async function getAllCategories(
	client: DefaultClient,
	options: QueryOptions = {}
): Promise<Category[]> {
	const docs = await collect(
		fetchAll(client, Prismic.predicates.at("document.type", "section"), options)
	);

	return docs.map((doc) => CategorySchema.cast(doc));
}

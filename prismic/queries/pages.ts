import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "../../lib/async/collect";
import { fetchAll } from "../fetchAll";
import { Page, PageSchema } from "../types/page";

export async function getAllPages(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Page[]> {
	const query = [Prismic.predicates.at("document.type", "page"), ...predicates];

	const docs = await collect(fetchAll(client, query, options));

	return docs.map((doc) => PageSchema.cast(doc));
}

export async function getPage(
	client: DefaultClient,
	uid: string,
	options: QueryOptions = {}
): Promise<Page | null> {
	const doc = await client.getByUID("page", uid, options);

	if (!doc) {
		return null;
	}

	return PageSchema.cast(doc);
}

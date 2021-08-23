import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "../../lib/async/collect";
import { fetchAll } from "../fetchAll";
import { Stockist, StockistSchema } from "../types/stockist";

export async function getAllStockists(
	client: DefaultClient,
	predicates: string[] = [],
	options: QueryOptions = {}
): Promise<Stockist[]> {
	const query = [
		Prismic.predicates.at("document.type", "stockist"),
		...predicates,
	];

	const docs = await collect(fetchAll(client, query, options));

	return docs.map((doc) => StockistSchema.cast(doc));
}

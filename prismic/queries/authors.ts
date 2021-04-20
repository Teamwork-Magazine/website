import Prismic from "@prismicio/client"
import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { collect } from "../../lib/async/collect";
import { fetchAll } from "../fetchAll";
import { Author } from "../types";

export async function all(client: DefaultClient, options?: QueryOptions): Promise<Author[]> {
	const docs = await collect(fetchAll(client, Prismic.predicates.at('document.type', 'author'), options))

	return docs.map(doc => ({
		uid: doc.uid,
		name: doc.data?.name ?? ''
	}))
}

export async function find(client: DefaultClient, uid: string, options?: QueryOptions): Promise<Author | null> {
	const doc = await client.getByUID('author', uid, options)

	if (!doc) {
		return null
	}

	return {
		uid: doc.uid,
		name: doc.data?.name ?? ''
	}
}

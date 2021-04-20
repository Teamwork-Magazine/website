import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";

export async function *fetchAll(client: DefaultClient, q: string | string[], options: QueryOptions = {}) {
	let uids = new Set<string>()
	let page = 1
	let fetchMore = true

	while (fetchMore) {
		let response = await client.query(q, {
			...options,
			pageSize: 100,
			page: page++
		})

		for (const document of response.results) {
			if (uids.has(document.uid)) continue
	
			uids.add(document.uid)
			yield document
		}

		fetchMore = response.next_page !== null
	}
}

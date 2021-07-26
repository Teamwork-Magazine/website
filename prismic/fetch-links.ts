import { QueryOptions } from "@prismicio/client/types/ResolvedApi";

export function withFetchLinks(links: string[]) {
	return function (options: QueryOptions) {
		const existingLinks = normalizeFetchLinks(options.fetchLinks ?? []);
		const dedupedLinks = new Set([...existingLinks, ...links]);

		return {
			...options,
			fetchLinks: Array.from(dedupedLinks),
		};
	};
}

function normalizeFetchLinks(fetchLinks: string | number | string[]): string[] {
	if (Array.isArray(fetchLinks)) return fetchLinks;
	return [fetchLinks.toString()];
}

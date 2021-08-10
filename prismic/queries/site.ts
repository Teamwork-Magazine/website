import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { Site, SiteSchema } from "../types/site";

export async function getSite(
	client: DefaultClient,
	options: QueryOptions = {}
): Promise<Site> {
	const doc = await client.getSingle("site_settings", options);
	return SiteSchema.cast(doc);
}

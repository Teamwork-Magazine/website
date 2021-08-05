import { Client } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { withFetchLinks } from "../fetch-links";
import { Navigation, NavigationSchema } from "../types/navigation";

const transformOptions = withFetchLinks([
	"section.name",
	"page.title",
	"privacy_policy.title",
	"issues_page.title",
	"stockists_page.title",
]);

export async function getNavigation(
	client: Client,
	options: QueryOptions = {}
): Promise<Navigation> {
	// @ts-ignore - The `getSingle` type signature is requiring a callback, but we're not using it and it's not actually necessary.
	const doc = await client.getSingle(
		"site_navigation",
		transformOptions(options)
	);
	return NavigationSchema.cast(doc);
}

import { DefaultClient } from "@prismicio/client/types/client";
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
	client: DefaultClient,
	options: QueryOptions = {}
): Promise<Navigation> {
	const doc = await client.getSingle(
		"site_navigation",
		transformOptions(options)
	);
	return NavigationSchema.cast(doc);
}

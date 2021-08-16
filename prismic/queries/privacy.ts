import { DefaultClient } from "@prismicio/client/types/client";
import { Page, PageSchema } from "../types/page";

export async function getPrivacyPage(
	client: DefaultClient
): Promise<Page | null> {
	const doc = await client.getSingle("privacy_policy", {});

	if (!doc) return null;

	return PageSchema.cast(doc);
}

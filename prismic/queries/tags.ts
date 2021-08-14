import { DefaultClient } from "@prismicio/client/types/client";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { Tag } from "../types/tag";
import { getAllStories } from "./stories";

export async function getAllTags(
	client: DefaultClient,
	options: QueryOptions = {}
): Promise<Tag[]> {
	const tagsBySlug = new Map<string, Tag>();
	const stories = await getAllStories(client, [], options);

	for (const story of stories) {
		for (const tag of story.tags) {
			if (!tagsBySlug.has(tag.slug)) {
				tagsBySlug.set(tag.slug, tag);
			}
		}
	}

	return Array.from(tagsBySlug.values());
}

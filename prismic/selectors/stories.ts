import { Story } from "../types/story";

export function selectLeadStory(stories: Story[]): Story {
	return stories.find((story) => story.featured) ?? stories[0] ?? null;
}

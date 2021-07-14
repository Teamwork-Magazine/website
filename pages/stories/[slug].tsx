import { GetStaticPaths, GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import Article from "../../components/templates/Article";
import { Story } from "../../prismic/types/story";
import * as Stories from "../../fixtures/stories";
import { Navigation } from "../../prismic/types/navigation";
import { getNavigation } from "../../prismic/queries/navigation";
import { createClient } from "../../prismic/client";

const StoryMap = new Map(
	Object.values(Stories).map((story) => [story.slug, story])
);

export interface StoryPageProps {
	story: Story;
	recommendedStories: Story[];
	navigation: Navigation;
}

export default function StoryPage({
	story,
	recommendedStories,
	navigation,
}: StoryPageProps) {
	return (
		<BaseLayout navigation={navigation}>
			<Article story={story} recommendedStories={recommendedStories} />
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<
	StoryPageProps,
	{ slug: string }
> = async ({ params }) => {
	const { slug } = params ?? {};

	const story = StoryMap.get(slug!);

	if (!story) {
		return {
			notFound: true,
		};
	}

	const client = createClient();
	const navigation = await getNavigation(client);

	return {
		props: {
			story,
			recommendedStories: [...StoryMap.values()].filter(
				(otherStory) => otherStory.slug !== story.slug
			),
			navigation,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: false,
		paths: [...StoryMap.values()].map((story) => `/stories/${story.slug}`),
	};
};

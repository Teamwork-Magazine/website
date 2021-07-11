import { GetStaticPaths, GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import Article from "../../components/templates/Article";
import { Story } from "../../prismic/types/story";
import * as Stories from "../../fixtures/stories";

const StoryMap = new Map(
	Object.values(Stories).map((story) => [story.slug, story])
);

export interface StoryPageProps {
	story: Story;
	recommendedStories: Story[];
}

export default function StoryPage({
	story,
	recommendedStories,
}: StoryPageProps) {
	return (
		<BaseLayout>
			<Article story={story} recommendedStories={recommendedStories} />
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<
	StoryPageProps,
	{ slug: string }
> = async ({ params }) => {
	const { slug } = params ?? {};

	const story = StoryMap.get(slug);

	if (!story) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			story,
			recommendedStories: [...StoryMap.values()].filter(
				(otherStory) => otherStory.slug !== story.slug
			),
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: false,
		paths: [...StoryMap.values()].map((story) => `/stories/${story.slug}`),
	};
};

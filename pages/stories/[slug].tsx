import { GetStaticPaths, GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import Article from "../../components/templates/Article";
import { Story } from "../../prismic/types/story";
import * as Stories from "../../fixtures/stories";
import { Navigation } from "../../prismic/types/navigation";
import { getNavigation } from "../../prismic/queries/navigation";
import { createClient } from "../../prismic/client";
import SEO from "../../components/organisms/SEO";
import { RichText } from "prismic-reactjs";
import { getSite } from "../../prismic/queries/site";

const StoryMap = new Map(
	Object.values(Stories).map((story) => [story.slug, story])
);

interface SiteConfig {
	title: string;
	url: string;
}

export interface StoryPageProps {
	story: Story;
	recommendedStories: Story[];
	navigation: Navigation;
	site: SiteConfig;
}

export default function StoryPage({
	story,
	recommendedStories,
	navigation,
	site,
}: StoryPageProps) {
	return (
		<BaseLayout navigation={navigation}>
			<SEO
				title={story.socialTitle ?? story.title}
				description={
					story.socialDescription ??
					(story.blurb
						? RichText.asText(story.blurb)
						: "Read more at Teamwork Magazine")
				}
				siteTitle={site.title}
				url={`${site.url}/stories/${story.slug}`}
				image={story.thumbnail}
				openGraphType="article"
			/>
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
	const [navigation, site] = await Promise.all([
		getNavigation(client),
		getSite(client),
	]);

	return {
		props: {
			story,
			recommendedStories: [...StoryMap.values()].filter(
				(otherStory) => otherStory.slug !== story.slug
			),
			navigation,
			site,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: false,
		paths: [...StoryMap.values()].map((story) => `/stories/${story.slug}`),
	};
};

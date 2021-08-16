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
import { Site } from "../../prismic/types/site";
import {
	getAllStories,
	getSimilarStories,
	getStory,
} from "../../prismic/queries/stories";
import { Routes } from "../../prismic/routes";

const StoryMap = new Map(
	Object.values(Stories).map((story) => [story.slug, story])
);

export interface StoryPageProps {
	story: Story;
	recommendedStories: Story[];
	navigation: Navigation;
	site: Site;
}

export default function StoryPage({
	story,
	recommendedStories,
	navigation,
	site,
}: StoryPageProps) {
	return (
		<BaseLayout site={site} navigation={navigation}>
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
	const slug = params?.slug!;
	const client = createClient();

	const [story, site, navigation] = await Promise.all([
		getStory(client, slug),
		getSite(client),
		getNavigation(client),
	]);

	if (!story) {
		return {
			notFound: true,
		};
	}

	const recommendedStories = await getSimilarStories(client, story.id, [], {
		pageSize: 4,
	});

	return {
		props: {
			story,
			recommendedStories,
			navigation,
			site,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createClient();
	const stories = await getAllStories(client);

	return {
		fallback: false,
		paths: stories.map(({ slug }) => Routes.story({ slug })),
	};
};

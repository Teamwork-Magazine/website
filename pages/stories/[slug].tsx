import { GetStaticPaths } from "next";
import { withLayoutProps } from "../../components/layouts/BaseLayout";
import Article from "../../components/templates/Article";
import { Story } from "../../prismic/types/story";
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

export interface StoryPageProps {
	story: Story;
	recommendedStories: Story[];
	site: Site;
}

export default function StoryPage({
	story,
	recommendedStories,
	site,
}: StoryPageProps) {
	return (
		<>
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
		</>
	);
}

export const getStaticProps = withLayoutProps<StoryPageProps, { slug: string }>(
	async ({ params }) => {
		const slug = params?.slug!;
		const client = createClient();

		const [story, site] = await Promise.all([
			getStory(client, slug),
			getSite(client),
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
				site,
			},
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createClient();
	const stories = await getAllStories(client);

	return {
		fallback: false,
		paths: stories.map(({ slug }) => Routes.story({ slug })),
	};
};

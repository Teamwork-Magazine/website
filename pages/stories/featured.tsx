import { withLayoutProps } from "../../components/layouts/BaseLayout";
import SEO from "../../components/organisms/SEO";
import ArticleIndex from "../../components/templates/ArticleIndex";
import { createClient } from "../../prismic/client";
import { getSite } from "../../prismic/queries/site";
import { getFeaturedStories } from "../../prismic/queries/stories";
import { Routes } from "../../prismic/routes";
import { selectLeadStory } from "../../prismic/selectors/stories";
import { Site } from "../../prismic/types/site";
import { Story } from "../../prismic/types/story";

export interface FeaturedPageProps {
	leadStory: Story | null;
	otherStories: Story[];
	site: Site;
}

export default function FeaturedPage({
	leadStory,
	otherStories,
	site,
}: FeaturedPageProps) {
	return (
		<>
			<SEO
				title="Featured Stories"
				description={`Browse all featured stories from ${site.title}`}
				siteTitle={site.title}
				url={site.url + "/stories/featured"}
			/>
			<ArticleIndex
				breadcrumb={[
					{
						href: Routes.allStories,
						children: "All Stories",
					},
				]}
				heading="Featured"
				leadStory={leadStory}
				otherStories={otherStories}
			/>
		</>
	);
}

export const getStaticProps = withLayoutProps<FeaturedPageProps>(async () => {
	const client = createClient();
	const [stories, site] = await Promise.all([
		getFeaturedStories(client),
		getSite(client),
	]);

	const leadStory = selectLeadStory(stories);

	return {
		props: {
			leadStory,
			otherStories: stories.filter((story) => story !== leadStory),
			site,
		},
	};
});

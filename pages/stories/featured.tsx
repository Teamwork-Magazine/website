import { GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import SEO from "../../components/organisms/SEO";
import ArticleIndex from "../../components/templates/ArticleIndex";
import { createClient } from "../../prismic/client";
import { getNavigation } from "../../prismic/queries/navigation";
import { getSite } from "../../prismic/queries/site";
import { getFeaturedStories } from "../../prismic/queries/stories";
import { Routes } from "../../prismic/routes";
import { selectLeadStory } from "../../prismic/selectors/stories";
import { Navigation } from "../../prismic/types/navigation";
import { Site } from "../../prismic/types/site";
import { Story } from "../../prismic/types/story";

export interface FeaturedPageProps {
	leadStory: Story | null;
	otherStories: Story[];
	navigation: Navigation;
	site: Site;
}

export default function FeaturedPage({
	leadStory,
	otherStories,
	navigation,
	site,
}: FeaturedPageProps) {
	return (
		<BaseLayout site={site} navigation={navigation}>
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
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<FeaturedPageProps> = async () => {
	const client = createClient();
	const [stories, navigation, site] = await Promise.all([
		getFeaturedStories(client),
		getNavigation(client),
		getSite(client),
	]);

	const leadStory = selectLeadStory(stories);

	return {
		props: {
			leadStory,
			otherStories: stories.filter((story) => story !== leadStory),
			navigation,
			site,
		},
	};
};

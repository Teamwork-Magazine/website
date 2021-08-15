import { GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import SEO from "../../components/organisms/SEO";
import ArticleIndex from "../../components/templates/ArticleIndex";
import { createClient } from "../../prismic/client";
import { getNavigation } from "../../prismic/queries/navigation";
import { getSite } from "../../prismic/queries/site";
import { getAllStories } from "../../prismic/queries/stories";
import { Routes } from "../../prismic/routes";
import { selectLeadStory } from "../../prismic/selectors/stories";
import { Navigation } from "../../prismic/types/navigation";
import { Site } from "../../prismic/types/site";
import { Story } from "../../prismic/types/story";

export interface AllStoriesPageProps {
	leadStory: Story | null;
	otherStories: Story[];
	navigation: Navigation;
	site: Site;
}

export default function AllStoriesPage({
	leadStory,
	otherStories,
	navigation,
	site,
}: AllStoriesPageProps) {
	return (
		<BaseLayout site={site} navigation={navigation}>
			<SEO
				title="All Stories"
				description={`Browse all stories from ${site.title}`}
				siteTitle={site.title}
				url={site.url + Routes.allStories}
			/>
			<ArticleIndex
				heading="All Stories"
				leadStory={leadStory}
				otherStories={otherStories}
			/>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<AllStoriesPageProps> = async () => {
	const client = createClient();
	const [stories, navigation, site] = await Promise.all([
		getAllStories(client),
		getNavigation(client),
		getSite(client),
	]);

	const leadStory = selectLeadStory(stories);

	return {
		props: {
			leadStory,
			navigation,
			site,
			otherStories: stories.filter((story) => story !== leadStory),
		},
	};
};

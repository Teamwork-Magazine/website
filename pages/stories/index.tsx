import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";
import BaseLayout from "../../components/layouts/BaseLayout";
import SEO from "../../components/organisms/SEO";
import ArticleIndex from "../../components/templates/ArticleIndex";
import { createClient } from "../../prismic/client";
import { getNavigation } from "../../prismic/queries/navigation";
import { getSite } from "../../prismic/queries/site";
import { getAllStories, getLeadStory } from "../../prismic/queries/stories";
import { Routes } from "../../prismic/routes";
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
		<BaseLayout navigation={navigation}>
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
	const [leadStory, navigation, site] = await Promise.all([
		getLeadStory(client),
		getNavigation(client),
		getSite(client),
	]);

	const otherStories = await getAllStories(
		client,
		leadStory ? [Prismic.predicates.not("document.id", leadStory.id)] : []
	);

	return {
		props: {
			leadStory,
			navigation,
			site,
			otherStories,
		},
	};
};

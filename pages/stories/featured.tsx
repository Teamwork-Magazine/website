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
		<BaseLayout navigation={navigation}>
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
	const predicates = [Prismic.predicates.at("my.story.featured", true)];

	const [leadStory, navigation, site] = await Promise.all([
		getLeadStory(client, predicates),
		getNavigation(client),
		getSite(client),
	]);

	const otherStories = await getAllStories(
		client,
		leadStory
			? predicates.concat(Prismic.predicates.not("document.id", leadStory.id))
			: predicates
	);

	return {
		props: {
			leadStory,
			otherStories,
			navigation,
			site,
		},
	};
};

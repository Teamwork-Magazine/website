import { GetStaticProps } from "next";
import BaseLayout from "../../../components/layouts/BaseLayout";
import SEO from "../../../components/organisms/SEO";
import ArticleIndex from "../../../components/templates/ArticleIndex";
import { createClient } from "../../../prismic/client";
import { getNavigation } from "../../../prismic/queries/navigation";
import { getSite } from "../../../prismic/queries/site";
import { getUncategorizedStories } from "../../../prismic/queries/stories";
import { Routes } from "../../../prismic/routes";
import { selectLeadStory } from "../../../prismic/selectors/stories";
import { Navigation } from "../../../prismic/types/navigation";
import { Site } from "../../../prismic/types/site";
import { Story } from "../../../prismic/types/story";

export interface UncategorizedPageProps {
	leadStory: Story | null;
	otherStories: Story[];
	navigation: Navigation;
	site: Site;
}

export default function UncategorizedPage({
	leadStory,
	otherStories,
	navigation,
	site,
}: UncategorizedPageProps) {
	return (
		<BaseLayout site={site} navigation={navigation}>
			<SEO
				title="Uncategorized"
				description={`Browse all Uncategorized stories from ${site.title}`}
				siteTitle={site.title}
				url={site.url + Routes.category({ slug: "uncategorized" })}
			/>
			<ArticleIndex
				breadcrumb={[
					{
						href: Routes.allStories,
						children: "All Stories",
					},
				]}
				heading="Uncategorized"
				leadStory={leadStory}
				otherStories={otherStories}
				kickerPrefer="tag"
			/>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<UncategorizedPageProps> = async () => {
	const client = createClient();
	const [stories, navigation, site] = await Promise.all([
		getUncategorizedStories(client),
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

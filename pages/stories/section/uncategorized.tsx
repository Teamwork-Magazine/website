import { withLayoutProps } from "../../../components/layouts/BaseLayout";
import SEO from "../../../components/organisms/SEO";
import ArticleIndex from "../../../components/templates/ArticleIndex";
import { createClient } from "../../../prismic/client";
import { getSite } from "../../../prismic/queries/site";
import { getUncategorizedStories } from "../../../prismic/queries/stories";
import { Routes } from "../../../prismic/routes";
import { selectLeadStory } from "../../../prismic/selectors/stories";
import { Site } from "../../../prismic/types/site";
import { Story } from "../../../prismic/types/story";

export interface UncategorizedPageProps {
	leadStory: Story | null;
	otherStories: Story[];
	site: Site;
}

export default function UncategorizedPage({
	leadStory,
	otherStories,
	site,
}: UncategorizedPageProps) {
	return (
		<>
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
		</>
	);
}

export const getStaticProps = withLayoutProps<UncategorizedPageProps>(
	async () => {
		const client = createClient();
		const [stories, site] = await Promise.all([
			getUncategorizedStories(client),
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
	}
);

import { withLayoutProps } from "../../components/layouts/BaseLayout";
import SEO from "../../components/organisms/SEO";
import ArticleIndex from "../../components/templates/ArticleIndex";
import { createClient } from "../../prismic/client";
import { getSite } from "../../prismic/queries/site";
import { getAllStories } from "../../prismic/queries/stories";
import { Routes } from "../../prismic/routes";
import { selectLeadStory } from "../../prismic/selectors/stories";
import { Site } from "../../prismic/types/site";
import { Story } from "../../prismic/types/story";

export interface AllStoriesPageProps {
	leadStory: Story | null;
	otherStories: Story[];
	site: Site;
}

export default function AllStoriesPage({
	leadStory,
	otherStories,
	site,
}: AllStoriesPageProps) {
	return (
		<>
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
		</>
	);
}

export const getStaticProps = withLayoutProps<AllStoriesPageProps>(async () => {
	const client = createClient();
	const [stories, site] = await Promise.all([
		getAllStories(client),
		getSite(client),
	]);

	const leadStory = selectLeadStory(stories);

	return {
		props: {
			leadStory,
			site,
			otherStories: stories.filter((story) => story !== leadStory),
		},
	};
});

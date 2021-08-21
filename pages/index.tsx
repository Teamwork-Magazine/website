import Prismic from "@prismicio/client";
import BaseLayout, { withLayoutProps } from "../components/layouts/BaseLayout";
import { GetStaticProps } from "next";
import { Navigation } from "../prismic/types/navigation";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";
import SEO from "../components/organisms/SEO";
import { Site } from "../prismic/types/site";
import { getSite } from "../prismic/queries/site";
import { Story } from "../prismic/types/story";
import { getLatestStories } from "../prismic/queries/stories";
import ArticleCard from "../components/molecules/ArticleCard";
import Section from "../components/molecules/Section";
import Stack from "../components/atoms/Stack";
import ArticleCardGrid from "../components/organisms/ArticleCardGrid";
import SectionHeader from "../components/molecules/SectionHeader";
import { Routes } from "../prismic/routes";
import { selectLeadStory } from "../prismic/selectors/stories";

export interface HomePageProps {
	leadStory: Story | null;
	site: Site;
	latestStories: Story[];
}

export default function HomePage({
	leadStory,
	site,
	latestStories,
}: HomePageProps) {
	return (
		<>
			<SEO
				title={site.title}
				description={site.description}
				siteTitle={site.title}
				url={site.url}
			/>
			<main>
				<h1 className="u-visually-hidden">Teamwork Magazine</h1>
				{leadStory && (
					<Section lead>
						<h2 className="u-visually-hidden">Lead Story</h2>
						<ArticleCard story={leadStory} level={3} layout="featured" />
					</Section>
				)}
				{latestStories.length > 0 ? (
					<Section>
						<Stack gap="var(--space-l-xl)" className="u-layout-wide">
							<SectionHeader>
								<SectionHeader.Heading>The Latest</SectionHeader.Heading>
								<SectionHeader.Link href={Routes.allStories}>
									All Stories
								</SectionHeader.Link>
							</SectionHeader>
							<ArticleCardGrid stories={latestStories} />
						</Stack>
					</Section>
				) : null}
			</main>
		</>
	);
}

export const getStaticProps = withLayoutProps<HomePageProps>(async () => {
	const client = createClient();
	const [stories, site] = await Promise.all([
		getLatestStories(client, [], { pageSize: 17 }),
		getSite(client),
	]);
	const leadStory = selectLeadStory(stories);

	return {
		props: {
			site,
			leadStory,
			latestStories: stories
				.filter((story) => story !== leadStory)
				.slice(0, 16),
		},
	};
});

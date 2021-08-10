import Prismic from "@prismicio/client";
import BaseLayout from "../components/layouts/BaseLayout";
import { GetStaticProps } from "next";
import { Navigation } from "../prismic/types/navigation";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";
import SEO from "../components/organisms/SEO";
import { Site } from "../prismic/types/site";
import { getSite } from "../prismic/queries/site";
import { Story } from "../prismic/types/story";
import { getLatestStories, getLeadStory } from "../prismic/queries/stories";
import ArticleCard from "../components/molecules/ArticleCard";
import Section from "../components/molecules/Section";
import { getAllCategories } from "../prismic/queries/categories";
import { Category } from "../prismic/types/category";
import Stack from "../components/atoms/Stack";
import ArticleCardGrid from "../components/organisms/ArticleCardGrid";
import SectionHeader from "../components/molecules/SectionHeader";

export interface HomePageProps {
	leadStory: Story | null;
	navigation: Navigation;
	site: Site;
	latestStories: Story[];
}

export default function HomePage({
	leadStory,
	navigation,
	site,
	latestStories,
}: HomePageProps) {
	return (
		<BaseLayout navigation={navigation}>
			<SEO
				title={site.title}
				description={site.description}
				siteTitle={site.title}
				url={`${site.url}/`}
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
								<SectionHeader.Link href="/stories">
									All Stories
								</SectionHeader.Link>
							</SectionHeader>
							<ArticleCardGrid stories={latestStories} />
						</Stack>
					</Section>
				) : null}
			</main>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	const client = createClient();
	const [leadStory, categories, navigation, site] = await Promise.all([
		getLeadStory(client),
		getAllCategories(client),
		getNavigation(client),
		getSite(client),
	]);

	const latestStories = await getLatestStories(
		client,
		leadStory ? [Prismic.predicates.not("document.id", leadStory.id)] : [],
		{ pageSize: 16 }
	);

	return {
		props: {
			leadStory,
			navigation,
			site,
			latestStories,
		},
	};
};

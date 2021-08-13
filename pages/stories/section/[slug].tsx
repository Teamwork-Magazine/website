import Prismic from "@prismicio/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import BaseLayout from "../../../components/layouts/BaseLayout";
import SEO from "../../../components/organisms/SEO";
import ArticleIndex from "../../../components/templates/ArticleIndex";
import { createClient } from "../../../prismic/client";
import {
	getAllCategories,
	getCategory,
} from "../../../prismic/queries/categories";
import { getNavigation } from "../../../prismic/queries/navigation";
import { getSite } from "../../../prismic/queries/site";
import { getAllStories, getLeadStory } from "../../../prismic/queries/stories";
import { Routes } from "../../../prismic/routes";
import { Category } from "../../../prismic/types/category";
import { Navigation } from "../../../prismic/types/navigation";
import { Site } from "../../../prismic/types/site";
import { Story } from "../../../prismic/types/story";

export interface CategoryPageProps {
	category: Category;
	leadStory: Story | null;
	otherStories: Story[];
	navigation: Navigation;
	site: Site;
}

export default function CategoryPage({
	category,
	leadStory,
	otherStories,
	navigation,
	site,
}: CategoryPageProps) {
	return (
		<BaseLayout navigation={navigation}>
			<SEO
				title={category.name}
				description={`Browse all ${category.name} stories from ${site.title}`}
				siteTitle={site.title}
				url={site.url + Routes.category(category)}
			/>
			<ArticleIndex
				breadcrumb={[
					{
						href: Routes.allStories,
						children: "All Stories",
					},
				]}
				heading={category.name}
				leadStory={leadStory}
				otherStories={otherStories}
			/>
		</BaseLayout>
	);
}

interface CategoryPageQuery extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps<
	CategoryPageProps,
	CategoryPageQuery
> = async ({ params }) => {
	const slug = params?.slug!;
	const client = createClient();
	const category = await getCategory(client, slug);

	if (!category) {
		return {
			notFound: true,
		};
	}

	const predicates = [Prismic.predicates.at("my.story.section", category.id)];

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
			category,
			leadStory,
			otherStories,
			navigation,
			site,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createClient();
	const categories = await getAllCategories(client);

	return {
		fallback: false,
		paths: categories.map(({ slug }) => Routes.category({ slug })),
	};
};
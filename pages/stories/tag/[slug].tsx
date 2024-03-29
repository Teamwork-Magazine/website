import { GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { withLayoutProps } from "../../../components/layouts/BaseLayout";
import SEO from "../../../components/organisms/SEO";
import ArticleIndex from "../../../components/templates/ArticleIndex";
import { createClient } from "../../../prismic/client";
import { getSite } from "../../../prismic/queries/site";
import { getStoriesByTag } from "../../../prismic/queries/stories";
import { getAllTags } from "../../../prismic/queries/tags";
import { Routes } from "../../../prismic/routes";
import { selectLeadStory } from "../../../prismic/selectors/stories";
import { Site } from "../../../prismic/types/site";
import { Story } from "../../../prismic/types/story";
import { Tag } from "../../../prismic/types/tag";

export interface TagPageProps {
	tag: Tag;
	leadStory: Story | null;
	otherStories: Story[];
	site: Site;
}

export default function CategoryPage({
	tag,
	leadStory,
	otherStories,
	site,
}: TagPageProps) {
	return (
		<>
			<SEO
				title={tag.name}
				description={`Browse all stories tagged ${tag.name} from ${site.title}`}
				siteTitle={site.title}
				url={site.url + Routes.tag(tag)}
			/>
			<ArticleIndex
				breadcrumb={[
					{
						href: Routes.allStories,
						children: "All Stories",
					},
				]}
				heading={`Tag: ${tag.name}`}
				leadStory={leadStory}
				otherStories={otherStories}
			/>
		</>
	);
}

interface TagPageQuery extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps = withLayoutProps<TagPageProps, { slug: string }>(
	async ({ params }) => {
		const slug = params?.slug;

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const tag = decodeURIComponent(slug);
		const client = createClient();

		const [stories, site] = await Promise.all([
			getStoriesByTag(client, tag),
			getSite(client),
		]);

		if (stories.length === 0) {
			return {
				notFound: true,
			};
		}

		const leadStory = selectLeadStory(stories);

		return {
			props: {
				tag: {
					name: tag,
					slug,
				},
				leadStory,
				otherStories: stories.filter((story) => story !== leadStory),
				site,
			},
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createClient();
	const tags = await getAllTags(client);

	return {
		fallback: false,
		paths: tags.map(({ slug }) => Routes.tag({ slug })),
	};
};

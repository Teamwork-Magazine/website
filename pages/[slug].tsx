import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-reactjs";
import { ParsedUrlQuery } from "querystring";
import BaseLayout from "../components/layouts/BaseLayout";
import SEO from "../components/organisms/SEO";
import PageTemplate from "../components/templates/Page";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";
import { getAllPages, getPage } from "../prismic/queries/pages";
import { getSite } from "../prismic/queries/site";
import { Routes } from "../prismic/routes";
import { Navigation } from "../prismic/types/navigation";
import { Page } from "../prismic/types/page";
import { Site } from "../prismic/types/site";

export interface CatchAllPageProps {
	site: Site;
	navigation: Navigation;
	page: Page;
}

export default function CatchAllPage({
	site,
	navigation,
	page,
}: CatchAllPageProps) {
	const { socialDescription, description } = page;

	return (
		<BaseLayout site={site} navigation={navigation}>
			<SEO
				title={page.socialTitle || page.title}
				description={
					socialDescription ||
					(description
						? RichText.asText(description)
						: "No description provided")
				}
				siteTitle={site.title}
				url={site.url + Routes.page(page)}
			/>
			<PageTemplate page={page} />
		</BaseLayout>
	);
}

interface CatchAllPageQuery extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps<
	CatchAllPageProps,
	CatchAllPageQuery
> = async ({ params }) => {
	const slug = params?.slug!;
	const client = createClient();

	const [page, site, navigation] = await Promise.all([
		getPage(client, slug),
		getSite(client),
		getNavigation(client),
	]);

	if (!page) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			page,
			site,
			navigation,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createClient();
	const pages = await getAllPages(client);

	return {
		fallback: false,
		paths: pages.map(({ slug }) => Routes.page({ slug })),
	};
};

import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { withLayoutProps } from "../components/layouts/BaseLayout";
import SEO from "../components/organisms/SEO";
import PageTemplate from "../components/templates/Page";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";
import { getAllPages, getPage } from "../prismic/queries/pages";
import { getSite } from "../prismic/queries/site";
import { Routes } from "../prismic/routes";
import { Page } from "../prismic/types/page";
import { Site } from "../prismic/types/site";

export interface CatchAllPageProps {
	site: Site;
	page: Page;
}

export default function CatchAllPage({ site, page }: CatchAllPageProps) {
	const { socialDescription, description } = page;

	return (
		<>
			<SEO
				title={page.socialTitle || page.title}
				description={
					socialDescription || description || "No description provided"
				}
				siteTitle={site.title}
				url={site.url + Routes.page(page)}
			/>
			<PageTemplate page={page} />
		</>
	);
}

interface CatchAllPageQuery extends ParsedUrlQuery {
	slug: string;
}

const getStaticProps_: GetStaticProps<
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

export const getStaticProps = withLayoutProps<
	CatchAllPageProps,
	CatchAllPageQuery
>(async ({ params }) => {
	const slug = params?.slug!;
	const client = createClient();

	const [page, site] = await Promise.all([
		getPage(client, slug),
		getSite(client),
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
		},
	};
});

export const getStaticPaths: GetStaticPaths = async () => {
	const client = createClient();
	const pages = await getAllPages(client);

	return {
		fallback: false,
		paths: pages.map(({ slug }) => Routes.page({ slug })),
	};
};

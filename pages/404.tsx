import { GetStaticProps } from "next";
import Head from "next/head";
import BaseLayout from "../components/layouts/BaseLayout";
import SEO from "../components/organisms/SEO";
import ErrorTemplate from "../components/templates/Error";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";
import { getSite } from "../prismic/queries/site";
import { Navigation } from "../prismic/types/navigation";
import { Site } from "../prismic/types/site";

export interface NotFoundPageProps {
	site: Site;
	navigation: Navigation;
}

export default function NotFoundPage({ site, navigation }: NotFoundPageProps) {
	return (
		<BaseLayout site={site} navigation={navigation} centerBody>
			<Head>
				<title>404 - Not Found - {site.title}</title>
				<meta name="description" content="This page could not be found." />
			</Head>
			<ErrorTemplate
				status={404}
				statusText="Not Found"
				message="This page could not be found."
			/>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<NotFoundPageProps> = async () => {
	const client = createClient();
	const [site, navigation] = await Promise.all([
		getSite(client),
		getNavigation(client),
	]);

	return {
		props: {
			site,
			navigation,
		},
	};
};

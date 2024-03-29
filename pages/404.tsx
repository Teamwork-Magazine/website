import Head from "next/head";
import { withLayoutProps } from "../components/layouts/BaseLayout";
import ErrorTemplate from "../components/templates/Error";
import { createClient } from "../prismic/client";
import { getSite } from "../prismic/queries/site";
import { Site } from "../prismic/types/site";

export interface NotFoundPageProps {
	site: Site;
}

export default function NotFoundPage({ site }: NotFoundPageProps) {
	return (
		<>
			<Head>
				<title>404 - Not Found - {site.title}</title>
				<meta name="description" content="This page could not be found." />
			</Head>
			<ErrorTemplate
				status={404}
				statusText="Not Found"
				message="This page could not be found."
			/>
		</>
	);
}

export const getStaticProps = withLayoutProps<NotFoundPageProps>(
	async () => {
		const client = createClient();
		const site = await getSite(client);
		return { props: { site } };
	},
	{ centerBody: true }
);

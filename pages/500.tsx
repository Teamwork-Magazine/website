import Head from "next/head";
import { withLayoutProps } from "../components/layouts/BaseLayout";
import ErrorTemplate from "../components/templates/Error";
import { createClient } from "../prismic/client";
import { getSite } from "../prismic/queries/site";
import { Site } from "../prismic/types/site";

export interface ServerErrorPageProps {
	site: Site;
}

export default function NotFoundPage({ site }: ServerErrorPageProps) {
	return (
		<>
			<Head>
				<title>500 - Server Error - {site.title}</title>
				<meta name="description" content="A server error occurred." />
			</Head>
			<ErrorTemplate
				status={500}
				statusText="Server Error"
				message="A server error occurred."
			/>
		</>
	);
}

export const getStaticProps = withLayoutProps<ServerErrorPageProps>(
	async () => {
		const client = createClient();
		const site = await getSite(client);
		return { props: { site } };
	},
	{ centerBody: true }
);

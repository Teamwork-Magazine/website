import { DateTime } from "luxon";
import { useMemo } from "react";
import { withLayoutProps } from "../components/layouts/BaseLayout";
import SEO from "../components/organisms/SEO";
import PageTemplate from "../components/templates/Page";
import { createClient } from "../prismic/client";
import { getPrivacyPage } from "../prismic/queries/privacy";
import { getSite } from "../prismic/queries/site";
import { Routes } from "../prismic/routes";
import { Page } from "../prismic/types/page";
import { Site } from "../prismic/types/site";

export interface PrivacyPageProps {
	site: Site;
	page: Page;
}

export default function PrivacyPage({ site, page }: PrivacyPageProps) {
	const { updatedAt: rawUpdatedAt } = page;

	const updatedAt = useMemo(() => {
		if (!rawUpdatedAt) return null;

		return DateTime.fromISO(rawUpdatedAt);
	}, [rawUpdatedAt]);

	return (
		<>
			<SEO
				title={page.title}
				description={`Learn more about the ${site.title} privacy policy`}
				siteTitle={site.title}
				url={site.url + Routes.privacy}
			/>
			<PageTemplate page={page}>
				{updatedAt ? (
					<PageTemplate.Footer>
						Last updated:{" "}
						<time dateTime={updatedAt.toISO()}>
							{updatedAt.toLocaleString(DateTime.DATETIME_FULL)}
						</time>
					</PageTemplate.Footer>
				) : null}
			</PageTemplate>
		</>
	);
}

export const getStaticProps = withLayoutProps<PrivacyPageProps>(async () => {
	const client = createClient();
	const [page, site] = await Promise.all([
		getPrivacyPage(client),
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

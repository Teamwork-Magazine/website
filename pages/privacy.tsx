import { DateTime } from "luxon";
import { GetStaticProps } from "next";
import { useMemo } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import SEO from "../components/organisms/SEO";
import PageTemplate from "../components/templates/Page";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";
import { getPrivacyPage } from "../prismic/queries/privacy";
import { getSite } from "../prismic/queries/site";
import { Routes } from "../prismic/routes";
import { Navigation } from "../prismic/types/navigation";
import { Page } from "../prismic/types/page";
import { Site } from "../prismic/types/site";

export interface PrivacyPageProps {
	site: Site;
	navigation: Navigation;
	page: Page;
}

export default function PrivacyPage({
	site,
	navigation,
	page,
}: PrivacyPageProps) {
	const { updatedAt: rawUpdatedAt } = page;

	const updatedAt = useMemo(() => {
		if (!rawUpdatedAt) return null;

		return DateTime.fromISO(rawUpdatedAt);
	}, [rawUpdatedAt]);

	return (
		<BaseLayout site={site} navigation={navigation}>
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
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<PrivacyPageProps> = async () => {
	const client = createClient();
	const [page, site, navigation] = await Promise.all([
		getPrivacyPage(client),
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

import classNames from "classnames";
import flow from "lodash/flow";
import { withLayoutProps } from "../components/layouts/BaseLayout";
import PageLayout from "../components/layouts/PageLayout";
import SEO from "../components/organisms/SEO";
import { withFeatureFlag } from "../lib/feature-flags/getStaticProps";
import { createClient } from "../prismic/client";
import { getSite } from "../prismic/queries/site";
import { getAllStockists } from "../prismic/queries/stockists";
import { Routes } from "../prismic/routes";
import { Site } from "../prismic/types/site";
import { Stockist } from "../prismic/types/stockist";
import styles from "./stockists.module.css";

export interface StockistsPageProps {
	stockists: Stockist[];
	site: Site;
}

export default function StockistsPage({ stockists, site }: StockistsPageProps) {
	return (
		<>
			<SEO
				title="Stockists"
				description={`Find issues of ${site.title} near you`}
				siteTitle={site.title}
				url={Routes.stockists}
			/>
			<PageLayout>
				<PageLayout.Header className="u-layout-wide">
					<h1>Stockists</h1>
				</PageLayout.Header>
				<PageLayout.Body>
					<ul className={classNames(styles.grid, "u-layout-wide")}>
						{stockists.map(({ id, name, location }) => (
							<li key={id}>
								<article className={styles.stockist}>
									<h2 className={styles.name}>{name}</h2>
									{location && <p className={styles.location}>{location}</p>}
								</article>
							</li>
						))}
					</ul>
				</PageLayout.Body>
			</PageLayout>
		</>
	);
}

const wrapStaticProps = flow(withFeatureFlag("STOCKISTS"), withLayoutProps);
export const getStaticProps = wrapStaticProps<StockistsPageProps>(async () => {
	const client = createClient();
	const [stockists, site] = await Promise.all([
		getAllStockists(client),
		getSite(client),
	]);

	return {
		props: {
			stockists: stockists.filter((stockist) => stockist.name),
			site,
		},
	};
});

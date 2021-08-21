import { GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";
import { createClient } from "../../prismic/client";
import { getNavigation } from "../../prismic/queries/navigation";
import { getSite } from "../../prismic/queries/site";
import { Navigation } from "../../prismic/types/navigation";
import { Site } from "../../prismic/types/site";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import styles from "./BaseLayout.module.css";

export interface BaseLayoutProps {
	site: Site;
	navigation: Navigation;
	centerBody?: boolean;
	children?: ReactNode;
}

export default function BaseLayout({
	site,
	navigation,
	centerBody,
	children,
}: BaseLayoutProps) {
	return (
		<>
			<Header
				sections={navigation.sections
					.filter((item) => item.isInHeader)
					.map((item) => item.section)}
				pages={navigation.pages
					.filter((item) => item.isInHeader)
					.map((item) => item.page)}
			/>
			<div className={styles.body} data-center={centerBody}>
				{children}
			</div>
			<Footer
				className={styles.footer}
				site={site}
				categories={navigation.sections
					.filter((item) => item.isInFooter)
					.map((item) => item.section)}
				pages={navigation.pages
					.filter((item) => item.isInFooter)
					.map((item) => item.page)}
			/>
		</>
	);
}

type WithLayoutProps<P extends Record<string, any>> = P & {
	layoutProps: Omit<BaseLayoutProps, "children">;
};

export function withLayoutProps<
	P extends Record<string, any> = Record<string, any>,
	Q extends ParsedUrlQuery = ParsedUrlQuery
>(
	getStaticProps: GetStaticProps<P, Q>,
	otherProps?: Pick<BaseLayoutProps, "centerBody">
): GetStaticProps<WithLayoutProps<P>, Q> {
	return async (context) => {
		const result = await getStaticProps(context);

		if (!hasProps(result)) {
			return result;
		}

		const client = createClient();
		const [navigation, site] = await Promise.all([
			getNavigation(client),
			getSite(client),
		]);

		return {
			...result,
			props: {
				...result.props,
				layoutProps: {
					...otherProps,
					navigation,
					site,
				},
			},
		};
	};
}

function hasProps<P extends Record<string, any>>(
	result: GetStaticPropsResult<P>
): result is { props: P } {
	return typeof (result as { props: P }).props !== "undefined";
}

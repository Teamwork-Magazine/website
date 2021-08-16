import { ReactNode } from "react";
import { Navigation } from "../../prismic/types/navigation";
import { Site } from "../../prismic/types/site";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import styles from "./BaseLayout.module.css";

export interface BaseLayoutProps {
	site: Site;
	navigation: Navigation;
	children?: ReactNode;
}

export default function BaseLayout({
	site,
	navigation,
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
			<div>{children}</div>
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

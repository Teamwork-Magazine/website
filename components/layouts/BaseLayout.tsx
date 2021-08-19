import { ReactNode } from "react";
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

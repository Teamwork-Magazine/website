import classNames from "classnames";
import { ReactNode } from "react";
import { Page, PageSlice } from "../../prismic/types/page";
import RichTextSection from "../organisms/RichTextSection";
import styles from "./Page.module.css";

export interface PageTemplateProps {
	page: Page;
	children?: ReactNode;
}

export default function PageTemplate({ page, children }: PageTemplateProps) {
	return (
		<main>
			<article className={classNames(styles.article, "u-layout-grid")}>
				<header className={styles.header}>
					<h1>{page.title}</h1>
				</header>
				<div className={classNames(styles.body, "u-layout-grid")}>
					{page.body.map((slice, i) => (
						<PageBodySlice slice={slice} key={i} />
					))}
				</div>
				{children}
			</article>
		</main>
	);
}

export interface PageTemplateFooterProps {
	className?: string;
	children?: ReactNode;
}

PageTemplate.Footer = function PageTemplateFooter({
	className,
	children,
}: PageTemplateFooterProps) {
	return (
		<footer className={className}>
			<div className={styles.metadata}>{children}</div>
		</footer>
	);
};

interface PageBodySliceProps {
	slice: PageSlice;
}

function PageBodySlice({ slice }: PageBodySliceProps) {
	switch (slice.type) {
		case "rich-text":
			return <RichTextSection slice={slice} />;
		default:
			return null;
	}
}

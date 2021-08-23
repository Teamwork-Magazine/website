import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./PageLayout.module.css";

export interface PageLayoutProps {
	className?: string;
	children?: ReactNode;
}

export default function PageLayout({ className, children }: PageLayoutProps) {
	return (
		<main>
			<article
				className={classNames(styles.article, className, "u-layout-grid")}
			>
				{children}
			</article>
		</main>
	);
}

export type PageLayoutHeaderProps = PageLayoutProps;

PageLayout.Header = function PageLayoutHeader({
	className,
	children,
}: PageLayoutHeaderProps) {
	return (
		<header className={classNames(styles.header, className)}>{children}</header>
	);
};

export type PageLayoutBodyProps = PageLayoutProps;

PageLayout.Body = function PageLayoutBody({
	className,
	children,
}: PageLayoutBodyProps) {
	return (
		<div className={classNames(styles.body, className, "u-layout-grid")}>
			{children}
		</div>
	);
};

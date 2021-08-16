import React, { ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";
import { CategoryLink } from "../../prismic/types/category";
import { PageLink } from "../../prismic/types/page";
import { Routes } from "../../prismic/routes";
import styles from "./Footer.module.css";
import { Site } from "../../prismic/types/site";

export interface FooterProps {
	site: Site;
	categories: CategoryLink[];
	pages: PageLink[];
	className?: string;
}

export default function Footer({
	site,
	categories,
	pages,
	className,
}: FooterProps) {
	return (
		<footer className={classNames(styles.footer, "u-layout-grid", className)}>
			<div className={classNames(styles.primary, "u-layout-wide")}>
				<nav className={styles.nav} aria-label="Footer links">
					<ul className={styles.list} aria-label="Categories">
						{categories.map(({ slug, name }) => (
							<FooterNavItem key={slug} href={Routes.category({ slug })}>
								{name}
							</FooterNavItem>
						))}
						<FooterNavItem href={Routes.allStories}>All Stories</FooterNavItem>
					</ul>
					<ul className={styles.list} aria-label="Other pages">
						{pages.map(({ slug, title }) => (
							<FooterNavItem key={slug} href={Routes.page({ slug })}>
								{title}
							</FooterNavItem>
						))}
					</ul>
				</nav>
			</div>
			<div className={"u-layout-grid"}>
				<small className={classNames(styles.legal, "u-layout-wide")}>
					Copyright &copy; {new Date().getFullYear()} {site.title}
				</small>
			</div>
		</footer>
	);
}

interface FooterNavItemProps {
	href: string;
	group?: string;
	children?: ReactNode;
}

function FooterNavItem({ href, children }: FooterNavItemProps) {
	return (
		<li className={styles.item}>
			<Link href={href}>
				<a className={styles.link}>{children}</a>
			</Link>
		</li>
	);
}

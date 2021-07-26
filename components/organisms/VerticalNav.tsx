import classNames from "classnames";
import { SectionLink } from "../../prismic/types/section";
import { PageLink } from "../../prismic/types/page";
import styles from "./VerticalNav.module.css";
import AccentHeading from "../atoms/AccentHeading";
import Link from "next/link";
import { UIEventHandler } from "react";

export interface VerticalNavProps {
	className?: string;
	sections: SectionLink[];
	pages: PageLink[];
	onScroll?: UIEventHandler<HTMLDivElement>;
}

export default function VerticalNav({
	className,
	sections,
	pages,
	onScroll,
}: VerticalNavProps) {
	return (
		<div
			className={classNames(styles.container, className)}
			onScroll={onScroll}
		>
			<nav
				className={styles.nav}
				aria-labelledby="vertical-nav-sections"
				data-weight="primary"
			>
				<AccentHeading
					className={styles.heading}
					level={2}
					id="vertical-nav-sections"
				>
					Sections
				</AccentHeading>
				<ul className={styles.list}>
					{sections.map(({ slug, name }) => (
						<li key={slug} className={styles.item}>
							<Link href={`/stories/sections/${slug}`}>
								<a className={styles.link}>{name}</a>
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<nav
				className={styles.nav}
				aria-labelledby="vertical-nav-pages"
				data-weight="secondary"
			>
				<AccentHeading
					className="u-visually-hidden"
					level={2}
					id="vertical-nav-pages"
				>
					Other links
				</AccentHeading>
				<ul className={styles.list}>
					{pages.map(({ slug, title }) => (
						<li key={slug} className={classNames(styles.padded, styles.item)}>
							<Link href={`/${slug}`}>
								<a className={styles.link}>{title}</a>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

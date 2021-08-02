import React from "react";
import classNames from "classnames";
import Link from "next/link";
import styles from "./Header.module.css";
import { SectionLink } from "../../prismic/types/section";
import { PageLink } from "../../prismic/types/page";
import extendedLogo from "../../public/logo-extended.svg";
import condensedLogo from "../../public/logo-condensed.svg";
import Image from "next/image";
import { resizeToHeight } from "../../lib/images/resize";
import ResizableNavList from "../molecules/ResizableNavList";
import NavMenu from "./NavDrawer";

export interface HeaderProps {
	sections: SectionLink[];
	pages: PageLink[];
}

export default function Header({ sections, pages }: HeaderProps) {
	return (
		<header className={classNames(styles.header, "u-layout-grid")}>
			<nav className={classNames(styles.nav, "u-layout-wide")}>
				{/* Extended logo for wide displays */}
				<Link href="/">
					<a className={styles.home} data-logo-layout="extended">
						<Image
							className={styles.logo}
							src={resizeToHeight(extendedLogo, 20)}
							alt="Homepage, Teamwork Magazine logo"
							layout="fixed"
						/>
					</a>
				</Link>
				{/* Condensed logo for narrow displays */}
				<Link href="/">
					<a className={styles.home} data-logo-layout="condensed">
						<Image
							className={styles.logo}
							src={resizeToHeight(condensedLogo, 40)}
							alt="Homepage, Teamwork Magazine logo"
						/>
					</a>
				</Link>
				<ResizableNavList className={classNames(styles.list, styles.left)}>
					{sections.map((section) => (
						<Link key={section.slug} href={`/stories/sections/${section.slug}`}>
							<a className={styles.link}>{section.name}</a>
						</Link>
					))}
				</ResizableNavList>
				<div className={styles.right}>
					<ResizableNavList className={styles.list}>
						{pages.map((page) => (
							<Link key={page.slug} href={`/${page.slug}`}>
								<a className={styles.link}>{page.title}</a>
							</Link>
						))}
					</ResizableNavList>
					<NavMenu sections={sections} pages={pages} />
				</div>
			</nav>
		</header>
	);
}

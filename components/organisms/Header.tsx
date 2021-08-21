import React from "react";
import classNames from "classnames";
import Link from "next/link";
import styles from "./Header.module.css";
import { CategoryLink } from "../../prismic/types/category";
import { PageLink } from "../../prismic/types/page";
import extendedLogo from "../../public/logo-extended.svg";
import condensedLogo from "../../public/logo-condensed.svg";
import Image from "next/image";
import { resizeToHeight } from "../../lib/images/resize";
import NavMenu from "./NavDrawer";
import NavList, { NavLinkPriority, NavListLink } from "../molecules/NavList";
import SkipLink from "../atoms/SkipLink";
import { Routes } from "../../prismic/routes";

export interface HeaderProps {
	sections: CategoryLink[];
	pages: PageLink[];
}

export default function Header({ sections, pages }: HeaderProps) {
	return (
		<header className={classNames(styles.header, "u-layout-grid")}>
			<nav
				className={classNames(styles.nav, "u-layout-wide")}
				role="navigation"
				aria-label="Main navigation"
			>
				<SkipLink />
				{/* Extended logo for wide displays */}
				<Link href="/">
					<a className={styles.home} data-logo-layout="extended">
						<Image
							className={styles.logo}
							src={resizeToHeight(extendedLogo, 20)}
							alt="Homepage, Teamwork Magazine logo"
							priority
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
							priority
						/>
					</a>
				</Link>
				<NavList className={styles.list} label="Sections">
					{sections.slice(0, 3).map(({ slug, name }, i) => {
						return (
							<NavListLink
								key={slug}
								href={Routes.category({ slug })}
								priority={getPriority(i)}
							>
								{name}
							</NavListLink>
						);
					})}
					<NavListLink href={Routes.allStories} priority="primary">
						All Stories
					</NavListLink>
				</NavList>
				<div className={styles.right}>
					<NavList className={styles.list} label="Other pages">
						{pages.slice(0, 3).map(({ title, slug }, i) => {
							return (
								<NavListLink
									key={slug}
									href={Routes.page({ slug })}
									priority={getPriority(i)}
								>
									{title}
								</NavListLink>
							);
						})}
					</NavList>
					<NavMenu sections={sections} pages={pages} />
				</div>
			</nav>
		</header>
	);
}

function getPriority(index: number): NavLinkPriority {
	switch (index) {
		case 0:
			return "primary";
		case 1:
			return "secondary";
		default:
			return "tertiary";
	}
}

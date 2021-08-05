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
import NavMenu from "./NavDrawer";
import NavList, { NavLinkPriority, NavListLink } from "../molecules/NavList";
import SkipLink from "../atoms/SkipLink";

export interface HeaderProps {
	sections: SectionLink[];
	pages: PageLink[];
}

export default function Header({ sections, pages }: HeaderProps) {
	return (
		<>
			<SkipLink />
			<header className={classNames(styles.header, "u-layout-grid")}>
				<nav
					className={classNames(styles.nav, "u-layout-wide")}
					role="navigation"
					aria-label="Main navigation"
				>
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
					<NavList className={styles.list} label="Sections">
						{sections.slice(0, 3).map((section, i) => {
							let priority: NavLinkPriority;
							switch (i) {
								case 0:
									priority = "primary";
									break;
								case 1:
									priority = "secondary";
								default:
									priority = "tertiary";
									break;
							}

							return (
								<NavListLink
									key={section.slug}
									href={`/stories/sections/${section.slug}`}
									priority={priority}
								>
									{section.name}
								</NavListLink>
							);
						})}
						<NavListLink href={`/stories`} priority="primary">
							All Stories
						</NavListLink>
					</NavList>
					<div className={styles.right}>
						<NavList className={styles.list} label="Other pages">
							{pages.slice(0, 4).map((page, i) => {
								let priority: NavLinkPriority;
								switch (i) {
									case 0:
										priority = "primary";
										break;
									case 1:
										priority = "secondary";
										break;
									default:
										priority = "tertiary";
										break;
								}

								return (
									<NavListLink
										key={page.slug}
										href={`/${page.slug}`}
										priority={priority}
									>
										{page.title}
									</NavListLink>
								);
							})}
						</NavList>
						<NavMenu sections={sections} pages={pages} />
					</div>
				</nav>
			</header>
		</>
	);
}

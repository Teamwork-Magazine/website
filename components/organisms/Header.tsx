import React from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import Logo from "../atoms/Logo";
import styles from "./Header.module.css";
import { SectionLink } from "../../prismic/types/section";
import { PageLink } from "../../prismic/types/page";
import MenuIcon from "../atoms/icons/Menu";
import CloseIcon from "../atoms/icons/Close";
import VerticalNav from "./VerticalNav";
import { useState } from "react";

export interface HeaderProps {
	sections: SectionLink[];
	pages: PageLink[];
}

export default function Header({ sections, pages }: HeaderProps) {
	const [isDrawerScrolled, setIsDrawerScrolled] = useState(false);

	return (
		<Popover as="header" className={classNames(styles.header)}>
			{({ open }) => (
				<>
					<nav className={classNames(styles.nav, "u-layout-grid")}>
						<div className={classNames(styles.masthead, "u-layout-wide")}>
							<Link href="/">
								<a className={styles.home}>
									<Logo className={styles.logo} />
								</a>
							</Link>
						</div>
						<ul className={classNames(styles.sections, "u-layout-wide")}>
							{sections.map((section) => (
								<li className={classNames(styles.item)} key={section.slug}>
									<Link href={`/stories/sections/${section.slug}`}>
										<a className={classNames(styles.link)}>{section.name}</a>
									</Link>
								</li>
							))}
							<li className={styles.item}>
								<Link href={`/stories`}>
									<a className={classNames(styles.link)}>All Stories</a>
								</Link>
							</li>
						</ul>
						<Popover.Button className={styles.toggle} data-open={open}>
							<MenuIcon aria-label="Navigation menu" />
						</Popover.Button>
					</nav>
					<AnimatePresence>
						{open && (
							<Popover.Overlay
								static
								as={motion.div}
								className={styles.overlay}
								initial={{ opacity: 0 }}
								animate={{ opacity: 0.75 }}
								exit={{ opacity: 0 }}
								transition={{ type: "tween", duration: 0.2 }}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{open && (
							<Popover.Panel
								static
								focus
								as={motion.div}
								className={styles.drawer}
								initial={{
									x: "100%",
									boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0)",
									opacity: 0,
								}}
								animate={{
									x: 0,
									boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.2)",
									opacity: 1,
								}}
								exit={{
									x: "100%",
									boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0)",
									opacity: 0,
								}}
								transition={{
									default: {
										duration: 0.3,
									},
									x: {
										type: "spring",
										bounce: 0,
									},
								}}
							>
								<motion.div
									className={styles.drawerHeader}
									animate={isDrawerScrolled ? "raised" : "resting"}
									variants={{
										resting: { boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0)" },
										raised: { boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.12)" },
									}}
								>
									<Popover.Button className={styles.close}>
										<CloseIcon
											aria-label="Close navigation menu"
											stroke="currentColor"
										/>
									</Popover.Button>
								</motion.div>
								<VerticalNav
									sections={sections}
									pages={pages}
									onScroll={(e) =>
										setIsDrawerScrolled(e.currentTarget.scrollTop > 0)
									}
								/>
							</Popover.Panel>
						)}
					</AnimatePresence>
				</>
			)}
		</Popover>
	);
}

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

export interface HeaderProps {
	sections: SectionLink[];
	pages: PageLink[];
}

const overlayVariants = {
	open: { opacity: 1 },
	closed: { opacity: 0 },
};

const drawerVariants = {
	open: { x: 0 },
	closed: { x: "100%" },
};

export default function Header({ sections, pages }: HeaderProps) {
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
										<a className={styles.link}>{section.name}</a>
									</Link>
								</li>
							))}
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
								animate={{ opacity: 0.667 }}
								exit={{ opacity: 0 }}
								transition={{ type: "tween", duration: 0.2 }}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{open && (
							<Popover.Panel
								static
								as={motion.div}
								className={styles.drawer}
								initial={{ x: "100%" }}
								animate={{ x: 0 }}
								exit={{ x: "100%" }}
								transition={{ type: "spring", bounce: 0, duration: 0.4 }}
							>
								<Popover.Button>
									<CloseIcon aria-label="Close navigation menu" />
								</Popover.Button>
							</Popover.Panel>
						)}
					</AnimatePresence>
				</>
			)}
		</Popover>
	);
}

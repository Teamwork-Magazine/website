import { Popover } from "@headlessui/react";
import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { PageLink } from "../../prismic/types/page";
import { SectionLink } from "../../prismic/types/section";
import CloseIcon from "../atoms/icons/Close";
import MenuIcon from "../atoms/icons/Menu";
import styles from "./NavDrawer.module.css";

export interface NavMenuProps {
	className?: string;
	sections: SectionLink[];
	pages: PageLink[];
}

const overlayVariants: Variants = {
	open: {
		opacity: 0.5,
	},
	closed: {
		opacity: 0,
	},
};

const drawerVariants: Variants = {
	open: {
		x: 0,
		opacity: 1,
	},
	closed: {
		x: "100%",
		opacity: 0,
	},
};

const itemVariants: Variants = {
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			y: {
				type: "spring",
				damping: 25,
				mass: 0.6,
			},
			delay: 0.15 * i + 0.2,
		},
	}),
	hidden: {
		opacity: 0,
		y: "100%",
	},
};

export default function NavMenu({ sections, pages, className }: NavMenuProps) {
	return (
		<Popover className={classNames(styles.menu, className)}>
			{({ open }) => {
				return (
					<>
						<Popover.Button className={styles.toggle}>
							<MenuIcon aria-label="Navigation menu" />
						</Popover.Button>
						<AnimatePresence>
							{open && (
								<Popover.Overlay
									static
									as={motion.div}
									className={styles.overlay}
									variants={overlayVariants}
									initial="closed"
									animate={open ? "open" : "closed"}
									exit="closed"
								/>
							)}
						</AnimatePresence>
						<AnimatePresence>
							{open && (
								<Popover.Panel
									static
									focus
									as={motion.div}
									variants={drawerVariants}
									initial="closed"
									animate={open ? "open" : "closed"}
									exit="closed"
									className={styles.drawer}
									transition={{
										x: {
											type: "spring",
											bounce: 0,
											duration: 0.4,
										},
										default: {
											duration: 0.2,
										},
									}}
								>
									<div className={styles.controls}>
										<Popover.Button className={styles.close}>
											<CloseIcon
												className={styles.closeIcon}
												aria-label="Close menu"
											/>
										</Popover.Button>
									</div>
									<div className={styles.contents}>
										<ul className={styles.list} aria-label="Categories">
											{sections.map((section, i) => (
												<motion.li
													key={section.slug}
													className={styles.item}
													variants={itemVariants}
													custom={i}
													initial="hidden"
													animate={"visible"}
												>
													<Link href={`/stories/sections/${section.slug}`}>
														<a className={styles.link} data-weight="primary">
															{section.name}
														</a>
													</Link>
												</motion.li>
											))}
										</ul>
										<ul className={styles.list} aria-label="Other pages">
											{pages.map((page, i) => (
												<motion.li
													key={page.slug}
													className={styles.item}
													variants={itemVariants}
													custom={sections.length + i}
													initial="hidden"
													animate={"visible"}
												>
													<Link href={`/${page.slug}`}>
														<a className={styles.link} data-weight="secondary">
															{page.title}
														</a>
													</Link>
												</motion.li>
											))}
										</ul>
									</div>
								</Popover.Panel>
							)}
						</AnimatePresence>
					</>
				);
			}}
		</Popover>
	);
}

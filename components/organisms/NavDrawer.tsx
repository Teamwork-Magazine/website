import { Popover } from "@headlessui/react";
import classNames from "classnames";
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	Variants,
} from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { ReactNode } from "react";
import { PageLink } from "../../prismic/types/page";
import { CategoryLink } from "../../prismic/types/category";
import CloseIcon from "../atoms/icons/Close";
import MenuIcon from "../atoms/icons/Menu";
import styles from "./NavDrawer.module.css";
import { Routes } from "../../prismic/routes";

export interface NavMenuProps {
	className?: string;
	sections: CategoryLink[];
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

export default function NavMenu({ sections, pages, className }: NavMenuProps) {
	const shouldReduceMotion = useReducedMotion();

	const drawerVariants: Variants = useMemo(
		() => ({
			open: {
				x: 0,
				opacity: 1,
			},
			closed: {
				x: shouldReduceMotion ? 0 : "100%",
				opacity: 0,
			},
		}),
		[shouldReduceMotion]
	);

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
										<ul
											className={styles.list}
											aria-label="Sections"
											data-weight="primary"
										>
											{sections.map(({ slug, name }, i) => (
												<NavDrawerLink
													key={slug}
													index={i}
													href={Routes.category({ slug })}
												>
													{name}
												</NavDrawerLink>
											))}
											<NavDrawerLink
												index={sections.length}
												href={Routes.allStories}
											>
												All Stories
											</NavDrawerLink>
										</ul>
										<ul
											className={styles.list}
											aria-label="Other pages"
											data-weight="secondary"
										>
											{pages.map(({ slug, title }, i) => (
												<NavDrawerLink
													key={slug}
													index={sections.length + 1 + i}
													href={Routes.page({ slug })}
												>
													{title}
												</NavDrawerLink>
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

interface NavDrawerLinkProps {
	href: string;
	index: number;
	children: ReactNode;
}

function NavDrawerLink({ href, index, children }: NavDrawerLinkProps) {
	const shouldReduceMotion = useReducedMotion();

	const variants: Variants = useMemo(
		() => ({
			visible: (i: number) => ({
				opacity: 1,
				y: 0,
				transition: {
					y: {
						type: "spring",
						damping: 25,
						mass: 0.6,
					},
					delay: shouldReduceMotion ? 0.2 : (Math.sqrt(i) + 1) * 0.2,
				},
			}),
			hidden: {
				opacity: 0,
				y: shouldReduceMotion ? 0 : "100%",
			},
		}),
		[shouldReduceMotion]
	);

	return (
		<motion.li
			className={styles.item}
			variants={variants}
			custom={index}
			initial="hidden"
			animate="visible"
		>
			<Link href={href}>
				<a className={styles.link}>{children}</a>
			</Link>
		</motion.li>
	);
}

import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./NavList.module.css";

export interface NavListProps {
	label: string;
	className?: string;
	children: ReactNode;
}

export default function NavList({ className, label, children }: NavListProps) {
	return (
		<ul className={classNames(styles.list, className)} aria-label={label}>
			{children}
		</ul>
	);
}

export type NavLinkPriority = "primary" | "secondary" | "tertiary";

export interface NavListLinkProps {
	href: string;
	className?: string;
	priority?: NavLinkPriority;
	children: ReactNode;
}

export function NavListLink({
	href,
	className,
	priority = "tertiary",
	children,
}: NavListLinkProps) {
	return (
		<li className={classNames(styles.item, className)} data-priority={priority}>
			<Link href={href}>
				<a className={styles.link}>{children}</a>
			</Link>
		</li>
	);
}

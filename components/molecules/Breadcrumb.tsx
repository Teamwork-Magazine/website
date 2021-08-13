import classNames from "classnames";
import Link from "next/link";
import { Children, ReactNode } from "react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
	className?: string;
	label?: string;
	children?: ReactNode;
}

export default function Breadcrumb({
	className,
	label = "Breadcrumb",
	children,
}: BreadcrumbProps) {
	return (
		<nav
			className={classNames(styles.breadcrumb, "u-text-accent", className)}
			aria-label={label}
		>
			<ul className={styles.list}>
				{Children.map(children, (child) => (
					<li className={styles.item}>{child}</li>
				))}
			</ul>
		</nav>
	);
}

export interface BreadcrumbLinkProps {
	className?: string;
	href: string;
	children: ReactNode;
}

Breadcrumb.Link = function BreadcrumbLink({
	className,
	href,
	children,
}: BreadcrumbLinkProps) {
	return (
		<Link href={href}>
			<a className={classNames(styles.link, className)}>{children}</a>
		</Link>
	);
};

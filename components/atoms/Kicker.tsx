import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Kicker.module.css";

export type KickerSize = "md" | "lg";

export interface KickerProps {
	size?: KickerSize;
	href?: string;
	className?: string;
	children?: ReactNode;
}

export default function Kicker({
	size = "md",
	className,
	href,
	children,
}: KickerProps) {
	const props = {
		className: classNames(
			styles.kicker,
			"u-text-accent",
			"u-text-caps",
			className
		),
		"data-size": size,
	};

	if (href) {
		return (
			<Link href={href}>
				<a {...props}>{children}</a>
			</Link>
		);
	}

	return <p {...props}>{children}</p>;
}

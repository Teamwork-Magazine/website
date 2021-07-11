import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Blurb.module.css";

export type BlurbSize = "md" | "lg";

export interface BlurbProps {
	size?: BlurbSize;
	className?: string;
	children?: ReactNode;
}

export default function Blurb({
	className,
	size = "md",
	children,
}: BlurbProps) {
	return (
		<div className={classNames(styles.blurb, className)} data-size={size}>
			{children}
		</div>
	);
}

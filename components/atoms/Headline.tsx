import { ReactNode } from "react";
import classNames from "classnames";
import Heading, { HeadingLevel } from "./Heading";
import styles from "./Headline.module.css";

export type HeadlineSize = "md" | "lg" | "xl";

export interface HeadlineProps {
	accent?: boolean;
	level?: HeadingLevel;
	size?: HeadlineSize;
	className?: string;
	children?: ReactNode;
}

export default function Headline({
	accent,
	level = 1,
	size = "md",
	className,
	children,
}: HeadlineProps) {
	return (
		<Heading
			className={classNames(styles.headline, className)}
			data-accent={accent ? true : undefined}
			data-size={size}
			level={level}
		>
			{children}
		</Heading>
	);
}

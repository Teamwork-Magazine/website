import { ReactNode } from "react";
import classNames, { Argument } from "classnames";
import Heading, { HeadingLevel } from "./Heading";

export type HeadlineSize = "md" | "lg" | "xl";

export interface HeadlineProps {
	accent?: boolean;
	level?: HeadingLevel;
	size?: HeadlineSize;
	className?: Argument;
	children?: ReactNode;
}

export default function Headline({
	accent = false,
	level = 1,
	size,
	className,
	children,
}: HeadlineProps) {
	return (
		<Heading
			className={classNames(className)}
			data-accent={accent}
			data-size={size}
			level={level}
		>
			{children}
		</Heading>
	);
}

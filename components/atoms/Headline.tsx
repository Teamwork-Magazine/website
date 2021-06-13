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
	size = "md",
	className,
	children,
}: HeadlineProps) {
	return (
		<Heading
			className={classNames(
				"font-bold",
				{
					"text-xl": size === "md",
					"text-3xl lg:text-4xl": size === "lg",
					"text-4xl md:text-5xl lg:text-6xl": size === "xl",
				},
				accent ? "font-accent" : "font-headline",
				className
			)}
			level={level}
		>
			{children}
		</Heading>
	);
}

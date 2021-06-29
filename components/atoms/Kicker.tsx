import classNames, { Argument } from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

export type KickerSize = "md" | "lg";

export interface KickerProps {
	href: string;
	size?: KickerSize;
	className?: Argument;
	children: ReactNode;
}

export default function Kicker({
	href,
	size = "md",
	className,
	children,
}: KickerProps) {
	return (
		<Link href={href}>
			<a
				className={classNames(
					"text-red-600",
					"font-accent",
					"uppercase",
					"tracking-wider",
					"leading-none",
					{
						"lg:text-xl": size === "lg",
					},
					className
				)}
			>
				{children}
			</a>
		</Link>
	);
}

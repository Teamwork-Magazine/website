import classNames, { Argument } from "classnames";
import { ReactNode } from "react";

export interface ContainerProps {
	className?: Argument;
	flush?: boolean;
	children?: ReactNode;
}

export default function Container({
	className,
	flush = false,
	children,
}: ContainerProps) {
	return (
		<div
			className={classNames(
				"max-w-8xl",
				"mx-auto",
				["gap-x-5", "md:gap-x-8", "lg:gap-x-16"],
				!flush && ["px-5", "md:px-8", "lg:px-16"],
				className
			)}
		>
			{children}
		</div>
	);
}

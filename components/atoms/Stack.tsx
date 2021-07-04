import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";

interface StackProps {
	gap?: string;
	className?: string;
	children?: ReactNode;
}

export default function Stack({
	gap = "var(--space-m)",
	className,
	children,
}: StackProps) {
	return (
		<div
			className={classNames("u-flow", className)}
			style={{ "--flow-gap": gap } as CSSProperties}
		>
			{children}
		</div>
	);
}

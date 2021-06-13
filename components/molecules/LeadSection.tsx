import classNames, { Argument } from "classnames";
import Container from "components/atoms/Container";
import { ReactNode } from "react";

export interface LeadSectionProps {
	className?: Argument;
	children?: ReactNode;
}

export default function LeadSection({ className, children }: LeadSectionProps) {
	return (
		<Container>
			<section
				className={classNames(
					"py-8",
					"border-b",
					"border-gray-300",
					"md:py-16",
					"lg:pt-20",
					className
				)}
			>
				{children}
			</section>
		</Container>
	);
}

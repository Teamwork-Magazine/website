import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./Section.module.css";

export interface SectionProps {
	className?: string;
	children?: ReactNode;
	lead?: boolean;
}

export default function Section({ className, children, lead }: SectionProps) {
	return (
		<section
			className={classNames(styles.section, "u-layout-grid", className)}
			data-lead={lead}
		>
			{children}
		</section>
	);
}

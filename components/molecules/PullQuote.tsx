import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./PullQuote.module.css";

export interface PullQuoteProps {
	quote: ReactNode;
	attribution: ReactNode | null;
	className?: string;
}

export default function PullQuote({
	quote,
	attribution,
	className,
}: PullQuoteProps) {
	return (
		<aside className={classNames(styles.wrapper, className)}>
			<div className={styles.quote}>{quote}</div>
			{attribution && <div className={styles.attribution}>{attribution}</div>}
		</aside>
	);
}

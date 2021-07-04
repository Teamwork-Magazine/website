import classNames from "classnames";
import { ReactNode } from "react";
import Stack from "../atoms/Stack";
import "./PullQuote.css";

export interface PullQuoteProps {
	quote: ReactNode;
	attribution?: ReactNode;
	className?: string;
}

export default function PullQuote({
	quote,
	attribution,
	className,
}: PullQuoteProps) {
	return (
		<aside className={classNames("c-pull-quote", className)}>
			<div className="c-pull-quote__content">{quote}</div>
			{attribution && (
				<div className="c-pull-quote__attribution">{attribution}</div>
			)}
		</aside>
	);
}

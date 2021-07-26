import classNames from "classnames";
import Heading, { HeadingProps } from "./Heading";
import styles from "./AccentHeading.module.css";

export type AccentHeadingProps = HeadingProps;

export default function AccentHeading({
	className,
	...props
}: AccentHeadingProps) {
	return (
		<Heading
			{...props}
			className={classNames(
				styles.heading,
				"u-text-accent",
				"u-text-caps",
				className
			)}
		/>
	);
}

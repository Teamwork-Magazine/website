import classNames from "classnames";
import Link from "next/link";
import styles from "./NavList.module.css";

interface LinkProps {
	href: string;
	text: string;
	className?: string;
}

export interface NavListProps {
	links: LinkProps[];
	variant?: "normal" | "splash";
	className?: string;
}

export default function NavList({
	links,
	className,
	variant = "normal",
}: NavListProps) {
	return (
		<ul className={classNames(styles.list, className)}>
			{links.map(({ href, text, className }) => (
				<li className={styles.item}>
					<Link href={href}>
						<a className={classNames(styles.link, className)}>{text}</a>
					</Link>
				</li>
			))}
		</ul>
	);
}

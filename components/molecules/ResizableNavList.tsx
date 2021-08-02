import classNames from "classnames";
import { motion, Variants } from "framer-motion";
import { ReactNode, Children, useEffect, useRef, useState } from "react";
import styles from "./ResizableNavList.module.css";

export interface ResizableNavListProps {
	className?: string;
	children: ReactNode;
}

const variants: Variants = {
	hidden: {
		opacity: 0,
		transitionEnd: {
			visibility: "hidden",
		},
	},
	visible: {
		opacity: 1,
		visibility: "visible",
	},
};

export default function ResizableNavList({
	className,
	children,
}: ResizableNavListProps) {
	const containerRef = useRef<HTMLUListElement>(null!);
	const [maxVisibleChildren, setMaxVisibleChildren] = useState(0);
	const isHidden = maxVisibleChildren === 0;

	useEffect(() => {
		const container = containerRef.current;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const container = entry.target;

				let availableSpace = entry.contentRect.width;
				let numVisible = 0;
				for (const child of Array.from(container.children) as HTMLElement[]) {
					availableSpace -= child.getBoundingClientRect().width;

					if (availableSpace < 0) {
						break;
					} else {
						numVisible++;
					}
				}

				setMaxVisibleChildren(numVisible);
			}
		});

		observer.observe(container);
		return () => {
			observer.unobserve(container);
		};
	}, []);

	return (
		<motion.ul
			className={classNames(styles.container, className)}
			ref={containerRef}
			variants={variants}
			animate={isHidden ? "hidden" : "visible"}
			initial={false}
			aria-hidden={isHidden}
		>
			{Children.map(children, (child, i) => {
				const isHidden = i >= maxVisibleChildren;
				return (
					<motion.li
						className={styles.item}
						variants={variants}
						animate={isHidden ? "hidden" : "visible"}
						initial={false}
						aria-hidden={isHidden}
					>
						{child}
					</motion.li>
				);
			})}
		</motion.ul>
	);
}

import classNames from "classnames";
import NextImage from "next/image";
import { ReactNode } from "react";
import styles from "./Image.module.css";

export interface ImageProps {
	src: string;
	alt: string;
	height: number;
	width: number;
	priority?: boolean;
	caption?: ReactNode;
	credit?: string | null;
	className?: string;
}

export default function Image({
	src,
	alt,
	height,
	width,
	priority,
	caption,
	credit,
	className,
}: ImageProps) {
	return (
		<figure className={classNames(styles.image, "u-flow", className)}>
			<div className={styles.art}>
				<NextImage
					layout="responsive"
					src={src}
					alt={alt}
					height={height}
					width={width}
					priority={priority}
				/>
			</div>
			{caption || credit ? (
				<figcaption>
					<div
						className={classNames(styles.caption, "u-text-accent", "u-flow")}
					>
						<div className={styles.description}>{caption}</div>
						{credit && (
							<span className={classNames(styles.credit, "u-text-caps")}>
								<span className="u-visually-hidden">Credit: </span>
								{credit}
							</span>
						)}
					</div>
				</figcaption>
			) : null}
		</figure>
	);
}

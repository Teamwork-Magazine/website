import classNames from "classnames";
import NextImage from "next/image";
import { ReactNode } from "react";
import styles from "./Image.module.css";

export interface ImageProps {
	src: string;
	alt: string;
	height: number;
	width: number;
	caption?: ReactNode;
	credit?: string;
	className?: string;
}

export default function Image({
	src,
	height,
	width,
	alt,
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
				/>
			</div>
			{caption || credit ? (
				<figcaption>
					<p className={classNames(styles.caption, "u-text-accent", "u-flow")}>
						<span className={styles.description}>{caption}</span>
						{credit && (
							<span className={classNames(styles.credit, "u-text-caps")}>
								{credit}
							</span>
						)}
					</p>
				</figcaption>
			) : null}
		</figure>
	);
}

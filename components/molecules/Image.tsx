import classNames from "classnames";
import NextImage from "next/image";
import { ReactNode } from "react";
import styles from "./Image.module.css";

export interface ImageProps {
	src: string;
	placeholder: string | null;
	alt: string;
	height: number;
	width: number;
	caption?: ReactNode;
	credit?: string | null;
	className?: string;
}

export default function Image({
	src,
	placeholder,
	height,
	width,
	alt,
	caption,
	credit,
	className,
}: ImageProps) {
	const placeholderProps = placeholder
		? {
				placeholder: "blur",
				blurDataURL: placeholder,
		  }
		: null;

	return (
		<figure className={classNames(styles.image, "u-flow", className)}>
			<div className={styles.art}>
				<NextImage
					layout="responsive"
					src={src}
					alt={alt}
					height={height}
					width={width}
					{...placeholderProps}
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

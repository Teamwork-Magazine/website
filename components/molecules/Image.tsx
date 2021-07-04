import classNames from "classnames";
import NextImage from "next/image";
import { ReactNode } from "react";
import "./Image.css";

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
		<figure className={classNames("c-image", "u-flow", className)}>
			<div className="c-image__art">
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
					<p className="c-image__caption u-text-accent u-flow">
						<span className="c-image__description">{caption}</span>
						{credit && (
							<span className="c-image__credit u-text-caps">{credit}</span>
						)}
					</p>
				</figcaption>
			) : null}
		</figure>
	);
}

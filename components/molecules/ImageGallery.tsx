import classNames from "classnames";
import Image, { ImageProps } from "./Image";
import "./ImageGallery.css";

type Layout = "one-column" | "two-column" | "three-column" | "four-column";

export type Alignment = "top" | "center" | "bottom";

export interface ImageGalleryProps {
	images: ImageProps[];
	layout?: Layout;
	alignImages?: Alignment;
	className?: string;
}

export default function ImageGallery({
	className,
	images,
	alignImages = "top",
	layout = "one-column",
}: ImageGalleryProps) {
	return (
		<div
			className={classNames("c-image-gallery", className)}
			data-layout={layout}
			data-align-images={alignImages}
		>
			{images.map((image) => (
				<Image key={image.src} {...image} />
			))}
		</div>
	);
}

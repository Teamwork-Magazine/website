import classNames from "classnames";
import { RichText } from "prismic-reactjs";
import {
	ImagesAlignment,
	ImagesLayout,
	ImageWithCaption,
} from "../../prismic/types/slices/images";
import Image from "./Image";
import "./ImageGallery.css";

export interface ImageGalleryProps {
	images: ImageWithCaption[];
	layout?: ImagesLayout;
	alignImages?: ImagesAlignment;
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
				<Image
					key={image.src}
					{...image}
					caption={image.caption && RichText.render(image.caption)}
				/>
			))}
		</div>
	);
}

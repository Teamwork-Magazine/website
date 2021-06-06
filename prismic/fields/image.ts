import { Field, NullableImageConstraint, Thumbnail } from "prismic/field";

interface Dimensions {
	height: number;
	width: number;
}

export interface PrismicImage {
	url: string;
	alt: string | null;
	copyright: string | null;
	dimensions: Dimensions;
}

export interface Image {
	src: string;
	alt: string | null;
	credit: string | null;
	height: number;
	width: number;
}

interface ImageConfig {
	label: string;
	placeholder?: string;
	group?: string;
	constraint?: NullableImageConstraint;
	thumbnails?: Thumbnail[];
}

export function image({
	label,
	placeholder,
	group,
	constraint = { height: null, width: null },
	thumbnails = [],
}: ImageConfig): Field<Image | null> {
	return new Field({
		group,
		cast(image: PrismicImage) {
			if (!image) return null;

			const { alt, copyright: credit, url: src, dimensions } = image;

			return {
				alt,
				credit,
				src,
				...dimensions,
			};
		},
		toJSON() {
			return {
				type: "Image",
				config: {
					label,
					placeholder,
					constraint,
					thumbnails,
				},
			};
		},
	});
}

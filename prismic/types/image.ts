import { Schema } from "../schema";

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

export const ImageSchema = new Schema<PrismicImage, Image>({
	alt: ({ alt }) => alt,
	credit: ({ copyright }) => copyright,
	src: ({ url }) => url,
	height: ({ dimensions }) => dimensions.height,
	width: ({ dimensions }) => dimensions.width,
});

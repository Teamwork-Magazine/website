import { generateBlurURL } from "../../lib/images/blur";
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
	blurDataURL: string | null;
	alt: string;
	credit: string | null;
	height: number;
	width: number;
}

export const ImageSchema = new Schema<PrismicImage, Image>({
	alt: ({ alt }) => alt ?? "",
	credit: ({ copyright }) => copyright,
	src: ({ url }) => url,
	blurDataURL: async ({ url }) => {
		try {
			return generateBlurURL(url);
		} catch (e) {
			// TODO: This isn't the best place to handle this side effect, but it works for now.
			console.error(e);
			return null;
		}
	},
	height: ({ dimensions }) => dimensions.height,
	width: ({ dimensions }) => dimensions.width,
});

import { RichTextBlock } from "prismic-reactjs";
import { PrismicSlice } from "../../interfaces";
import { Schema } from "../../schema";
import { Image, ImageSchema, PrismicImage } from "../image";

const PRISMIC_LAYOUT_1X = "One column";
const PRISMIC_LAYOUT_1X_EXTRA_WIDE = "One column, extra-wide";
const PRISMIC_LAYOUT_2X = "Two columns";
const PRISMIC_LAYOUT_3X = "Three columns";
const PRISMIC_LAYOUT_4X = "Four columns";

const PRISMIC_EXTRA_WIDE_LAYOUTS = new Set([
	PRISMIC_LAYOUT_1X_EXTRA_WIDE,
	PRISMIC_LAYOUT_2X,
	PRISMIC_LAYOUT_3X,
	PRISMIC_LAYOUT_4X,
]);

interface PrismicImagesSliceConfig {
	align_images: "Top" | "Center" | "Bottom" | null;
	layout:
		| typeof PRISMIC_LAYOUT_1X
		| typeof PRISMIC_LAYOUT_1X_EXTRA_WIDE
		| typeof PRISMIC_LAYOUT_2X
		| typeof PRISMIC_LAYOUT_3X
		| typeof PRISMIC_LAYOUT_4X
		| null;
}

interface PrismicImageWithCaption {
	image: PrismicImage;
	caption: RichTextBlock[];
	credit: string;
}

export type PrismicImagesSlice = PrismicSlice<
	"images",
	PrismicImagesSliceConfig,
	PrismicImageWithCaption
>;

export type ImagesAlignment = "top" | "center" | "bottom";

export type ImagesLayout =
	| "one-column"
	| "two-column"
	| "three-column"
	| "four-column";

export interface ImageWithCaption extends Image {
	caption: RichTextBlock[] | null;
}

export interface ImagesSlice {
	type: "images";
	extraWide: boolean;
	alignImages: ImagesAlignment;
	layout: ImagesLayout;
	gallery: ImageWithCaption[];
}

export const ImagesSliceSchema = new Schema<PrismicImagesSlice, ImagesSlice>({
	type: () => "images",
	extraWide({ primary }) {
		return PRISMIC_EXTRA_WIDE_LAYOUTS.has(primary.layout!);
	},
	alignImages({ primary }) {
		switch (primary.align_images) {
			case "Center":
				return "center";
			case "Bottom":
				return "bottom";
			case "Top":
			default:
				return "top";
		}
	},
	layout({ primary }) {
		switch (primary.layout) {
			case PRISMIC_LAYOUT_2X:
				return "two-column";
			case PRISMIC_LAYOUT_3X:
				return "three-column";
			case PRISMIC_LAYOUT_4X:
				return "four-column";
			case PRISMIC_LAYOUT_1X:
			case PRISMIC_LAYOUT_1X_EXTRA_WIDE:
			default:
				return "one-column";
		}
	},
	gallery({ items }) {
		return items.reduce((gallery, item) => {
			if (item.image) {
				const image = ImageSchema.cast(item.image);
				gallery.push({
					...image,
					credit: item.credit || image.credit,
					caption: item.caption.length ? item.caption : null,
				});
			}

			return gallery;
		}, [] as ImageWithCaption[]);
	},
});

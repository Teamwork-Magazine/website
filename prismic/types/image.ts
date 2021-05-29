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

export function fromPrismic(image: PrismicImage) {
	const { alt, copyright: credit, url: src, dimensions } = image;

	return {
		src,
		alt,
		credit,
		...dimensions,
	};
}

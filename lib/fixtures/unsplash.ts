import { Image } from "../../prismic/types/image";

type UnsplashImage = Pick<Image, "src" | "height" | "width">;

export function unsplash(
	id: string,
	width: number,
	height: number
): UnsplashImage {
	return {
		src: `https://source.unsplash.com/${id}/${width}x${height}`,
		height,
		width,
	};
}

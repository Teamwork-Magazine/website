export function resizeToWidth(
	img: StaticImageData,
	width: number
): StaticImageData {
	return {
		...img,
		width,
		height: Math.round((img.height / img.width) * width),
	};
}

export function resizeToHeight(
	img: StaticImageData,
	height: number
): StaticImageData {
	return {
		...img,
		height,
		width: Math.round((img.width / img.height) * height),
	};
}

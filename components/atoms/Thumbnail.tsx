import Image, { ImageProps } from "next/image";

export type ThumbnailProps = ImageProps;

export default function Thumbnail(props: ThumbnailProps) {
	return <Image layout="responsive" {...props} />;
}

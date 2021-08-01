import Head from "next/head";
import { Image } from "../../prismic/types/image";

type OpenGraphType = "article" | "profile" | "website";

export interface SEOProps {
	title: string;
	description: string;
	image?: Image | null;
	siteTitle: string;
	url: string;
	openGraphType?: OpenGraphType;
}

export default function SEO({
	title,
	description,
	image,
	siteTitle,
	url,
	openGraphType = "website",
}: SEOProps) {
	const fullTitle = title === siteTitle ? title : `${title} — ${siteTitle}`;

	let twitterCardType = "summary";
	if (image && image.width / image.height >= 4 / 3) {
		twitterCardType = "summary_large_image";
	}

	return (
		<Head>
			{/* Basic meta tags */}
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />

			{/* Open Graph tags */}
			<meta name="og:title" content={title} />
			<meta name="og:description" content={description} />
			<meta name="og:site_name" content={siteTitle} />
			<meta name="og:url" content={url} />
			<meta name="og:type" content={openGraphType} />
			{image && (
				<>
					<meta name="og:image" content={image.src} />
					<meta name="og:image:width" content={image.width.toString()} />
					<meta name="og:image:height" content={image.height.toString()} />
					<meta name="og:image:alt" content={image.alt} />
				</>
			)}

			{/* Twitter card tags */}
			<meta name="twitter:card" content={twitterCardType} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			{image && (
				<>
					<meta name="twitter:image" content={image.src} />
					<meta name="twitter:image:alt" content={image.alt} />
				</>
			)}
		</Head>
	);
}

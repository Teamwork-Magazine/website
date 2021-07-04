import classNames from "classnames";
import { RichText, RichTextBlock } from "prismic-reactjs";
import Image, { ImageProps } from "../molecules/Image";
import "./Article.css";
import Stack from "../atoms/Stack";
import PullQuote from "../molecules/PullQuote";
import ImageGallery, { ImageGalleryProps } from "../molecules/ImageGallery";

export interface ArticleProps {
	title: string;
	featuredImage?: Omit<ImageProps, "className">;
	body: ArticleSlice[];
}

type ArticleSlice = RichTextSlice | PullQuoteSlice | ImageSlice;

export enum ArticleSliceType {
	PULL_QUOTE,
	RICH_TEXT,
	IMAGES,
}

interface RichTextSlice {
	type: ArticleSliceType.RICH_TEXT;
	blocks: RichTextBlock[];
}

interface PullQuoteSlice {
	type: ArticleSliceType.PULL_QUOTE;
	quote: RichTextBlock[];
	attribution?: RichTextBlock[];
}

interface ImageSlice {
	type: ArticleSliceType.IMAGES;
	extraWide: boolean;
	gallery: Omit<ImageGalleryProps, "className">;
}

export default function Article({ title, featuredImage, body }: ArticleProps) {
	return (
		<article className="l-article">
			<Stack gap="var(--space-xl)">
				<header className="l-article__grid l-article__header">
					<h1>{title}</h1>
					{featuredImage && (
						<Image
							{...featuredImage}
							className="l-article__block--extra-wide"
						/>
					)}
				</header>
				<main className="l-article__grid l-article__body">
					{body.map((slice, i) => (
						<ArticleBodySlice slice={slice} key={i} />
					))}
				</main>
				<footer className="l-article__grid l-article__footer">
					{/* Suggested stories */}
				</footer>
			</Stack>
		</article>
	);
}

interface ArticleBodySliceProps {
	slice: ArticleSlice;
}

function ArticleBodySlice({ slice }: ArticleBodySliceProps) {
	switch (slice.type) {
		case ArticleSliceType.RICH_TEXT:
			return (
				<Stack gap="var(--space-s)">
					<RichText render={slice.blocks} />
				</Stack>
			);
		case ArticleSliceType.PULL_QUOTE:
			return (
				<div className="l-article__block--pull-right">
					<PullQuote
						quote={RichText.render(slice.quote)}
						attribution={
							slice.attribution && RichText.render(slice.attribution)
						}
					/>
				</div>
			);
		case ArticleSliceType.IMAGES:
			return (
				<div
					className={classNames({
						"l-article__block--extra-wide": slice.extraWide,
					})}
				>
					<ImageGallery {...slice.gallery} />
				</div>
			);
		default:
			return null;
	}
}
